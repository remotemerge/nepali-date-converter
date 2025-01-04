import { join, resolve } from 'path';
import { readFileSync } from 'fs';
import { copyFile, mkdir, writeFile } from 'fs/promises';

// Read and parse the root package.json
const packageJsonPath = join(resolve(), 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

// Extract necessary fields from package.json
const {
  name,
  version,
  description,
  license,
  author,
  repository,
  bugs,
  keywords,
  homepage,
  type,
} = packageJson;

// Configuration for the npm package
const npmPackageConfig = {
  name,
  version,
  description,
  license,
  author,
  homepage,
  keywords,
  repository,
  bugs,
  type,
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

// Create the dist folder if it doesn't exist
const distPath = join(resolve(), 'dist');
await mkdir(distPath, { recursive: true });

// Write the generated package.json to the dist folder
await writeFile(
  join(distPath, 'package.json'),
  JSON.stringify(npmPackageConfig, null, 2),
  'utf-8',
);

// Copy static files to the dist folder
await copyFile('.npmrc', join(distPath, '.npmrc'));
await copyFile('README.md', join(distPath, 'README.md'));
await copyFile('LICENSE', join(distPath, 'LICENSE'));
