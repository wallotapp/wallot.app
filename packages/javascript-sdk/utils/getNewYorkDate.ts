import { DateTime } from 'luxon';

/**
 * Returns the date in New York timezone
 *
 * @param utcIsoDateWithMillisecondPrecision - The UTC ISO date with millisecond precision
 * @returns The date in New York timezone
 *
 * @example
 * ```ts
 * getNewYorkDate('2024-12-21T01:11:14.887Z'); // => '2024-12-20'
 * ```
 */
export const getNewYorkDate = (
	utcIsoDateWithMillisecondPrecision: string,
): string =>
	DateTime.fromISO(utcIsoDateWithMillisecondPrecision)
		.setZone('America/New_York')
		.toISODate();
