import {
  addDays,
  differenceInCalendarDays,
  endOfDay,
  isWithinInterval,
  startOfDay,
} from 'date-fns';

import { years } from './years';

export default class DateConverter {
  /** The AD date that corresponds to 1975-01-01 BS (start of supported range). */
  private readonly epochStart = new Date(Date.UTC(1918, 3, 13));

  /** The AD date that corresponds to 2099-12-30 BS (end of supported range). */
  private readonly epochEnd = new Date(Date.UTC(2043, 3, 13));

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
    const cleaned = this.toEnglishDigits(input)
      .replace(/[./|,]/g, '-')
      .trim();
    const [y, m, d] = cleaned.split('-').map(Number);

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
    const nepaliNumerals = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

    return input.replace(/[०१२३४५६७८९]/g, (char) =>
      nepaliNumerals.indexOf(char).toString(),
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
    return [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ][index];
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
    let totalDays = 0;
    for (let y = 1975; y < bsYear; y++) totalDays += years[y][12];
    for (let m = 0; m < bsMonth - 1; m++) totalDays += years[bsYear][m];
    totalDays += bsDay - 1;

    return addDays(this.epochStart, totalDays);
  }

  /**
   * Converts an AD (Gregorian) date offset to its corresponding BS (Bikram Sambat) date.
   *
   * Iterates through the Nepali calendar data year by year, then month by month,
   * subtracting days until the remaining offset pinpoints the exact BS date.
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
    let remaining = daysDiff;

    for (const y in years) {
      if (remaining >= years[y][12]) {
        remaining -= years[y][12];
        continue;
      }

      for (let m = 0; m < 12; m++) {
        if (remaining >= years[y][m]) {
          remaining -= years[y][m];
          continue;
        }

        return { year: Number(y), month: m + 1, date: remaining + 1 };
      }
    }

    throw new Error(this.errorMsg);
  }

  /**
   * Converts a Bikram Sambat (BS) date to its Gregorian (AD) equivalent.
   *
   * @returns Object with AD `year`, `month` (1-12), `date` (1-31), and `day` name.
   * @throws When the BS year is outside the supported range (1975-2099 BS).
   */
  public toAd() {
    if (this.year < 1975 || this.year > 2099) {
      throw new Error(this.errorMsg);
    }

    const adDate = this.toAdDate(this.year, this.month, this.day);

    return {
      year: adDate.getFullYear(),
      month: adDate.getMonth() + 1,
      date: adDate.getDate(),
      day: this.toDayName(adDate.getDay()),
    };
  }

  /**
   * Converts a Gregorian (AD) date to its Bikram Sambat (BS) equivalent.
   *
   * @returns Object with BS `year`, `month` (1-12), `date` (1-32), and `day` name.
   * @throws When the AD date is outside the supported range
   *         (1918-04-13 AD to 2043-04-13 AD).
   */
  public toBs() {
    const targetDate = new Date(Date.UTC(this.year, this.month - 1, this.day));

    if (
      !isWithinInterval(targetDate, {
        start: startOfDay(this.epochStart),
        end: endOfDay(this.epochEnd),
      })
    ) {
      throw new Error(this.errorMsg);
    }

    const daysDiff = differenceInCalendarDays(targetDate, this.epochStart);
    const bsDate = this.toBsDate(daysDiff);

    return { ...bsDate, day: this.toDayName(targetDate.getUTCDay()) };
  }
}
