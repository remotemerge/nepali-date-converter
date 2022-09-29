import { DateConverter } from '../dist/ndc-es.js';

import { default as records } from './data.json';

// prefix zero
const padZero = (num) => (num < 10 ? `0${num}` : num);

// test dates
for (let i = 0; i < records.length; i++) {
  const nepDate = records[i].nep;
  const engDate = records[i].eng;

  const { year, month, date } = new DateConverter(nepDate).toAd();
  const resDate = `${year}-${padZero(month)}-${padZero(date)}`;

  test('The Nepali date ' + nepDate + ' is equals to English date ' + resDate, () => {
    expect(resDate).toBe(engDate);
  });
}
