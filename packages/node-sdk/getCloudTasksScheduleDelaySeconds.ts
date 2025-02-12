import { DateTime } from 'luxon';

/**
 * Calculates the delay in seconds from now until the provided UTC ISO date.
 * If the date is in the past, it returns 0.
 * Throws an error if the scheduled time is more than 30 days in the future.
 *
 * @param targetUtcIso - A UTC ISO date string with millisecond precision (e.g., "2025-02-11T12:34:56.789Z")
 * @returns The delay in seconds (integer) for scheduling a Cloud Task.
 * @throws Error if the provided date is invalid or more than 30 days in the future.
 */
export function getCloudTasksScheduleDelaySeconds(targetUtcIso: string): number {
	// Get the current time in UTC.
	const now = DateTime.utc();

	// Parse the provided ISO date as UTC.
	const targetTime = DateTime.fromISO(targetUtcIso, { zone: 'utc' });
	if (!targetTime.isValid) {
		throw new Error('Invalid ISO date format');
	}

	// Calculate the maximum allowed time (30 days from now).
	const maxAllowedTime = now.plus({ days: 30 });
	if (targetTime > maxAllowedTime) {
		throw new Error('Scheduled time is more than 30 days in the future');
	}

	// Calculate the difference in seconds.
	const diffInSeconds = targetTime.diff(now, 'seconds').seconds;

	// Return a non-negative integer value.
	return Math.max(0, Math.floor(diffInSeconds));
}
