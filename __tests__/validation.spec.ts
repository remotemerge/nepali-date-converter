import { expect, test } from 'bun:test';

import DateConverter from '../src';
import { years } from '../src/years';

const format = (value: { year: number; month: number; date: number }) =>
  `${value.year}-${value.month}-${value.date}`;

test.each([
  '',
  'abc-01-01',
  'NaN-01-01',
  '1975-100000-01',
  '1975-Infinity-01',
  '1975-00-01',
  '1975-13-01',
  '1975-01-00',
  '1975-01-33',
  '1975-01-01-extra',
  '1975--01',
  '+1975-01-01',
  '2e3-01-01',
  '1975-1.5-01',
  '1975- 1-01',
  '1'.repeat(65),
  null,
  undefined,
  1975,
  {},
])('rejects malformed input %j', (input) => {
  for (const method of ['toAd', 'toBs'] as const) {
    expect(() => new DateConverter(input as string)[method]()).toThrow(
      'The input date is out of supported range.',
    );
  }
});

test.each(['-', '/', '.', ',', '|'])(
  'preserves separator %s, unpadded components, surrounding whitespace and Nepali digits',
  (separator) => {
    expect(
      new DateConverter(` २०८०${separator}१${separator}१५ `).toAd(),
    ).toEqual({
      year: 2023,
      month: 4,
      date: 28,
      day: 'Friday',
    });
  },
);

test('rejects Gregorian rollover and dates outside the supported interval', () => {
  for (const input of [
    '2023-02-29',
    '2023-02-31',
    '2024-02-30',
    '2023-04-31',
    '1918-04-12',
    '2043-04-14',
  ]) {
    expect(() => new DateConverter(input).toBs()).toThrow();
  }
  const leapDay = new DateConverter('2024-02-29').toBs();
  expect(new DateConverter(format(leapDay)).toAd()).toEqual({
    year: 2024,
    month: 2,
    date: 29,
    day: 'Thursday',
  });
  for (const input of ['1974-12-30', '2100-01-01']) {
    expect(() => new DateConverter(input).toAd()).toThrow();
  }
});

test('every BS day maps to successive UTC days and round-trips with its weekday', () => {
  const expected = new Date(Date.UTC(1918, 3, 13));
  const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  for (let year = 1975; year <= 2099; year++) {
    expect(years[year].slice(0, 12).reduce((sum, days) => sum + days, 0)).toBe(
      years[year][12],
    );
    for (let month = 1; month <= 12; month++) {
      expect(() =>
        new DateConverter(
          `${year}-${month}-${years[year][month - 1] + 1}`,
        ).toAd(),
      ).toThrow();
      for (let date = 1; date <= years[year][month - 1]; date++) {
        const ad = new DateConverter(`${year}-${month}-${date}`).toAd();
        const day = weekdays[expected.getUTCDay()];
        expect(ad).toEqual({
          year: expected.getUTCFullYear(),
          month: expected.getUTCMonth() + 1,
          date: expected.getUTCDate(),
          day,
        });
        expect(new DateConverter(format(ad)).toBs()).toEqual({
          year,
          month,
          date,
          day,
        });
        expected.setUTCDate(expected.getUTCDate() + 1);
      }
    }
  }
  expect(expected.toISOString()).toBe('2043-04-14T00:00:00.000Z');
});
