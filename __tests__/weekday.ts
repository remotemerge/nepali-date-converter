// Temporal derives the weekday independently of the converter. Reusing one
// formatter keeps the fixture suites fast.
const formatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' });

export const weekdayOf = (adDate: string): string =>
  formatter.format(Temporal.PlainDate.from(adDate));
