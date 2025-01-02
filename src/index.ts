import {
  addDays,
  differenceInCalendarDays,
  endOfDay,
  isWithinInterval,
  startOfDay,
} from 'date-fns';

import { years } from './years';

export interface IDateConverter {
  toAd(): { year: number; month: number; date: number; day: string };

  toBs(): { year: number; month: number; date: number; day: string };
}

export default class DateConverter implements IDateConverter {
  /**
   * The calendar support start date -> 1975-01-01 BS
   */
  private readonly startDate = new Date('1918-04-13');

  /**
   * The calendar support end date -> 2099-12-30 BS
   */
  private readonly endDate = new Date('2043-04-13');

  /**
   * The year extracted from input date.
   */
  private readonly inputYear: number;

  /**
   * The month extracted from input date.
   */
  private readonly inputMonth: number;

  /**
   * The date extracted from input date.
   */
  private readonly inputDate: number;

  /**
   * Throw the error if date is not in supported range
   */
  private readonly dateRangeError = 'The input date is out of supported range.';

  /**
   * @param strDate {string}
   */
  public constructor(strDate: string) {
    // clean input date
    strDate = this.numToEn(strDate)
      .replace(/[./|,]/gm, '-')
      .trim();

    // update date values
    [this.inputYear, this.inputMonth, this.inputDate] = strDate
      .split('-')
      .map((num) => Number(num));
  }

  /**
   * Convert numbers from nepali to english
   */
  private numToEn(strNum: string): string {
    const nums = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

    return strNum.replace(/[०१२३४५६७८९]/gm, (str) =>
      nums.indexOf(str).toString(),
    );
  }

  /**
   * Convert weekday index to day name
   */
  private numToDay(dayIndex: number): string {
    return [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ][dayIndex];
  }

  /**
   * Calculate AD date based on input BS date
   */
  private getAdDate(
    inputYear: number,
    inputMonth: number,
    inputDate: number,
  ): Date {
    // init the counter
    let counter = 0;

    // count calendar days
    years.some((months, year) => {
      if (inputYear === year) {
        months.some((days, mi) => {
          if (inputMonth === Number(mi) + 1) {
            counter += inputDate - 1; // skip last day

            return true;
          }

          counter += days;
        });

        return true;
      }

      counter += months[12];
    });

    // calculate the output date
    return addDays(this.startDate, counter);
  }

  /**
   * Calculate BS date based on input AD date
   */
  private getBsDate(givenDate: string): {
    year: number;
    month: number;
    date: number;
  } {
    // init BS date object
    const bsDate = { year: 0, month: 0, date: 0 };
    // calculate days difference
    const totalDays = Math.abs(
      differenceInCalendarDays(new Date(givenDate), this.startDate),
    );
    // init the counter
    let counter = 0;

    // search the calendar
    years.some((months, year) => {
      // init days in the year
      const daysInYear = years[year][12];

      if (counter + daysInYear > totalDays) {
        // init months
        const months = years[year].slice(0, 12);
        months.some((days, mi) => {
          if (counter + days > totalDays) {
            // set output date
            [bsDate.year, bsDate.month, bsDate.date] = [
              year,
              mi + 1,
              totalDays - counter + 1,
            ];

            // exit from month loop
            return true;
          }

          counter += days;
        });

        // exit from year loop
        return true;
      }

      counter += daysInYear;
    });

    return bsDate;
  }

  /**
   * Convert the input BS date to AD date.
   */
  public toAd() {
    // validate year range
    if (this.inputYear < 1975 || this.inputYear > 2099) {
      throw new Error(this.dateRangeError);
    }

    // convert to AD date
    const adDate = this.getAdDate(
      this.inputYear,
      this.inputMonth,
      this.inputDate,
    );
    const weekday = this.numToDay(adDate.getDay());

    // format output
    return {
      year: adDate.getFullYear(),
      month: adDate.getMonth() + 1,
      date: adDate.getDate(),
      day: weekday,
    };
  }

  /**
   * Convert the input AD date to BS date.
   */
  public toBs() {
    // format input date
    const inputDate = `${this.inputYear}-${this.inputMonth}-${this.inputDate}`;

    // validate date range
    if (
      !isWithinInterval(startOfDay(new Date(inputDate)), {
        start: startOfDay(this.startDate),
        end: endOfDay(this.endDate),
      })
    ) {
      throw new Error(this.dateRangeError);
    }

    // convert to BS date
    const bsDate = this.getBsDate(inputDate);
    const weekday = this.numToDay(new Date(inputDate).getDay());

    // format the output
    return { ...bsDate, day: weekday };
  }
}
