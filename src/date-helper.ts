/**
 * Adds a specified number of days to a given date.
 *
 * @param date - The original date.
 * @param days - Number of days to add (can be negative).
 * @returns A new Date with the days added.
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
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
