import DateConverter from '../src';

import records from './data.json';

const padZero = (num: number): string =>
  num < 10 ? `0${num}` : num.toString();

describe('DateConverter Nepali to English Conversion', () => {
  it.each(records)(
    'converts Nepali date %s to English date %s',
    ({ nep: nepaliDate, eng: expectedEnglishDate }) => {
      const { year, month, date } = new DateConverter(nepaliDate).toAd();
      const convertedEnglishDate = `${year}-${padZero(month)}-${padZero(date)}`;
      expect(convertedEnglishDate).toBe(expectedEnglishDate);
    },
  );
});
