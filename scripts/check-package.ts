import { strict as assert } from 'node:assert';
import { $ } from 'bun';
import { mkdtemp, rename, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const temporary = await mkdtemp(join(tmpdir(), 'ndc-package-'));
try {
  const packed =
    (await $`npm pack ./dist --ignore-scripts --json --pack-destination ${temporary}`.json()) as {
      filename: string;
    }[];
  const scopePath = join(temporary, 'node_modules', '@remotemerge');
  const packagePath = join(scopePath, 'nepali-date-converter');
  const archive = new Bun.Archive(
    await Bun.file(join(temporary, packed[0].filename)).bytes(),
  );
  await archive.extract(scopePath);
  await rename(join(scopePath, 'package'), packagePath);
  const manifest = await Bun.file(join(packagePath, 'package.json')).json();
  assert.equal(manifest.name, '@remotemerge/nepali-date-converter');
  assert.equal(manifest.dependencies, undefined);
  const assertion = `
import assert from 'node:assert/strict';
assert.equal(typeof DateConverter, 'function');
assert.deepEqual(JSON.parse(JSON.stringify(new DateConverter('2080-01-15').toAd())), {year:2023,month:4,date:28,day:'Friday'});
assert.deepEqual(JSON.parse(JSON.stringify(new DateConverter('2023-04-28').toBs())), {year:2080,month:1,date:15,day:'Friday'});
assert.throws(() => new DateConverter('1975-100000-01').toAd());
for (const [bs, ad, weekday] of [
  ['1975-01-01', '1918-04-13', 'Saturday'],
  ['2099-12-30', '2043-04-13', 'Monday'],
  ['2080-11-17', '2024-02-29', 'Thursday'],
]) {
  const result = new DateConverter(ad).toBs();
  const expected = bs.split('-').map(Number);
  assert.deepEqual([result.year, result.month, result.date, result.day], [...expected, weekday]);
  const reverse = new DateConverter(bs).toAd();
  assert.deepEqual([reverse.year, reverse.month, reverse.date, reverse.day], [...ad.split('-').map(Number), weekday]);
}
for (const input of ['1918-04-12', '2043-04-14', '2023-02-29']) {
  assert.throws(() => new DateConverter(input).toBs(), { message: 'The input date is out of supported range.' });
}
`;
  await Bun.write(
    join(temporary, 'esm.mjs'),
    `import DateConverter from '@remotemerge/nepali-date-converter';\n${assertion}`,
  );
  await Bun.write(
    join(temporary, 'cjs.cjs'),
    `const DateConverter = require('@remotemerge/nepali-date-converter');\n${assertion.replace("import assert from 'node:assert/strict';", "const assert = require('node:assert/strict');")}`,
  );
  await Bun.write(
    join(temporary, 'browser.mjs'),
    `import { readFileSync } from 'node:fs';\nimport { runInNewContext } from 'node:vm';\nconst context = {};\nrunInNewContext(readFileSync(${JSON.stringify(join(packagePath, 'ndc-browser.js'))}, 'utf8'), context);\nconst DateConverter = context.DateConverter;\n${assertion}`,
  );
  await $`node esm.mjs && node cjs.cjs && node browser.mjs`
    .cwd(temporary)
    .quiet();
  await $`${process.execPath} esm.mjs && ${process.execPath} cjs.cjs`
    .cwd(temporary)
    .quiet();
  await Bun.write(
    join(temporary, 'esm.mts'),
    "import DateConverter from '@remotemerge/nepali-date-converter'; const year: number = new DateConverter('2080-1-15').toAd().year;",
  );
  await Bun.write(
    join(temporary, 'cjs.cts'),
    "import DateConverter = require('@remotemerge/nepali-date-converter'); const year: number = new DateConverter('2023-4-28').toBs().year;",
  );
  await $`${process.execPath} ${resolve('node_modules/typescript/bin/tsc')} --noEmit --strict --module NodeNext --moduleResolution NodeNext --target ES2022 esm.mts cjs.cts`
    .cwd(temporary)
    .quiet();
} finally {
  await rm(temporary, { recursive: true, force: true });
}
