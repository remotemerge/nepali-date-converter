import DateConverter from '../dist/ndc-es.js';

import { default as records } from './data.json';

// prefix zero
const padZero = (num) => (num < 10 ? `0${num}` : num);

// test dates
for (let i = 0; i < records.length; i++) {
  const { year, month, day } = new DateConverter(records[i].eng).toBs();
  const resDate = `${year}-${padZero(month)}-${padZero(day)}`;
  const nepDate = records[i].nep;

  test('The input date ' + nepDate + ' is equals to converted date ' + resDate, () => {
    expect(resDate).toBe(nepDate);
  });

  if (i > 100) {
    break;
  }
}
