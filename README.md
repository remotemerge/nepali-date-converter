# 📅 Nepali Date Converter

[![Package](https://img.shields.io/npm/v/@remotemerge/nepali-date-converter?logo=npm)](https://www.npmjs.com/package/@remotemerge/nepali-date-converter)
![Build](https://img.shields.io/github/actions/workflow/status/remotemerge/nepali-date-converter/publish.yml?logo=github)
![Tests](https://img.shields.io/github/actions/workflow/status/remotemerge/nepali-date-converter/test.yml?style=flat&logo=counterstrike&label=test)
![Downloads](https://img.shields.io/npm/dt/@remotemerge/nepali-date-converter?logo=spreadshirt)
[![Size](https://img.shields.io/bundlephobia/minzip/@remotemerge/nepali-date-converter?logo=ipfs&label=size)](https://bundlephobia.com/result?p=@remotemerge/nepali-date-converter)
![License](https://img.shields.io/github/license/remotemerge/nepali-date-converter?logo=opensourceinitiative)

**Nepali Date Converter** is a lightweight, high-performance JavaScript library designed to simplify date conversions between the **Bikram Sambat (BS)** and **Gregorian (AD)** calendars. Whether you're building applications for Nepali users or working with historical data, NDC provides accurate and efficient date conversion for **1975 BS to 2099 BS** (1918 AD to 2043 AD). Perfect for developers working with Nepali calendars, festivals, or events.

---

## ✨ Features

- **Accurate Date Conversion**: Convert dates between **BS (Bikram Sambat)** and **AD (Gregorian)** with 100% accuracy.
- **Wide Date Range**: Supports conversion for **1975 BS to 2099 BS** (1918 AD to 2043 AD).
- **Lightweight**: Just **5.2 KiB** (plain) and **1.8 KiB** (gzipped) — optimized for performance.
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
To get started with the Nepali Date Converter, follow the simple examples below. You can convert dates from **BS to AD** or **AD to BS** with just a few lines of code.

### Importing the Library

#### ES Modules (Recommended for Modern JavaScript/TypeScript Projects)
```javascript
import DateConverter from '@remotemerge/nepali-date-converter';
```

#### CommonJS (For Node.js or Legacy Projects)
```javascript
const DateConverter = require('@remotemerge/nepali-date-converter');
```

---

### Converting BS to AD

Convert a **Bikram Sambat (BS)** date to a **Gregorian (AD)** date. Simply pass the BS date in `YYYY-MM-DD` format to the `DateConverter` and call the `.toAd()` method.

```javascript
// Convert BS date '2079-10-17' to AD
const converted = new DateConverter('2079-10-17').toAd();
console.log(converted);
```

**Output**:
```text
{ year: 2023, month: 1, date: 30, day: 'Monday' }
```

- **Input Format**: `YYYY-MM-DD` (Bikram Sambat date).
- **Output**: An object containing the converted Gregorian date (`year`, `month`, `date`) and the day of the week (`day`).

---

### Converting AD to BS

Convert a **Gregorian (AD)** date to a **Bikram Sambat (BS)** date. Pass the AD date in `YYYY-MM-DD` format to the `DateConverter` and call the `.toBs()` method.

```javascript
// Convert AD date '2023-01-30' to BS
const converted = new DateConverter('2023-01-30').toBs();
console.log(converted);
```

**Output**:
```text
{ year: 2079, month: 10, date: 17, day: 'Monday' }
```

- **Input Format**: `YYYY-MM-DD` (Gregorian date).
- **Output**: An object containing the converted Bikram Sambat date (`year`, `month`, `date`) and the day of the week (`day`).

---

### Using the Library in the Browser (CDN)

You can also use the library directly in your HTML files via **jsDelivr CDN**. This is ideal for quick prototyping or projects without a build system.

```html
<script src="https://cdn.jsdelivr.net/npm/@remotemerge/nepali-date-converter@1/dist/ndc-browser.js"></script>
<script>
  // Convert BS date '2079-10-17' to AD
  const converted = new DateConverter('2079-10-17').toAd();
  console.log(converted);
</script>
```

---

### Example Use Cases

1. **Event Planning**: Convert Nepali festival dates to Gregorian dates for international users.
2. **Historical Data**: Work with historical records that use the Bikram Sambat calendar.
3. **Localization**: Display dates in the Nepali calendar for Nepali-speaking users.

---

### Advanced Usage

#### Handling Invalid Dates
If an invalid date is provided, the library will throw an error. Always ensure the input date is within the supported range (**1975 BS to 2099 BS** or **1918 AD to 2043 AD**).

```javascript
try {
  const converted = new DateConverter('2100-01-01').toAd(); // Invalid date
} catch (error) {
  console.error(error.message); // "The input date is out of supported range."
}
```

#### Working with TypeScript
The library includes built-in TypeScript support, so you get full type checking and autocompletion in your editor.

```typescript
import DateConverter from '@remotemerge/nepali-date-converter';

const converted = new DateConverter('2079-10-17').toAd();
console.log(converted.year); // TypeScript knows this is a number
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
