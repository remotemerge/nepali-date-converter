# Nepali Date Converter (NDC)

Modern JavaScript tool to convert date from BS to AD and vice-versa.

## Features

**Date Range** — supports conversion between 1975-2099 BS or 1918-2043 AD.

**Size** — with massive 125 years of data and code, the size is tiny; plain *7.3 KB* and Gzip *2.2 KB*.

**TypeScript Support** — built-in types support, and it's written in TypeScript. The package seamlessly works on
browsers, JS/ESx, Node.js, and bundlers like Webpack, Rollup, etc.

**Conversion** — supports date conversion from BS to AD and vice-versa.

**Accurate** — from 1975-2099 BS, 100% of the data was tested and corrected. The package is ready to be used in
production.

**Fast** — localized data and optimized code; the outcomes are lightning fast!

## Installation

The library is available as a npm package. To install the package, run:

```shell
npm install @remotemerge/ndc-node-sdk
```

or, if you are using a Yarn package manager, run:

```shell
yarn add @remotemerge/ndc-node-sdk
```

## Quick Examples

Import the `DateConverter` module in your JS/TS code.

```javascript
// as ES module
import DateConverter from '@remotemerge/ndc-node-sdk';
// still in love with require? 😱
const DateConverter = require('@remotemerge/ndc-node-sdk');
```

### From BS to AD

Add BS date in `YYYY-MM-DD` format to convert from BS to AD.

```javascript
const converted = new DateConverter('2017-10-17').toAd();
console.log(converted);
```

outputs

```log
{ year: 1961, month: 1, date: 30, day: 'Monday' }
```

### From AD to BS

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

You can also use the library directly in HTML from the jsDelivr CDN.

```log
<script src="https://cdn.jsdelivr.net/npm/@remotemerge/ndc-node-sdk@1/ndc-umd.min.js"></script>
```

After script installation, follow the examples above.