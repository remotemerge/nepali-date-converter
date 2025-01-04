import {
  addDays,
  differenceInCalendarDays,
  endOfDay,
  isWithinInterval,
  startOfDay,
} from 'date-fns';

import { years } from './years';

export default class DateConverter {
  // Supported date range for the Nepali calendar (1975 BS - 2099 BS)
  private readonly startDate = new Date('1918-04-13'); // 1975-01-01 BS
  private readonly endDate = new Date('2043-04-13'); // 2099-12-30 BS
  private readonly dateRangeError = 'The input date is out of supported range.';

  // Extracted values from the input date string
  private readonly inputYear: number;
  private readonly inputMonth: number;
  private readonly inputDate: number;

  constructor(strDate: string) {
    // Parse and clean the input date string
    const [year, month, date] = this.parseDateString(strDate);
    this.inputYear = year;
    this.inputMonth = month;
    this.inputDate = date;
  }

  /**
   * Parses and cleans the input date string.
   * Converts Nepali numerals to English and splits into year, month, and date.
   */
  private parseDateString(strDate: string): [number, number, number] {
    const cleanedDate = this.numToEn(strDate)
      .replace(/[./|,]/g, '-')
      .trim();
    const [year, month, date] = cleanedDate.split('-').map(Number);

    return [year, month, date];
  }

  /**
   * Converts Nepali numerals (०-९) to English numerals (0-9).
   */
  private numToEn(strNum: string): string {
    const nepaliNumerals = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

    return strNum.replace(/[०१२३४५६७८९]/g, (char) =>
      nepaliNumerals.indexOf(char).toString(),
    );
  }

  /**
   * Converts a day index (0-6) to a day name (Sunday-Saturday).
   */
  private numToDay(dayIndex: number): string {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    return days[dayIndex];
  }

  /**
   * Calculates the AD date for a given BS date.
   * Uses the total days difference from the start date (1975-01-01 BS).
   */
  private getAdDate(year: number, month: number, date: number): Date {
    let totalDays = 0;

    // Add days for each year before the input year
    for (let y = 1975; y < year; y++) {
      totalDays += years[y][12]; // daysInYear is stored at index 12
    }

    // Add days for each month before the input month
    for (let m = 0; m < month - 1; m++) {
      totalDays += years[year][m];
    }

    // Add days for the current month
    totalDays += date - 1; // Subtract 1 to exclude the current day

    return addDays(this.startDate, totalDays);
  }

  /**
   * Calculates the BS date for a given AD date.
   * Uses the total days difference from the start date (1975-01-01 BS).
   */
  private getBsDate(givenDate: string): {
    year: number;
    month: number;
    date: number;
  } {
    const targetDate = new Date(givenDate);
    let remainingDays = differenceInCalendarDays(targetDate, this.startDate);

    // Iterate through years and months to find the BS date
    for (const year in years) {
      const daysInYear = years[year][12];

      if (remainingDays >= daysInYear) {
        remainingDays -= daysInYear;
        continue;
      }

      for (let month = 0; month < 12; month++) {
        const daysInMonth = years[year][month];

        if (remainingDays >= daysInMonth) {
          remainingDays -= daysInMonth;
          continue;
        }

        // Return the calculated BS date
        return {
          year: Number(year),
          month: month + 1,
          date: remainingDays + 1,
        };
      }
    }

    throw new Error(this.dateRangeError);
  }

  /**
   * Converts the input BS date to an AD date.
   * Returns an object with year, month, date, and day.
   */
  public toAd() {
    // Validate the input year range
    if (this.inputYear < 1975 || this.inputYear > 2099) {
      throw new Error(this.dateRangeError);
    }

    // Calculate the AD date and weekday
    const adDate = this.getAdDate(
      this.inputYear,
      this.inputMonth,
      this.inputDate,
    );
    const weekday = this.numToDay(adDate.getDay());

    return {
      year: adDate.getFullYear(),
      month: adDate.getMonth() + 1,
      date: adDate.getDate(),
      day: weekday,
    };
  }

  /**
   * Converts the input AD date to a BS date.
   * Returns an object with year, month, date, and day.
   */
  public toBs() {
    // Format the input date string
    const inputDate = `${this.inputYear}-${this.inputMonth}-${this.inputDate}`;
    const targetDate = new Date(inputDate);

    // Validate the input date range
    if (
      !isWithinInterval(targetDate, {
        start: startOfDay(this.startDate),
        end: endOfDay(this.endDate),
      })
    ) {
      throw new Error(this.dateRangeError);
    }

    // Calculate the BS date and weekday
    const bsDate = this.getBsDate(inputDate);
    const weekday = this.numToDay(targetDate.getDay());

    return { ...bsDate, day: weekday };
  }
}
