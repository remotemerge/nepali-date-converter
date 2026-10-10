# Nepali Date Converter

[![npm](https://img.shields.io/npm/v/@remotemerge/nepali-date-converter?logo=npm&logoColor=fff)](https://www.npmjs.com/package/@remotemerge/nepali-date-converter)
[![Test](https://img.shields.io/github/actions/workflow/status/remotemerge/nepali-date-converter/test.yml?branch=main&logo=github&logoColor=fff&label=test)](https://github.com/remotemerge/nepali-date-converter/actions/workflows/test.yml)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/@remotemerge/nepali-date-converter?label=minzipped)](https://bundlephobia.com/package/@remotemerge/nepali-date-converter)
[![License](https://img.shields.io/github/license/remotemerge/nepali-date-converter)](https://github.com/remotemerge/nepali-date-converter/blob/main/LICENSE)

Convert Nepali dates to English dates and back. This library converts between Bikram Sambat (BS, also written Vikram Samvat), the official calendar of Nepal, and the Gregorian (AD) calendar, in JavaScript and TypeScript.

```js
import DateConverter from '@remotemerge/nepali-date-converter';

new DateConverter('2080-01-15').toAd(); // { year: 2023, month: 4, date: 28, day: 'Friday' }
new DateConverter('2023-04-28').toBs(); // { year: 2080, month: 1, date: 15, day: 'Friday' }
```

- Converts in both directions for every day from 1975-01-01 BS to 2099-12-30 BS (1918-04-13 to 2043-04-13 AD).
- Looks up the length of every BS month in a table instead of using a fixed offset. The test suite round-trips every day in the range.
- Returns the same result in every timezone.
- Accepts Devanagari digits (`२०८०-०१-१५`) and the separators `-` `/` `.` `,` `|`.
- Ships ESM, CommonJS, a browser script, and TypeScript declarations, with no runtime dependencies.

## Installation

```sh
npm install @remotemerge/nepali-date-converter
```

The package works the same with `yarn add`, `pnpm add`, or `bun add`.

## Usage

Create a `DateConverter` with a date string in year-month-day order, then call `toAd()` if the string is a BS date or `toBs()` if it is an AD date. Both methods return a plain object.

```js
import DateConverter from '@remotemerge/nepali-date-converter';

const ad = new DateConverter('2081-01-15').toAd();
// { year: 2024, month: 4, date: 27, day: 'Saturday' }

const bs = new DateConverter('2024-02-29').toBs();
// { year: 2080, month: 11, date: 17, day: 'Thursday' }
```

`month` and `date` are 1-based numbers, and `day` is the English weekday name.

### Input formats

The year must have four digits. The month and day may have one or two digits. Leading and trailing whitespace is ignored.

```js
new DateConverter('2081-01-15'); // hyphen
new DateConverter('2081/1/15'); // slash, no zero padding
new DateConverter('2081.01.15'); // dot
new DateConverter('2081,01,15'); // comma
new DateConverter('2081|01|15'); // pipe
new DateConverter('२०८१-०१-१५'); // Devanagari digits
```

Other orders such as `15-01-2081`, `Date` objects, and timestamps are not accepted.

### Today's date in Nepal

The converter works with calendar dates and has no notion of time or timezone. To get today's BS date, first decide which timezone "today" belongs to. This example uses Nepal time regardless of where the code runs:

```js
// formatToParts returns each field separately, so the result does not
// depend on the date order a locale uses.
const parts = Object.fromEntries(
  new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kathmandu',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
    .formatToParts(new Date())
    .map(({ type, value }) => [type, value]),
);

const today = `${parts.year}-${parts.month}-${parts.day}`;
const { year, month, date } = new DateConverter(today).toBs();
```

### Formatting the result

The library returns numbers and leaves formatting to you. For a zero-padded `YYYY-MM-DD` string:

```js
const { year, month, date } = new DateConverter('2023-04-28').toBs();
const pad = (n) => String(n).padStart(2, '0');

`${year}-${pad(month)}-${pad(date)}`; // '2080-01-15'
```

### Handling invalid input

Invalid input throws an `Error` with the message `The input date is out of supported range.` The constructor throws for malformed strings. `toAd()` and `toBs()` throw for dates that do not exist in that calendar or fall outside the supported range. Wrap both in the same `try` block:

```js
function toAdOrNull(bsDate) {
  try {
    return new DateConverter(bsDate).toAd();
  } catch {
    return null;
  }
}

toAdOrNull('2080-01-32'); // null: Baishakh 2080 has 31 days
toAdOrNull('2100-01-01'); // null: outside the supported range
```

Invalid dates never roll over into the next month. `new DateConverter('2023-02-29').toBs()` throws instead of returning the BS date for March 1.

## Use cases

Use it wherever an app stores or shows Nepali dates (miti):

- Show BS dates next to AD dates in calendars, date pickers, and published timestamps.
- Convert dates of birth and government document dates entered in BS.
- Work with BS dates in accounting, payroll, and leave systems that follow the Nepali fiscal year.
- Clean or import datasets that mix BS and AD dates.

## API

### `new DateConverter(date: string)`

Parses `date` as year, month, and day. It does not check whether the date is BS or AD; the method you call decides that.

Throws if `date` is not a string, is longer than 64 characters, does not match the [input formats](#input-formats), has a month outside 1 to 12, or has a day outside 1 to 32.

### `toAd(): DateResult`

Treats the input as a BS date and returns the matching Gregorian date.

Throws if the year is outside 1975 to 2099 or the day is past the end of that BS month.

### `toBs(): DateResult`

Treats the input as a Gregorian date and returns the matching BS date.

Throws if the date does not exist in the Gregorian calendar or is outside 1918-04-13 to 2043-04-13.

### `DateResult`

```ts
{
  year: number; // four-digit year
  month: number; // 1 to 12
  date: number; // day of the month: 1 to 31 for AD, 1 to 32 for BS
  day: string; // 'Sunday' to 'Saturday'
}
```

The package does not export a named type for the result. In TypeScript, derive it from the method:

```ts
import DateConverter from '@remotemerge/nepali-date-converter';

type DateResult = ReturnType<DateConverter['toAd']>;
```

## Supported range

| Calendar  | First date | Last date  |
| --------- | ---------- | ---------- |
| BS        | 1975-01-01 | 2099-12-30 |
| Gregorian | 1918-04-13 | 2043-04-13 |

BS month lengths vary from year to year (29 to 32 days), so the library stores each month's length for every supported year. Dates outside this range throw rather than return an estimate.

The library converts dates only. It does not format month names, output Devanagari digits, or handle time of day.

## Module formats and runtimes

The default export is the `DateConverter` class in every format.

**ES modules**

```js
import DateConverter from '@remotemerge/nepali-date-converter';
```

**CommonJS**

```js
const DateConverter = require('@remotemerge/nepali-date-converter');
```

**Browser script tag.** The browser build defines a global `DateConverter`:

```html
<script src="https://cdn.jsdelivr.net/npm/@remotemerge/nepali-date-converter@1/ndc-browser.js"></script>
<script>
  console.log(new DateConverter('2080-01-15').toAd());
</script>
```

Pin an exact version in the URL for production use.

The package requires Node.js 18.12 or later and also runs on Bun. Type declarations are included for both `import` and `require` consumers.

## About Bikram Sambat

Bikram Sambat is the official calendar of Nepal. Its year begins in mid-April with the month of Baishakh and runs about 56 to 57 years ahead of the Gregorian year. Months follow the sun's movement through the zodiac, so their lengths change each year and are published in advance rather than computed from a simple rule. This is why the converter uses a lookup table.

## Security

See [SECURITY](SECURITY.md) for supported versions and how to report vulnerabilities privately.

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md) for setup instructions, required checks, and how to submit a pull request.

## Code of Conduct

See [CODE OF CONDUCT](CODE_OF_CONDUCT.md) for community expectations and how to report concerns.

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
