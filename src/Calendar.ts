import { differenceInCalendarDays, endOfDay, startOfDay } from 'date-fns';

import { Years } from './data/Years';

export default class Calendar {
  /**
   * The calendar support start date -> 1975-01-01 BS
   */
  protected readonly startDate: Date = startOfDay(new Date('1918-04-13'));

  /**
   * The calendar support end date -> 2099-12-30 BS
   */
  protected readonly endDate: Date = endOfDay(new Date('2043-04-13'));

  /**
   * Convert numbers from nepali to english
   */
  protected numToEn(strNum: string): string {
    const nums = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
    return strNum.replace(/[०१२३४५६७८९]/gm, (str) => nums.indexOf(str).toString());
  }

  /**
   * Convert weekday index to day name
   */
  protected numToDay(dayIndex: number): string {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayIndex];
  }

  /**
   * Calculate nepali date based on input or default
   */
  protected getBsDate(givenDate: string): { year: number; month: number; date: number } {
    // init BS date object
    const bsDate = { year: 0, month: 0, date: 0 };
    // calculate days difference
    const calendarDays = Math.abs(differenceInCalendarDays(new Date(givenDate), new Date('1918-04-13')));
    // init the counter
    let counter = 0;

    // search the calendar
    Years.some((months, year) => {
      // init days in the year
      const daysInYear = Years[year][12];

      if (counter + daysInYear > calendarDays) {
        // init months
        const months = Years[year].slice(0, 12);
        months.some((days, mi) => {
          if (counter + days > calendarDays) {
            // set output date
            [bsDate.year, bsDate.month, bsDate.date] = [year, mi + 1, calendarDays - counter + 1];
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
}
