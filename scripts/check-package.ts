import { strict as assert } from 'node:assert';
import { execFileSync } from 'node:child_process';
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  rmSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const temporary = mkdtempSync(join(tmpdir(), 'ndc-package-'));
const run = (command: string, args: string[], cwd = temporary) =>
  execFileSync(command, args, { cwd, stdio: 'pipe' });
try {
  const packed = JSON.parse(
    run(
      'npm',
      [
        'pack',
        './dist',
        '--ignore-scripts',
        '--json',
        '--pack-destination',
        temporary,
      ],
      process.cwd(),
    ).toString(),
  ) as { filename: string }[];
  const packagePath = join(
    temporary,
    'node_modules',
    '@remotemerge',
    'nepali-date-converter',
  );
  mkdirSync(packagePath, { recursive: true });
  run('tar', [
    '-xzf',
    join(temporary, packed[0].filename),
    '--strip-components=1',
    '-C',
    packagePath,
  ]);
  const manifest = JSON.parse(
    readFileSync(join(packagePath, 'package.json'), 'utf8'),
  );
  assert.equal(manifest.name, '@remotemerge/nepali-date-converter');
  assert.equal(manifest.dependencies, undefined);
  const assertion = `
import assert from 'node:assert/strict';
assert.equal(typeof DateConverter, 'function');
assert.deepEqual(JSON.parse(JSON.stringify(new DateConverter('2080-01-15').toAd())), {year:2023,month:4,date:28,day:'Friday'});
assert.deepEqual(JSON.parse(JSON.stringify(new DateConverter('2023-04-28').toBs())), {year:2080,month:1,date:15,day:'Friday'});
assert.throws(() => new DateConverter('1975-100000-01').toAd());
`;
  writeFileSync(
    join(temporary, 'esm.mjs'),
    `import DateConverter from '@remotemerge/nepali-date-converter';\n${assertion}`,
  );
  writeFileSync(
    join(temporary, 'cjs.cjs'),
    `const DateConverter = require('@remotemerge/nepali-date-converter');\n${assertion.replace("import assert from 'node:assert/strict';", "const assert = require('node:assert/strict');")}`,
  );
  writeFileSync(
    join(temporary, 'browser.mjs'),
    `import { readFileSync } from 'node:fs';\nimport { runInNewContext } from 'node:vm';\nconst context = {};\nrunInNewContext(readFileSync(${JSON.stringify(join(packagePath, 'ndc-browser.js'))}, 'utf8'), context);\nconst DateConverter = context.DateConverter;\n${assertion}`,
  );
  for (const file of ['esm.mjs', 'cjs.cjs', 'browser.mjs']) run('node', [file]);
  writeFileSync(
    join(temporary, 'esm.mts'),
    "import DateConverter from '@remotemerge/nepali-date-converter'; const year: number = new DateConverter('2080-1-15').toAd().year;",
  );
  writeFileSync(
    join(temporary, 'cjs.cts'),
    "import DateConverter = require('@remotemerge/nepali-date-converter'); const year: number = new DateConverter('2023-4-28').toBs().year;",
  );
  run('bun', [
    resolve('node_modules/typescript/bin/tsc'),
    '--noEmit',
    '--strict',
    '--module',
    'NodeNext',
    '--moduleResolution',
    'NodeNext',
    '--target',
    'ES2022',
    'esm.mts',
    'cjs.cts',
  ]);
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
