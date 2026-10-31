/**
 * Packs dist/ the way npm publishes it and installs the tarball into a
 * temporary project. The check then loads the package as ESM, as CommonJS and
 * as the browser global under Node.js and Bun, and type-checks the declarations
 * for both module systems.
 */
import { strict as assert } from 'node:assert';
import { mkdtemp, readdir, rename, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { $ } from 'bun';

const PACKAGE_NAME = '@remotemerge/nepali-date-converter';
const ROOT = join(import.meta.dir, '..');
const TSC = join(ROOT, 'node_modules', 'typescript', 'bin', 'tsc');

// Every runtime consumer calls this module. It runs on the oldest supported
// Node.js, so it must stay plain CommonJS with no newer syntax.
const VERIFY_MODULE = `'use strict';
const assert = require('node:assert/strict');

// Each row is [BS, AD, weekday]. The rows cover a mid-range date, both range
// ends and a Gregorian leap day.
const MAPPINGS = [
  ['2080-01-15', '2023-04-28', 'Friday'],
  ['1975-01-01', '1918-04-13', 'Saturday'],
  ['2099-12-30', '2043-04-13', 'Monday'],
  ['2080-11-17', '2024-02-29', 'Thursday'],
];

// AD dates one day outside each range end, plus a date that does not exist in
// the Gregorian calendar.
const OUT_OF_RANGE_AD = ['1918-04-12', '2043-04-14', '2023-02-29'];

const RESULT_KEYS = ['date', 'day', 'month', 'year'];

const parse = (date) => date.split('-').map(Number);

// The browser bundle runs in a separate VM context with its own
// Object.prototype, so strict deep equality rejects its objects. Copying the
// fields into an array created here avoids that.
const toTuple = (result) => [result.year, result.month, result.date, result.day];

module.exports = function verify(DateConverter) {
  assert.equal(typeof DateConverter, 'function');

  for (const [bs, ad, day] of MAPPINGS) {
    const toBs = new DateConverter(ad).toBs();
    const toAd = new DateConverter(bs).toAd();
    assert.deepEqual(Object.keys(toBs).sort(), RESULT_KEYS);
    assert.deepEqual(Object.keys(toAd).sort(), RESULT_KEYS);
    assert.deepEqual(toTuple(toBs), [...parse(bs), day]);
    assert.deepEqual(toTuple(toAd), [...parse(ad), day]);
  }

  assert.throws(() => new DateConverter('1975-100000-01').toAd());
  for (const ad of OUT_OF_RANGE_AD) {
    assert.throws(() => new DateConverter(ad).toBs(), {
      message: 'The input date is out of supported range.',
    });
  }
};
`;

const RUNTIME_CONSUMERS = {
  'esm.mjs': `import DateConverter from '${PACKAGE_NAME}';
import verify from './verify.cjs';

verify(DateConverter);
`,
  'cjs.cjs': `const DateConverter = require('${PACKAGE_NAME}');
const verify = require('./verify.cjs');

verify(DateConverter);
`,
  // Runs the IIFE bundle in an empty global scope, the way a classic <script>
  // tag does.
  'browser.mjs': `import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import verify from './verify.cjs';

const bundle = new URL('./node_modules/${PACKAGE_NAME}/ndc-browser.js', import.meta.url);
const context = {};
runInNewContext(readFileSync(bundle, 'utf8'), context);
verify(context.DateConverter);
`,
};

const TYPE_CONSUMERS = {
  'esm.mts': `import DateConverter from '${PACKAGE_NAME}';

export const year: number = new DateConverter('2080-01-15').toAd().year;
`,
  'cjs.cts': `import DateConverter = require('${PACKAGE_NAME}');

export const year: number = new DateConverter('2023-04-28').toBs().year;
`,
};

async function installPackedPackage(workDir: string): Promise<void> {
  await $`npm pack ${join(ROOT, 'dist')} --ignore-scripts --pack-destination ${workDir}`.quiet();

  // npm 8 reports a scoped package's filename with the scope as a path
  // segment, which does not match the file it writes. workDir starts empty,
  // so the only .tgz in it is the tarball.
  const tarballName = (await readdir(workDir)).find((file) =>
    file.endsWith('.tgz'),
  );
  assert.ok(tarballName, 'npm pack did not produce a tarball.');
  const tarball = await Bun.file(join(workDir, tarballName)).bytes();

  // npm tarballs put their contents in a top-level package/ directory.
  const scopeDir = join(workDir, 'node_modules', '@remotemerge');
  const packageDir = join(workDir, 'node_modules', PACKAGE_NAME);
  await new Bun.Archive(tarball).extract(scopeDir);
  await rename(join(scopeDir, 'package'), packageDir);

  const manifest = await Bun.file(join(packageDir, 'package.json')).json();
  assert.equal(manifest.name, PACKAGE_NAME);
  assert.equal(
    manifest.dependencies,
    undefined,
    'The published package must not declare runtime dependencies.',
  );
}

async function writeFiles(
  workDir: string,
  files: Record<string, string>,
): Promise<void> {
  await Promise.all(
    Object.entries(files).map(([name, source]) =>
      Bun.write(join(workDir, name), source),
    ),
  );
}

const workDir = await mkdtemp(join(tmpdir(), 'ndc-package-'));

try {
  await installPackedPackage(workDir);
  await writeFiles(workDir, {
    'verify.cjs': VERIFY_MODULE,
    ...RUNTIME_CONSUMERS,
    ...TYPE_CONSUMERS,
  });

  await $`node esm.mjs && node cjs.cjs && node browser.mjs`.cwd(workDir);
  await $`${process.execPath} esm.mjs && ${process.execPath} cjs.cjs`.cwd(
    workDir,
  );
  await $`${process.execPath} ${TSC} --noEmit --strict --module NodeNext --moduleResolution NodeNext --target ES2022 ${Object.keys(TYPE_CONSUMERS)}`.cwd(
    workDir,
  );
} finally {
  await rm(workDir, { recursive: true, force: true });
}
