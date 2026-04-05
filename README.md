# 📅 Nepali Date Converter

[![Package](https://img.shields.io/npm/v/@remotemerge/nepali-date-converter?logo=npm)](https://www.npmjs.com/package/@remotemerge/nepali-date-converter)
[![Build](https://img.shields.io/github/actions/workflow/status/remotemerge/nepali-date-converter/test.yml?logo=github&label=build)](https://github.com/remotemerge/nepali-date-converter/actions/workflows/test.yml)
[![Tests](https://img.shields.io/github/actions/workflow/status/remotemerge/nepali-date-converter/test.yml?logo=jest&label=tests)](https://github.com/remotemerge/nepali-date-converter/actions/workflows/test.yml)
[![Downloads](https://img.shields.io/npm/dt/@remotemerge/nepali-date-converter?logo=spreadshirt)](https://www.npmjs.com/package/@remotemerge/nepali-date-converter)
[![Size](https://img.shields.io/bundlephobia/minzip/@remotemerge/nepali-date-converter?logo=ipfs&label=size)](https://bundlephobia.com/package/@remotemerge/nepali-date-converter)
[![License](https://img.shields.io/github/license/remotemerge/nepali-date-converter?logo=opensourceinitiative)](LICENSE)

> **Fast, accurate, and lightweight JavaScript library for converting dates between Nepali Bikram Sambat (BS) and Gregorian/English (AD) calendars.**

**Nepali Date Converter (NDC)** is a modern, production-ready JavaScript library designed for seamless date conversions between the **Bikram Sambat (BS)** calendar used in Nepal and the **Gregorian (AD)** calendar used internationally. Whether you're building Nepali calendar applications, event management systems, government portals, or localization features, NDC provides **100% accurate** date conversions for the range **1975 BS to 2099 BS** (1918 AD to 2043 AD).

Built with **TypeScript** and powered by **Bun**, this library is optimized for performance with a tiny bundle size (~5 KiB minified), making it perfect for web applications, Node.js services, mobile apps, and server-side rendering.

---

## ✨ Features

- 🎯 **Accurate Conversions**: 100% accurate date conversions between Bikram Sambat (BS) and Gregorian (AD) calendars
- 📆 **Wide Date Range**: Supports **1975 BS to 2099 BS** (April 13, 1918 AD to April 13, 2043 AD)
- ⚡ **Lightweight & Fast**: Only **~5 KiB** minified and **~1.8 KiB** gzipped — optimized for fast page loads
- 🇳🇵 **Nepali Unicode Support**: Accepts Nepali numerals (०-९) and multiple date format separators
- 🔒 **TypeScript Native**: Full TypeScript support with built-in type definitions and autocompletion
- 🌐 **Universal Compatibility**: Works in Node.js (v20+), modern browsers, and all major bundlers (Vite, Webpack, Rollup, esbuild)
- 🚀 **Modern Tooling**: Built with Bun, Vite, Oxlint, and Oxfmt for fast development and builds
- 🧪 **Well-Tested**: Comprehensive test suite validating every date in the supported range
- 🐳 **Docker Ready**: Includes Docker configuration for consistent cross-platform development
- 📦 **Zero Dependencies**: Minimal runtime footprint with only essential dependencies

---

## 📦 Installation

### npm

```bash
npm install @remotemerge/nepali-date-converter
```

### Yarn

```bash
yarn add @remotemerge/nepali-date-converter
```

### pnpm

```bash
pnpm add @remotemerge/nepali-date-converter
```

### Bun

```bash
bun add @remotemerge/nepali-date-converter
```

---

## 🚀 Quick Start

The Nepali Date Converter library is straightforward to use. Import the `DateConverter` class, instantiate it with a date string in `YYYY-MM-DD` format, and call either `.toAd()` to convert from Bikram Sambat to Gregorian, or `.toBs()` to convert from Gregorian to Bikram Sambat.

### ES Modules (Recommended)

```javascript
import DateConverter from '@remotemerge/nepali-date-converter';

// Convert BS to AD
const adDate = new DateConverter('2080-01-15').toAd();
console.log(adDate);
// Output: { year: 2023, month: 4, date: 28, day: 'Friday' }

// Convert AD to BS
const bsDate = new DateConverter('2023-04-28').toBs();
console.log(bsDate);
// Output: { year: 2080, month: 1, date: 15, day: 'Friday' }
```

### CommonJS

```javascript
const DateConverter = require('@remotemerge/nepali-date-converter');

const converted = new DateConverter('2080-01-15').toAd();
console.log(converted);
```

### Browser (CDN)

```html
<script src="https://cdn.jsdelivr.net/npm/@remotemerge/nepali-date-converter@1/dist/ndc-browser.js"></script>
<script>
  const converted = new DateConverter('2080-01-15').toAd();
  console.log(converted);
</script>
```

---

## 📖 API Reference

The `DateConverter` class provides a simple, intuitive API for converting dates between the Nepali Bikram Sambat calendar and the Gregorian calendar. All methods return plain JavaScript objects with full type safety when using TypeScript.

### Constructor

```text
new DateConverter(date: string)
```

**Parameters:**

- `date` (string): Date string in `YYYY-MM-DD` format. Accepts both BS (Nepali) and AD (Gregorian) dates.
  - Supports multiple separators: `-`, `/`, `.`, `,`, `|`
  - Supports Nepali Unicode numerals (e.g., `२०८०-०१-१५` for 2080-01-15)
  - Automatically detects whether the input is BS or AD based on the date range

**Examples:**

```javascript
new DateConverter('2080-01-15')    // Standard BS format with hyphen
new DateConverter('2080/01/15')    // Slash separator
new DateConverter('२०८०-०१-१५')    // Nepali numerals (Devanagari script)
```

### Methods

#### `.toAd()`

Converts a Bikram Sambat (BS) date to its equivalent Gregorian (AD) date. This method is essential for displaying Nepali dates in international format for web applications, mobile apps, and data processing systems.

**Returns:**

```typescript
{
  year: number;   // AD year (e.g., 2023)
  month: number;  // AD month (1-12)
  date: number;   // AD day of month (1-31)
  day: string;    // Day name (e.g., "Monday", "Tuesday")
}
```

**Example:**

```javascript
// Convert Nepali date to English/Gregorian date
const result = new DateConverter('2080-01-15').toAd();
// { year: 2023, month: 4, date: 28, day: 'Friday' }
```

#### `.toBs()`

Converts a Gregorian (AD) date to its equivalent Bikram Sambat (BS) date. Use this method when you need to display dates in Nepali calendar format for local audiences, festivals, and government systems in Nepal.

**Returns:**

```typescript
{
  year: number;   // BS year (e.g., 2080)
  month: number;  // BS month (1-12)
  date: number;   // BS day of month (1-32, varies by month)
  day: string;    // Day name (e.g., "Monday", "Tuesday")
}
```

**Example:**

```javascript
// Convert English/Gregorian date to Nepali date
const result = new DateConverter('2023-04-28').toBs();
// { year: 2080, month: 1, date: 15, day: 'Friday' }
```

---

## 💡 Usage Examples

The Nepali Date Converter library is versatile and can be used in various real-world scenarios. Below are practical examples demonstrating how to integrate the library into your applications, from festival date conversions to historical data processing and multilingual support.

### Basic Conversions

```javascript
import DateConverter from '@remotemerge/nepali-date-converter';

// Festival date conversion - Dashain, Tihar, and other Nepali festivals
const dashainDate = new DateConverter('2080-07-01').toAd();
console.log(`Dashain 2080 starts: ${dashainDate.month}/${dashainDate.date}/${dashainDate.year}`);

// Historical record conversion - Nepal history, government documents
const historicalDate = new DateConverter('1950-01-01').toBs();
console.log(`January 1, 1950 AD = ${historicalDate.year}-${historicalDate.month}-${historicalDate.date} BS`);

// Birthday and anniversary conversions
const birthdayBS = new DateConverter('2024-06-15').toBs();
console.log(`Your Nepali birthday: ${birthdayBS.year}/${birthdayBS.month}/${birthdayBS.date}`);
```

### Error Handling

```javascript
try {
  const converted = new DateConverter('2100-01-01').toAd();
} catch (error) {
  console.error(error.message);
  // "The input date is out of supported range."
}
```

### TypeScript Usage

```typescript
import DateConverter from '@remotemerge/nepali-date-converter';

const converter = new DateConverter('2080-01-15');
const result = converter.toAd();

// Full type safety and autocompletion
console.log(result.year);   // number
console.log(result.month);  // number
console.log(result.date);   // number
console.log(result.day);    // string
```

### Multiple Date Formats

```javascript
// All of these work identically:
new DateConverter('2080-01-15').toAd();  // Hyphen
new DateConverter('2080/01/15').toAd();  // Slash
new DateConverter('2080.01.15').toAd();  // Dot
new DateConverter('2080,01,15').toAd();  // Comma
new DateConverter('2080|01|15').toAd();  // Pipe
new DateConverter('२०८०-०१-१५').toAd();  // Nepali numerals
```

---

## 🇳🇵 About Bikram Sambat Calendar

**Bikram Sambat (BS)**, also known as **Bikrami calendar** or **Nepali calendar**, is the official calendar of Nepal and is widely used throughout the country for government, business, and cultural purposes. Named after the legendary Indian king Vikramaditya, this lunar calendar system is approximately 56.7 years ahead of the Gregorian calendar.

### Key Facts About Bikram Sambat:

- **Official Calendar of Nepal**: Used by the Government of Nepal for fiscal years, official documents, and public holidays
- **Lunar-Based System**: Months are based on lunar cycles, with each month having 29–32 days
- **New Year**: Falls in mid-April (Baishakh 1), marking the beginning of spring in Nepal
- **Cultural Significance**: Determines dates for major festivals like Dashain, Tihar, Holi, and Teej
- **Historical Origins**: Dates back to 57 BC, making it one of the oldest calendar systems still in use
- **Geographic Usage**: Primarily used in Nepal and parts of India (especially in northern states)

The Nepali Date Converter library handles the complex mathematics required to convert between these two calendar systems accurately, accounting for varying month lengths and leap years in the Bikram Sambat system.

---

## 🛠️ Development

This section provides a comprehensive guide for developers who want to contribute to the Nepali Date Converter project or build it locally. The project uses modern JavaScript tooling, including Bun for package management and testing, Vite for building, and Oxlint/Oxfmt for code quality.

### Prerequisites

- **Bun** >= 1.3.11 (required for development and building)
- Node.js >= 20 (for consuming the package)

### Setup

```bash
# Navigate to the source directory
cd html

# Install dependencies
bun install
```

### Available Scripts

| Command            | Description                                                         |
|--------------------|---------------------------------------------------------------------|
| `bun run dev`      | Start development server with hot reload (localhost:3000)           |
| `bun run build`    | Build production bundles (ESM, CJS, IIFE) + TypeScript declarations |
| `bun run test`     | Run test suite using Bun's native test runner                       |
| `bun run lint`     | Run Oxlint and Oxfmt checks                                         |
| `bun run lint:fix` | Auto-fix linting and formatting issues                              |

### Project Structure

```
html/
├── src/
│   ├── index.ts        # Main DateConverter class
│   └── years.ts        # Nepali calendar data (1975-2099 BS)
├── __tests__/
│   ├── bs.spec.ts      # AD to BS conversion tests
│   ├── ad.spec.ts      # BS to AD conversion tests
│   └── data.json       # Test data fixtures
├── dist/               # Generated build output
│   ├── ndc.js          # ESM bundle
│   ├── ndc-node.js     # CommonJS bundle
│   ├── ndc-browser.js  # IIFE bundle (browser-ready)
│   └── *.d.ts          # TypeScript declarations
├── maker/
│   └── package-manager.ts  # Post-build package.json generator
├── package.json
├── tsconfig.json
├── vite.config.ts
├── oxlint.config.ts
└── oxfmt.config.ts
```

### Building

```bash
cd html
bun run build
```

This generates:

- **ndc.js** - ES Module (for modern bundlers)
- **ndc-node.js** - CommonJS (for Node.js)
- **ndc-browser.js** - IIFE (for direct browser usage)
- **TypeScript declaration files** (.d.ts)
- **Packaged dist/** - Ready for npm distribution

### Testing

```bash
# Run all tests
bun run test

# Run specific test file
bun test __tests__/bs.spec.ts
```

Tests validate conversion accuracy across the entire supported date range using comprehensive fixtures.

### Linting & Formatting

The project uses modern tooling:

- **Oxlint** - Fast Rust-based linter (ESLint replacement)
- **Oxfmt** - Code formatter

```bash
# Check for issues
bun run lint

# Auto-fix issues
bun run lint:fix
```

---

## 🐳 Docker Development

For consistent development environments, the project includes Docker support:

```bash
# Start development environment
./start-docker.sh

# Or use the CLI wrapper
./app-cli.sh
```

The Docker setup:

- Uses Bun 1.3.11 base image
- Configures proper UID/GID mapping
- Runs development server on port 3000
- Maintains file ownership across host/container

---

## 🧪 CI/CD

The project uses GitHub Actions for automated workflows:

### Workflows

1. **Test** (`test.yml`)
   - Runs on pull requests
   - Tests across Ubuntu, macOS, and Windows
   - Validates build and test execution

2. **Publish** (`publish.yml`)
   - Triggers on GitHub releases
   - Publishes to npm registry
   - Runs only on the main branch

3. **Install** (`install.yml`)
   - Verifies package installation
   - Tests across multiple Node.js versions (20, 22, 24)
   - Validates compatibility with npm, Yarn, pnpm, and Bun

---

## 📊 Bundle Analysis

| Format | File             | Size (minified) | Size (gzipped) |
|--------|------------------|-----------------|----------------|
| ESM    | `ndc.js`         | ~5 KiB          | ~1.8 KiB       |
| CJS    | `ndc-node.js`    | ~5 KiB          | ~1.8 KiB       |
| IIFE   | `ndc-browser.js` | ~5 KiB          | ~1.8 KiB       |

---

## 🌟 Common Use Cases

The Nepali Date Converter library is widely used in various applications and systems. Here are some of the most common scenarios where developers integrate this library:

### 🏛️ Government & Public Sector

- **Government Portals**: Converting official dates for documents, certificates, and public notices
- **Municipal Systems**: Local government applications for citizen services
- **Legal Documents**: Court dates, legal filings, and official records in Nepal

### 🎉 Festival & Event Management

- **Festival Calendars**: Displaying dates for Dashain, Tihar, Holi, Teej, and other Nepali festivals
- **Event Planning**: Scheduling events that use both BS and AD dates
- **Cultural Applications**: Preserving and displaying Nepali cultural events

### 💼 Business & Enterprise

- **Accounting Systems**: Nepali fiscal year calculations and financial reporting
- **Payroll Systems**: Employee salary calculations using BS dates
- **ERP Systems**: Enterprise resource planning for Nepali companies
- **HR Applications**: Leave management, attendance tracking with Nepali dates

### 📱 Web & Mobile Applications

- **Calendar Apps**: Dual calendar displays showing both BS and AD dates
- **Date Pickers**: UI components for selecting Nepali dates
- **News Portals**: Displaying publication dates in both calendar systems
- **Social Media**: Timestamp conversions for Nepali audiences

### 🎓 Education & Research

- **Academic Calendars**: School and university schedules in Nepal
- **Historical Research**: Converting historical dates for research papers
- **Data Analysis**: Processing datasets with mixed calendar systems

### 🏥 Healthcare

- **Medical Records**: Patient records using Nepali dates
- **Appointment Systems**: Scheduling with BS date displays
- **Pharmacy Applications**: Medicine expiry date tracking

---

## 🤝 Contributing

We welcome contributions from the community! Whether you're fixing a bug, adding features, improving documentation, or reporting issues, your help makes this library better for everyone in the Nepali developer community. Below is a comprehensive guide to contributing to the Nepali Date Converter project.

### Reporting Issues

- **Bug Reports**: Open an issue with clear steps to reproduce the behavior
- **Feature Requests**: Describe the use case and expected behavior in detail
- **Documentation Issues**: Suggest improvements or report outdated information

### Code Contributions

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests: `bun run test`
5. Run linter: `bun run lint:fix`
6. Commit your changes (follow [Conventional Commits](https://www.conventionalcommits.org/))
7. Push to your branch
8. Open a Pull Request

### Development Guidelines

- **TypeScript**: Write TypeScript with strict mode enabled for type safety
- **Testing**: Add comprehensive tests for all new functionality
- **Code Style**: Follow existing code patterns and conventions
- **Quality Checks**: Ensure `bun run lint` passes with no errors or warnings
- **Documentation**: Update documentation and examples when adding features

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Calendar data sourced from official Nepali calendar specifications
- Built with modern tooling: [Bun](https://bun.sh/), [Vite](https://vitejs.dev/), [Oxlint](https://oxc.rs/), and [date-fns](https://date-fns.org/)

---

## 📞 Support

- **Issues & Bug Reports**: [GitHub Issues](https://github.com/remotemerge/nepali-date-converter/issues)
- **Author**: [Madan Sapkota](https://madansapkota.com)
- **Email**: contact+github@madansapkota.com

---

**Made with ❤️ for the Nepali developer community**
