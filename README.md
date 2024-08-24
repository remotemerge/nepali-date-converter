# 🔁 Nepali Date Converter (NDC)

[![Package](https://img.shields.io/npm/v/@remotemerge/ndc-node-sdk?logo=npm)](https://www.npmjs.com/package/@remotemerge/ndc-node-sdk)
[![Build](https://img.shields.io/github/workflow/status/remotemerge/ndc-node-sdk/Publish?logo=github)](README.md)
[![Downloads](https://img.shields.io/npm/dt/@remotemerge/ndc-node-sdk)](https://www.npmjs.com/package/@remotemerge/ndc-node-sdk)
[![Size](https://img.shields.io/bundlephobia/minzip/@remotemerge/ndc-node-sdk)](README.md)
[![License](https://img.shields.io/npm/l/@remotemerge/ndc-node-sdk)](LICENSE)

Modern JavaScript library to convert date from BS to AD and vice versa.

## Features

**Date Range** — supports conversion between 1975-2099 BS or 1918-2043 AD.

**Size** — with massive 125 years of data and code, the size is tiny; plain *7.3 KB* and Gzip *2.2 KB*.

**TypeScript Support** — built-in types support, and it's written in TypeScript. The package seamlessly works on
browsers, JS/ESx, Node.js, and bundlers like Webpack, Rollup, etc.

**Conversion** — supports date conversion from BS to AD and vice versa.

**Accurate** — from 1975-2099 BS, 100% of the data was tested and corrected. The package is ready to be used in
production.

**Fast** — localized data and optimized code; the outcomes are lightning fast!

## Installation

The library is available as a npm package. To install the package, run:

```bash
npm install @remotemerge/ndc-node-sdk
```

or, if you are using a Yarn package manager, run:

```bash
yarn add @remotemerge/ndc-node-sdk
```

## Quick Examples

Import the `DateConverter` module in your JS/TS code.

```javascript
// as ES module
import DateConverter from '@remotemerge/ndc-node-sdk';
```

*OR*

```javascript
const DateConverter = require('@remotemerge/ndc-node-sdk');
```

### Convert from BS to AD

Add BS date in `YYYY-MM-DD` format to convert from BS to AD.

```javascript
const converted = new DateConverter('2017-10-17').toAd();
console.log(converted);
```

outputs

```log
{ year: 1961, month: 1, date: 30, day: 'Monday' }
```

### Convert from AD to BS

Add AD date in `YYYY-MM-DD` format to convert from AD to BS.

```javascript
const converted = new DateConverter('2001-06-01').toBs();
console.log(converted);
```

outputs

```log
{ year: 2058, month: 2, date: 19, day: 'Friday' }
```

### Using CDN

You can also use the library directly in HTML from
the [jsDelivr CDN](https://www.jsdelivr.com/package/npm/@remotemerge/ndc-node-sdk).

```html
<script src='https://cdn.jsdelivr.net/npm/@remotemerge/ndc-node-sdk@1/ndc-iife.js'></script>
<script>
  const converted = new DateConverter('2044-01-08').toAd();
  console.log(converted);
</script>
```