import { describe, test, expect } from 'bun:test';

import DateConverter from '../src';

import records from './data.json';

const padZero = (num: number): string =>
  num < 10 ? `0${num}` : num.toString();

describe('DateConverter Nepali to English Conversion', () => {
  test.each(records)(
    'converts Nepali date %s to English date %s',
    ({
      nep: nepaliDate,
      eng: expectedEnglishDate,
    }: {
      nep: string;
      eng: string;
    }) => {
      const { year, month, date } = new DateConverter(nepaliDate).toAd();
      const convertedEnglishDate = `${year}-${padZero(month)}-${padZero(date)}`;
      expect(convertedEnglishDate).toBe(expectedEnglishDate);
    },
  );
});

describe('Nepali Unicode numeral input', () => {
  test('converts Nepali unicode numerals to English date', () => {
    const result = new DateConverter('२०८१-०१-१५').toAd();
    expect(result.year).toBe(2024);
    expect(result.month).toBe(4);
    expect(result.date).toBe(27);
    expect(result.day).toBe('Saturday');
  });

  test('converts mixed separator with Nepali unicode numerals', () => {
    const result = new DateConverter('२०८१.०४.०१').toAd();
    expect(result.year).toBe(2024);
    expect(result.month).toBe(7);
    expect(result.date).toBe(16);
  });
});
