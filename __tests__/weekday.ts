// Temporal computes the expected weekday without the converter's code. A new
// formatter for each of the ~91,000 fixtures slows the suites from about 0.3 s
// to 5 s, so this module creates one and reuses it.
const formatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' });

export const weekdayOf = (adDate: string): string =>
  formatter.format(Temporal.PlainDate.from(adDate));
