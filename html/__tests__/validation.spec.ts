import { expect, test } from 'bun:test';
import DateConverter from '../src';

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
