import { DateTime, Duration } from 'luxon';

/**
 * Returns a date n days in the future
 *
 * @param date - The date in the format 'YYYY-MM-DD'
 * @param days - The number of days to add to the date
 * @returns
 */
export const getFutureDate = (date: string, days: number): string =>
	DateTime.fromISO(date).plus(Duration.fromObject({ days })).toISODate();
