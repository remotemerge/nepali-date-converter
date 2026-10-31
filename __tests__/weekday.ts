const formatter = new Intl.DateTimeFormat('en-US', { weekday: 'long' });

// Returns the English weekday name of an AD date. It uses Temporal instead of
// the converter, so the tests compare against an independent result.
export const weekdayOf = (adDate: string): string =>
  formatter.format(Temporal.PlainDate.from(adDate));
