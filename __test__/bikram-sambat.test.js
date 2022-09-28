import DateConverter from '../dist/ndc-es.js';

import { default as records } from './data.json';

// prefix zero
const padZero = (num) => (num < 10 ? `0${num}` : num);

// test dates
for (let i = 0; i < records.length; i++) {
  const { year, month, date } = new DateConverter(records[i].eng).toBs();
  const resDate = `${year}-${padZero(month)}-${padZero(date)}`;
  const nepDate = records[i].nep;

  test('The English date ' + records[i].eng + ' is equals to Nepali date date ' + resDate, () => {
    expect(resDate).toBe(nepDate);
  });
}
