import { endOfDay, isWithinInterval, startOfDay } from 'date-fns';

import Calendar from './Calendar';

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
  public toAd(): { year: number; month: number; date: number; day: string } {
    // validate year range
    if (this.inputYear < 1975 || this.inputYear > 2099) {
      throw new Error(this.dateRangeError);
    }

    // convert to AD date
    const adDate = this.getAdDate(this.inputYear, this.inputMonth, this.inputDate);
    const weekday = this.numToDay(adDate.getDay());

    // format output
    return { year: adDate.getFullYear(), month: adDate.getMonth() + 1, date: adDate.getDate(), day: weekday };
  }

  /**
   * Convert the input AD date to BS date.
   */
  public toBs(): { year: number; month: number; date: number; day: string } {
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
