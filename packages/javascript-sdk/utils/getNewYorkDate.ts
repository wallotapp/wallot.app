import { DateTime } from 'luxon';

const getNewYorkDateExact = (
	utcIsoDateWithMillisecondPrecision: string,
): string =>
	DateTime.fromISO(utcIsoDateWithMillisecondPrecision)
		.setZone('America/New_York')
		.toISODate();

/**
 * Returns the date in New York timezone that is a valid trading day (Monday to Friday)
 *
 * @param utcIsoDateWithMillisecondPrecision - The UTC ISO date with millisecond precision
 * @returns The date in New York timezone
 *
 * @example
 * ```ts
 * getNewYorkDate('2024-12-21T01:11:14.887Z'); // => '2024-12-20'
 * ```
 */
export const getNewYorkDate = (utcIsoDate: string): string => {
	const newYorkDate = getNewYorkDateExact(utcIsoDate);
	const precedingTradingDate = getPrecedingTradingDate(newYorkDate);
	if (precedingTradingDate != null) {
		return precedingTradingDate;
	}
	const dayOfWeek = DateTime.fromISO(newYorkDate).weekday;
	if (dayOfWeek === 7) {
		return DateTime.fromISO(newYorkDate).minus({ days: 2 }).toISODate();
	}
	if (dayOfWeek === 6) {
		return DateTime.fromISO(newYorkDate).minus({ days: 1 }).toISODate();
	}
	return newYorkDate;
};

function getPrecedingTradingDate(date: string): string | null {
	const marketHolidays = [
		{
			date: '2024-07-04',
			day: 'Thursday',
			dayNumerical: 4,
			precedingTradingDate: '2024-07-03', // Wednesday before
		},
		{
			date: '2024-09-02',
			day: 'Monday',
			dayNumerical: 1,
			precedingTradingDate: '2024-08-30', // Friday before
		},
		{
			date: '2024-11-28',
			day: 'Thursday',
			dayNumerical: 4,
			precedingTradingDate: '2024-11-27', // Wednesday before
		},
		{
			date: '2024-12-25',
			day: 'Wednesday',
			dayNumerical: 3,
			precedingTradingDate: '2024-12-24', // Tuesday before
		},
		{
			date: '2025-01-01',
			day: 'Wednesday',
			dayNumerical: 3,
			precedingTradingDate: '2024-12-31', // Tuesday before
		},
		{
			date: '2025-01-20',
			day: 'Monday',
			dayNumerical: 1,
			precedingTradingDate: '2025-01-17', // Friday before
		},
		{
			date: '2025-02-17',
			day: 'Monday',
			dayNumerical: 1,
			precedingTradingDate: '2025-02-14', // Friday before
		},
		{
			date: '2025-04-18',
			day: 'Friday',
			dayNumerical: 5,
			precedingTradingDate: '2025-04-17', // Thursday before
		},
		{
			date: '2025-05-26',
			day: 'Monday',
			dayNumerical: 1,
			precedingTradingDate: '2025-05-23', // Friday before
		},
		{
			date: '2025-06-19',
			day: 'Thursday',
			dayNumerical: 4,
			precedingTradingDate: '2025-06-18', // Wednesday before
		},
		{
			date: '2025-07-04',
			day: 'Friday',
			dayNumerical: 5,
			precedingTradingDate: '2025-07-03', // Thursday before
		},
		{
			date: '2025-09-01',
			day: 'Monday',
			dayNumerical: 1,
			precedingTradingDate: '2025-08-29', // Friday before
		},
		{
			date: '2025-11-27',
			day: 'Thursday',
			dayNumerical: 4,
			precedingTradingDate: '2025-11-26', // Wednesday before
		},
		{
			date: '2025-12-25',
			day: 'Thursday',
			dayNumerical: 4,
			precedingTradingDate: '2025-12-24', // Wednesday before
		},
	];
	return (
		marketHolidays.find((holiday) => holiday.date === date)
			?.precedingTradingDate ?? null
	);
}
