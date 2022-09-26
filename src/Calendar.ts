import { differenceInDays, endOfDay, startOfDay } from 'date-fns';

import { Years } from './data/Years';

export default class Calendar {
  /**
   * The calendar support start date -> 1975-01-01 BS
   */
  protected readonly calStartDate: Date = startOfDay(new Date('1918-04-13'));

  /**
   * The calendar support end date -> 2099-12-30 BS
   */
  protected readonly calEndDate: Date = endOfDay(new Date('2043-04-13'));

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
  protected getBsDate(givenDate: string): { year: number; month: number; day: number } {
    // calculate days difference
    const totalDays = Math.abs(differenceInDays(startOfDay(new Date(givenDate)), this.calStartDate));

    // skip last day counting
    let counter = -1;

    // init BS date object
    const bsDate = { year: 0, month: 0, day: 0 };

    // search for current year
    for (const year in Years) {
      const daysInYear = Years[year][12];
      if (totalDays < counter + daysInYear) {
        // search for current month
        const months = [...Years[year].slice(0, 11)];
        for (const monthIndex in months) {
          // set calculated year, month and day
          if (totalDays < counter + months[monthIndex]) {
            [bsDate.year, bsDate.month, bsDate.day] = [+year, +monthIndex + 1, totalDays - counter];
            break;
          }
          counter += months[monthIndex];
        }
        break;
      }
      counter += daysInYear;
    }
    return bsDate;
  }
}
