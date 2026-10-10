import { expect, test } from 'bun:test';
import DateConverter from '../src';

const format = (value: { year: number; month: number; date: number }) =>
  `${value.year}-${value.month}-${value.date}`;

for (const input of [
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
]) {
  test(`rejects malformed input ${JSON.stringify(input)}`, () => {
    for (const method of ['toAd', 'toBs'] as const) {
      expect(() => new DateConverter(input as string)[method]()).toThrow(
        'The input date is out of supported range.',
      );
    }
  });
}

test('preserves separators, unpadded components, surrounding whitespace and Nepali digits', () => {
  for (const separator of ['-', '/', '.', ',', '|']) {
    expect(
      new DateConverter(` २०८०${separator}१${separator}१५ `).toAd(),
    ).toEqual({
      year: 2023,
      month: 4,
      date: 28,
      day: 'Friday',
    });
  }
});

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
