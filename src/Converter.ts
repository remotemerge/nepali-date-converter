import { addDays, isWithinInterval, startOfDay } from 'date-fns';

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
   * The day extracted from input date.
   */
  private readonly inputDay: number;

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
    [this.inputYear, this.inputMonth, this.inputDay] = <number[]>strDate.split('-').map((num) => +num);
  }

  /**
   * Convert the input BS date to AD date.
   */
  public toAd(): { year: number; month: number; date: number; wd: string } {
    // validate year range
    if (this.inputYear < 1975 || this.inputYear > 2099) {
      throw new Error(this.dateRangeError);
    }

    // skip last day counting
    let totalDays = -1;

    for (const year in Years) {
      if (this.inputYear === +year) {
        const yearMonths = [...Years[this.inputYear].slice(0, 11)];
        for (const monthIndex in yearMonths) {
          if (this.inputMonth === +monthIndex + 1) {
            totalDays += this.inputDay;
            break;
          }
          totalDays += yearMonths[monthIndex];
        }
        break;
      }
      totalDays += Years[year][12];
    }

    // calculate date from start date
    const calcDate: Date = addDays(this.startDate, totalDays);

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
    const inputDate = `${this.inputYear}-${this.inputMonth}-${this.inputDay}`;

    // validate date range
    if (
      !isWithinInterval(startOfDay(new Date(inputDate)), {
        start: this.startDate,
        end: this.endDate,
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
