import DateConverter from '../src';

import records from './data.json';

const padZero = (num: number): string =>
  num < 10 ? `0${num}` : num.toString();

describe('DateConverter', () => {
  it.each(records)(
    'converts English date %s to Nepali date %s',
    ({ eng: englishDate, nep: expectedNepaliDate }) => {
      const { year, month, date } = new DateConverter(englishDate).toBs();
      const convertedNepaliDate = `${year}-${padZero(month)}-${padZero(date)}`;
      expect(convertedNepaliDate).toBe(expectedNepaliDate);
    },
  );
});
