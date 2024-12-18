import {
	CloudTaskHandler,
	firebaseFunctions,
	getCloudFunctionUrl,
} from 'ergonomic-node';

import { getFunctions } from 'firebase-admin/functions';
import { secrets } from './secrets.js';
import { directoryPath } from './directoryPath.js';
import { v4 } from 'uuid';
const serviceAccountPath = `${directoryPath}/../gmailApiServiceAccount.json`;

const scheduleAlpacaAccountStatusChecks = async (userId: string) => {
	const queue = getFunctions().taskQueue<AlpacaListenerTaskParams>(
		'checkAlpacaAccountStatus',
	);
	const targetUri = await getCloudFunctionUrl({
		...secrets,
		functionName: 'checkAlpacaAccountStatus',
		serviceAccountPath,
	});
	const taskId = v4();
	await queue.enqueue(
		{ user_id: userId },
		{
			// Maximum amount of time that the target is allowed to run in response to the dispatched task
			// Let’s say at 11:00 AM, Cloud Tasks dispatches the task to your function, and dispatchDeadlineSeconds: 300 (5 minutes) is set
			// Your function must complete within 5 minutes.
			// If it finishes at 11:04 AM, everything is fine.
			// If it’s still running at 11:05 AM, Cloud Tasks will assume the attempt failed and will initiate a retry if configured.
			dispatchDeadlineSeconds: 60 * 5, // <= 5 minutes
			// The ID of the task. This is useful for ensuring that the task is only enqueued 
			// once and for retrieving the task later.
			id: taskId,
			// How long to wait before the task is first delivered to the target service after it has been enqueued
			// Suppose you enqueue a task at 10:00 AM with scheduleDelaySeconds: 3600 (which is one hour).
			// The task won’t even be sent to your function until 11:00 AM
			scheduleDelaySeconds: 0,
			uri: targetUri,
		},
	);
};
scheduleAlpacaAccountStatusChecks;

const handleCheckAlpacaAccountStatus: CloudTaskHandler<
	AlpacaListenerTaskParams
> = async ({ data: { user_id } }) => {
	if (!user_id || typeof user_id !== 'string') {
		throw new firebaseFunctions.https.HttpsError(
			'invalid-argument',
			'User ID is required',
		);
	}

	if (Math.random() > 0.5) {
		const result = {
			result: 'PENDING',
			message:
				'Try again- still waiting for the order to be filled for customer with id: ' +
				user_id,
		};
		console.log(result);
		throw new firebaseFunctions.https.HttpsError(
			'internal',
			'Order still pending',
		);
	} else {
		const result = {
			result: 'DONE',
			message: 'Order has been filled for customer with id: ' + user_id,
		};
		console.log(result);
		return Promise.resolve();
	}
};

export const checkAlpacaAccountStatus =
	firebaseFunctions.tasks.onTaskDispatched<AlpacaListenerTaskParams>(
		{
			retryConfig: {
				maxAttempts: 5,
				minBackoffSeconds: 60, // Retry after 1 minute
			},
			rateLimits: {
				maxConcurrentDispatches: 6,
			},
		},
		handleCheckAlpacaAccountStatus,
	);

type AlpacaListenerTaskParams = {
	user_id: string;
};
