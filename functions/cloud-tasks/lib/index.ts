// eslint-disable-next-line import/no-unresolved
import { Request as CloudTaskRequest } from 'firebase-functions/v2/tasks';
import { firebaseFunctions } from 'ergonomic-node';

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

async function handleCheckAlpacaAccountStatus({
	data: { user_id },
}: CloudTaskRequest<AlpacaListenerTaskParams>) {
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
}

type AlpacaListenerTaskParams = {
	user_id: string;
};

import { getFunctions } from 'firebase-admin/functions';

export const scheduleAlpacaAccountStatusChecks = async (userId: string) => {
	const queue = getFunctions().taskQueue<AlpacaListenerTaskParams>(
		'checkAlpacaAccountStatus',
	);
	const targetUri = await getFunctionUrl('checkAlpacaAccountStatus');
	await queue.enqueue(
		{ user_id: userId },
		{
			// How long to wait before the task is first delivered to the target service after it has been enqueued
			// Suppose you enqueue a task at 10:00 AM with scheduleDelaySeconds: 3600 (which is one hour).
			// The task won’t even be sent to your function until 11:00 AM
			scheduleDelaySeconds: 0,
			// Maximum amount of time that the target is allowed to run in response to the dispatched task
			// Let’s say at 11:00 AM, Cloud Tasks dispatches the task to your function, and dispatchDeadlineSeconds: 300 (5 minutes) is set
			// Your function must complete within 5 minutes.
			// If it finishes at 11:04 AM, everything is fine.
			// If it’s still running at 11:05 AM, Cloud Tasks will assume the attempt failed and will initiate a retry if configured.
			dispatchDeadlineSeconds: 60 * 5, // <= 5 minutes
			uri: targetUri,
		},
	);
};

// const {GoogleAuth} = require("google-auth-library");
async function getFunctionUrl(
	_name: string,
	_location = 'us-central1',
): Promise<string> {
	await new Promise((resolve) => setTimeout(resolve, 2500));
	throw new Error('Not implemented yet');
	/*if (!auth) {
    auth = new GoogleAuth({
      scopes: "https://www.googleapis.com/auth/cloud-platform",
    });
  }
  const projectId = await auth.getProjectId();
  const url = "https://cloudfunctions.googleapis.com/v2beta/" +
    `projects/${projectId}/locations/${location}/functions/${name}`;

  const client = await auth.getClient();
  const res = await client.request({url});
  const uri = res.data?.serviceConfig?.uri;
  if (!uri) {
    throw new Error(`Unable to retreive uri for function at ${url}`);
  }
  return uri;*/
}
