import { describe, test, expect } from 'bun:test';

import DateConverter from '../src';

import records from './data.json';

const padZero = (num: number): string =>
  num < 10 ? `0${num}` : num.toString();

describe('DateConverter', () => {
  test.each(records)(
    'converts English date %s to Nepali date %s',
    ({
      eng: englishDate,
      nep: expectedNepaliDate,
    }: {
      eng: string;
      nep: string;
    }) => {
      const { year, month, date } = new DateConverter(englishDate).toBs();
      const convertedNepaliDate = `${year}-${padZero(month)}-${padZero(date)}`;
      expect(convertedNepaliDate).toBe(expectedNepaliDate);
    },
  );
});
