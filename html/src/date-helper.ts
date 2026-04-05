/**
 * Adds a specified number of days to a given date.
 *
 * @param date - The original date.
 * @param days - Number of days to add (can be negative).
 * @returns A new Date with the days added.
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date.getTime());
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

/**
 * Calculates the difference in calendar days between two dates.
 * Uses UTC time to avoid timezone issues.
 *
 * @param dateLeft - The later date.
 * @param dateRight - The earlier date.
 * @returns Number of calendar days between the two dates.
 */
export function differenceInCalendarDays(
  dateLeft: Date,
  dateRight: Date,
): number {
  const utcLeft = Date.UTC(
    dateLeft.getUTCFullYear(),
    dateLeft.getUTCMonth(),
    dateLeft.getUTCDate(),
  );
  const utcRight = Date.UTC(
    dateRight.getUTCFullYear(),
    dateRight.getUTCMonth(),
    dateRight.getUTCDate(),
  );
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((utcLeft - utcRight) / msPerDay);
}

/**
 * Returns the start of the day (midnight) for a given date in UTC.
 *
 * @param date - The original date.
 * @returns A new Date set to 00:00:00.000 UTC.
 */
export function startOfDay(date: Date): Date {
  return new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
  );
}

/**
 * Returns the end of the day (23:59:59.999) for a given date in UTC.
 *
 * @param date - The original date.
 * @returns A new Date set to 23:59:59.999 UTC.
 */
export function endOfDay(date: Date): Date {
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      23,
      59,
      59,
      999,
    ),
  );
}

/**
 * Checks if a date is within a given interval (inclusive).
 *
 * @param date - The date to check.
 * @param interval - Object with `start` and `end` dates.
 * @returns True if the date is within the interval, false otherwise.
 */
export function isWithinInterval(
  date: Date,
  interval: { start: Date; end: Date },
): boolean {
  const time = date.getTime();
  return time >= interval.start.getTime() && time <= interval.end.getTime();
}
