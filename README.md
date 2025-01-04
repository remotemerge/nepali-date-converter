# 🔁 Nepali Date Converter

[![Package](https://img.shields.io/npm/v/@remotemerge/nepali-date-converter?logo=npm)](https://www.npmjs.com/package/@remotemerge/nepali-date-converter)
[![Build](https://img.shields.io/github/workflow/status/remotemerge/nepali-date-converter/Publish?logo=github)](README.md)
[![Downloads](https://img.shields.io/npm/dt/@remotemerge/nepali-date-converter)](https://www.npmjs.com/package/@remotemerge/nepali-date-converter)
[![Size](https://img.shields.io/bundlephobia/minzip/@remotemerge/nepali-date-converter)](https://bundlephobia.com/result?p=@remotemerge/nepali-date-converter)
[![License](https://img.shields.io/npm/l/@remotemerge/nepali-date-converter)](LICENSE)

**Nepali Date Converter (NDC)** is a lightweight, high-performance JavaScript library designed to simplify date conversions between the **Bikram Sambat (BS)** and **Gregorian (AD)** calendars. Whether you're building applications for Nepali users or working with historical data, NDC provides accurate and efficient date conversion for **1975 BS to 2099 BS** (1918 AD to 2043 AD). Perfect for developers working with Nepali calendars, festivals, or events.

---

## ✨ Features

- **Accurate Date Conversion**: Convert dates between **BS (Bikram Sambat)** and **AD (Gregorian)** with 100% accuracy.
- **Wide Date Range**: Supports conversion for **1975 BS to 2099 BS** (1918 AD to 2043 AD).
- **Lightweight**: Just **7.3 KB** (plain) and **2.2 KB** (gzipped) — optimized for performance.
- **TypeScript Support**: Built-in TypeScript types for a seamless development experience.
- **Cross-Platform**: Works in **Node.js**, **browsers**, and bundlers like **Webpack**, **Rollup**, **Vite**, etc.
- **Fast and Reliable**: Localized data and optimized code for lightning-fast results.

---

## 🚀 Installation

Install the package via **npm** or **Yarn**:

```bash
npm install @remotemerge/nepali-date-converter
```

or

```bash
yarn add @remotemerge/nepali-date-converter
```

---

## 📖 Quick Start

### Import the Library

#### ES Modules (Recommended)
```javascript
import DateConverter from '@remotemerge/nepali-date-converter';
```

#### CommonJS
```javascript
const DateConverter = require('@remotemerge/nepali-date-converter');
```

---

### Convert BS to AD

Convert a **Bikram Sambat (BS)** date to a **Gregorian (AD)** date:

```javascript
const converted = new DateConverter('2079-10-17').toAd();
console.log(converted);
```

**Output**:
```text
{ year: 2023, month: 1, date: 30, day: 'Monday' }
```

---

### Convert AD to BS

Convert a **Gregorian (AD)** date to a **Bikram Sambat (BS)** date:

```javascript
const converted = new DateConverter('2023-01-30').toBs();
console.log(converted);
```

**Output**:
```text
{ year: 2079, month: 10, date: 17, day: 'Monday' }
```

---

### Using CDN

You can also use the library directly in your browser via **jsDelivr CDN**:

```html
<script src="https://cdn.jsdelivr.net/npm/@remotemerge/nepali-date-converter@1/dist/ndc-iife.js"></script>
<script>
  const converted = new DateConverter('2079-10-17').toAd();
  console.log(converted);
</script>
```

---

## 📊 Why Use Nepali Date Converter?

- **Production-Ready**: Tested and verified for 100% accuracy across the supported date range.
- **Developer-Friendly**: Simple API, TypeScript support, and detailed documentation.
- **Lightweight**: Minimal bundle size for fast loading and performance.
- **Open Source**: MIT licensed — free to use, modify, and distribute.

---

## 🔧 API Reference

### `DateConverter(date: string)`

- **`date`**: A string in `YYYY-MM-DD` format (either BS or AD).

### Methods

- **`.toAd()`**: Converts a BS date to an AD date.
  - Returns: `{ year: number, month: number, date: number, day: string }`

- **`.toBs()`**: Converts an AD date to a BS date.
  - Returns: `{ year: number, month: number, date: number, day: string }`

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🙌 Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue on the [GitHub repository](https://github.com/remotemerge/nepali-date-converter).

---

## 📄 Documentation

For detailed documentation and advanced usage, visit the [GitHub repository](https://github.com/remotemerge/nepali-date-converter).
