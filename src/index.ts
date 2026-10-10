import { addDays, differenceInCalendarDays } from './date-helper';

import { years } from './years';

const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

/** Days from 1975-01-01 BS to the first day of each BS year; index 2100 is the range length. */
const yearOffsets: number[] = [];
yearOffsets[1975] = 0;
for (let y = 1975; y <= 2099; y++) {
  yearOffsets[y + 1] = yearOffsets[y] + years[y][12];
}

export default class DateConverter {
  /** The AD date that corresponds to 1975-01-01 BS (start of supported range). */
  private readonly epochStart = new Date(Date.UTC(1918, 3, 13));

  /** Error message thrown when the input date is outside the supported range. */
  private readonly errorMsg = 'The input date is out of supported range.';

  /** Parsed year from the input date string. */
  private readonly year: number;

  /** Parsed month (1-12) from the input date string. */
  private readonly month: number;

  /** Parsed day from the input date string. */
  private readonly day: number;

  /**
   * Creates a DateConverter instance from a date string.
   * Accepts both BS and AD date formats with separators: `-`, `/`, `.`, `,`, `|`.
   * Also supports Nepali Unicode numerals (e.g., `२०८१-०१-१५`).
   *
   * @param dateInput - Date string in `YYYY-MM-DD` format (BS or AD).
   */
  constructor(dateInput: string) {
    const [y, m, d] = this.parse(dateInput);
    this.year = y;
    this.month = m;
    this.day = d;
  }

  /**
   * Parses a date string by converting Nepali numerals to English,
   * normalizing separators to `-`, and extracting year, month, and day.
   *
   * @param input - Raw date string from the user.
   * @returns Tuple of `[year, month, day]` as numbers.
   */
  private parse(input: string): [number, number, number] {
    if (typeof input !== 'string' || input.length > 64) {
      throw new Error(this.errorMsg);
    }

    const cleaned = this.toEnglishDigits(input)
      .replace(/[./|,]/g, '-')
      .trim();
    if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(cleaned)) {
      throw new Error(this.errorMsg);
    }
    const [y, m, d] = cleaned.split('-').map(Number);
    if (m < 1 || m > 12 || d < 1 || d > 32) {
      throw new Error(this.errorMsg);
    }

    return [y, m, d];
  }

  /**
   * Converts Nepali Unicode numerals (०-९) to their English equivalents (0-9).
   * Non-Nepali characters are left unchanged.
   *
   * @param input - String that may contain Nepali numerals.
   * @returns String with Nepali numerals replaced by English digits.
   */
  private toEnglishDigits(input: string): string {
    return input.replace(/[०-९]/g, (char) =>
      String(char.charCodeAt(0) - 0x966),
    );
  }

  /**
   * Maps a day index (0-6) to its English day name.
   * 0 = Sunday, 1 = Monday, ..., 6 = Saturday.
   *
   * @param index - Day of week index from `Date.getDay()` or `Date.getUTCDay()`.
   * @returns Full English day name.
   */
  private toDayName(index: number): string {
    return dayNames[index];
  }

  /**
   * Converts a BS (Bikram Sambat) date to its corresponding AD (Gregorian) date.
   *
   * Sums the days from the epoch (1975-01-01 BS) to the given BS date,
   * then adds that offset to the epoch start AD date.
   *
   * @param bsYear - Bikram Sambat year (1975-2099).
   * @param bsMonth - Bikram Sambat month (1-12).
   * @param bsDay - Bikram Sambat day (1-32 depending on month).
   * @returns AD date as a JavaScript `Date` object.
   */
  private toAdDate(bsYear: number, bsMonth: number, bsDay: number): Date {
    let totalDays = yearOffsets[bsYear];
    for (let m = 0; m < bsMonth - 1; m++) totalDays += years[bsYear][m];
    totalDays += bsDay - 1;

    return addDays(this.epochStart, totalDays);
  }

  /**
   * Converts an AD (Gregorian) date offset to its corresponding BS (Bikram Sambat) date.
   *
   * Finds the year containing the offset, then walks its months
   * until the remaining offset pinpoints the exact BS date.
   *
   * @param daysDiff - Number of days from the BS epoch start (1975-01-01 BS).
   * @returns Object containing BS `year`, `month`, and `date`.
   * @throws When the offset is outside the supported calendar range.
   */
  private toBsDate(daysDiff: number): {
    year: number;
    month: number;
    date: number;
  } {
    if (daysDiff < 0 || daysDiff >= yearOffsets[2100]) {
      throw new Error(this.errorMsg);
    }

    let y = 1975;
    while (daysDiff >= yearOffsets[y + 1]) y++;

    let remaining = daysDiff - yearOffsets[y];
    let m = 0;
    while (remaining >= years[y][m]) remaining -= years[y][m++];

    return { year: y, month: m + 1, date: remaining + 1 };
  }

  /**
   * Converts a Bikram Sambat (BS) date to its Gregorian (AD) equivalent.
   *
   * @returns Object with AD `year`, `month` (1-12), `date` (1-31), and `day` name.
   * @throws When the BS date is invalid or outside 1975-2099 BS.
   */
  public toAd() {
    if (
      this.year < 1975 ||
      this.year > 2099 ||
      this.day > years[this.year][this.month - 1]
    ) {
      throw new Error(this.errorMsg);
    }

    const adDate = this.toAdDate(this.year, this.month, this.day);

    return {
      year: adDate.getUTCFullYear(),
      month: adDate.getUTCMonth() + 1,
      date: adDate.getUTCDate(),
      day: this.toDayName(adDate.getUTCDay()),
    };
  }

  /**
   * Converts a Gregorian (AD) date to its Bikram Sambat (BS) equivalent.
   *
   * @returns Object with BS `year`, `month` (1-12), `date` (1-32), and `day` name.
   * @throws When the AD date is invalid or outside the supported range
   *         (1918-04-13 AD to 2043-04-13 AD).
   */
  public toBs() {
    const targetDate = new Date(Date.UTC(this.year, this.month - 1, this.day));

    if (
      targetDate.getUTCFullYear() !== this.year ||
      targetDate.getUTCMonth() !== this.month - 1 ||
      targetDate.getUTCDate() !== this.day
    ) {
      throw new Error(this.errorMsg);
    }

    const bsDate = this.toBsDate(
      differenceInCalendarDays(targetDate, this.epochStart),
    );

    return { ...bsDate, day: this.toDayName(targetDate.getUTCDay()) };
  }
}
