#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

// use vars from package config
import pc from './package.json' assert { type: 'json' };

// current directory
const __dirname = path.resolve();

// format configs
const packageConfig = {
  name: pc.name,
  version: pc.version,
  description: pc.description,
  homepage: pc.homepage,
  license: pc.license,
  keywords: pc.keywords,
  author: pc.author,
  repository: pc.repository,
  bugs: pc.bugs,
  type: pc.type,
  module: 'ndc-es.js',
  main: 'ndc-cjs.js',
};

// generate package manager file
const distPath = `${__dirname}/dist`;
fs.existsSync(distPath) || fs.mkdirSync(distPath);
fs.createWriteStream(`${distPath}/package.json`, 'utf-8').write(JSON.stringify(packageConfig));
