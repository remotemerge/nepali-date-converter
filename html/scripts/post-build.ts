import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';

// Read the version from package.json
const packageJson = (await Bun.file(
  join(import.meta.dir, '..', 'package.json'),
).json()) as {
  name: string;
  version: string;
  description: string;
  license: string;
  author: string;
  repository: string;
  bugs: string;
  keywords: string[];
  homepage: string;
  type: string;
};

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
  main: './ndc-node.js', // CommonJS entry point
  exports: {
    '.': {
      import: './ndc.js', // ES Module import
      require: './ndc-node.js', // CommonJS require
    },
  },
  files: ['**/*'],
  engines: {
    node: '>=18.0.0',
  },
  scripts: {
    start: 'echo "Thanks for using the package 🎉🎉🎉"',
    test: 'echo "Error: no test specified" && exit 1',
  },
};

// Write package.json to the public directory
const publicPath = join(import.meta.dir, '..', 'dist');
await mkdir(publicPath, { recursive: true });
await Bun.write(join(publicPath, 'package.json'), JSON.stringify(configs));
