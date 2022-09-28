import { addDays, endOfDay, isWithinInterval, startOfDay } from 'date-fns';

import Calendar from './Calendar';
import { Years } from './data/Years';

export default class Converter extends Calendar {
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

  public constructor(date: string) {
    super();
    // clean input date
    const strDate = this.numToEn(date)
      .replace(/[./|,]/gm, '-')
      .trim();

    // update date values
    [this.inputYear, this.inputMonth, this.inputDate] = <number[]>strDate.split('-').map((num) => +num);
  }

  /**
   * Convert the input BS date to AD date.
   */
  public toAd(): { year: number; month: number; date: number; wd: string } {
    // validate year range
    if (this.inputYear < 1975 || this.inputYear > 2099) {
      throw new Error(this.dateRangeError);
    }

    // init the counter
    let counter = 0;

    // count calendar days
    Years.some((months, year) => {
      if (this.inputYear === year) {
        months.some((days, mi) => {
          if (this.inputMonth === +mi + 1) {
            counter += this.inputDate - 1; // skip last day
            return true;
          }
          counter += days;
        });
        return true;
      }
      counter += months[12];
    });

    // calculate date from start date
    const calcDate = addDays(this.startDate, counter);

    // format output
    return {
      year: calcDate.getFullYear(),
      month: calcDate.getMonth() + 1,
      date: calcDate.getDate(),
      wd: this.numToDay(calcDate.getDay()),
    };
  }

  /**
   * Convert the input AD date to BS date.
   */
  public toBs(): { year: number; month: number; date: number; wd: string } {
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
    // format the output
    return { ...bsDate, wd: this.numToDay(new Date(inputDate).getDay()) };
  }
}
