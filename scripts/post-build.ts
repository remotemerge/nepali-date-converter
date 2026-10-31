import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

import packageJson from '../package.json';

// Compose the package object
const configs = {
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  license: packageJson.license,
  author: packageJson.author,
  homepage: packageJson.homepage,
  keywords: packageJson.keywords,
  repository: packageJson.repository,
  bugs: packageJson.bugs,
  type: packageJson.type,
  types: './index.d.ts',
  module: './ndc.js', // ES Module entry point
  main: './ndc-node.cjs', // CommonJS entry point
  exports: {
    '.': {
      import: { types: './index.d.ts', default: './ndc.js' },
      require: { types: './index.d.cts', default: './ndc-node.cjs' },
    },
  },
  engines: {
    node: '>=18.12.0',
  },
};

// Write package.json to the public directory
const publicPath = join(import.meta.dir, '..', 'dist');
await Bun.write(join(publicPath, 'package.json'), JSON.stringify(configs));

// Keep only the entry declaration in the published package
const entryDeclaration = 'index.d.ts';
const declarations = (await readdir(publicPath)).filter(
  (file) => file.endsWith('.d.ts') && file !== entryDeclaration,
);

await Promise.all(
  declarations.map((file) => Bun.file(join(publicPath, file)).delete()),
);

// Fail the build if the entry declaration is not self-contained
const entrySource = await Bun.file(join(publicPath, entryDeclaration)).text();

if (/\bfrom\s*['"]\.|\/{3}\s*<reference/.test(entrySource)) {
  throw new Error(
    `${entryDeclaration} references internal modules; it is no longer self-contained.`,
  );
}

// CommonJS declarations must match the constructor returned by require().
await Bun.write(
  join(publicPath, 'index.d.cts'),
  entrySource.replace(
    'export default class DateConverter',
    'declare class DateConverter',
  ) + '\nexport = DateConverter;\n',
);
