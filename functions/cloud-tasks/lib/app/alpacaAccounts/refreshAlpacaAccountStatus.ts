import { CloudTaskHandler, firebaseFunctions } from 'ergonomic-node';
import {
	usersApi,
	User,
	isUserPendingAlpacaAccount,
	getUserPropertiesFromAlpacaAccount,
	isUserActivatedByAlpacaParams,
	isUserRejectedByAlpacaParams
} from '@wallot/js';
import { RefreshAlpacaAccountStatusTaskParams } from '@wallot/node';
import { alpaca, db, gcp, log } from '../../services.js';

export const handleRefreshAlpacaAccountStatusTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 5, minBackoffSeconds: 120 },
};

export const handleRefreshAlpacaAccountStatusTask: CloudTaskHandler<
	RefreshAlpacaAccountStatusTaskParams
> = async ({ data: { amountInCents, bankAccountId, orderId, userId } }) => {
	// Query the USER
	const userDoc = await db.collection(usersApi.collectionId).doc(userId).get();
	if (!userDoc.exists) {
		// User not found, so this task is not possible
		log({
			message:
				'Requested refresh of Alpaca activation status, but user not found',
		});
		return Promise.resolve();
	}
	const userInitialData = userDoc.data() as User;
	const isPending = isUserPendingAlpacaAccount(userInitialData);
	const isActive = isUserActivatedByAlpacaParams(userInitialData);
	const isRejected = isUserRejectedByAlpacaParams(userInitialData);
	if (!isPending || isActive || isRejected) {
		// Precondition failed
		if (!isPending) {
			// User is not pending activation by Alpaca, so this task is not possible
			log({
				message:
					'Requested refresh of Alpaca activation status, but Alpaca activation not pending',
			});
		} else if (isActive) {
			// User is already activated by Alpaca, so this task is not necessary
			log({
				message:
					'Requested refresh of Alpaca activation status, but Alpaca activation already complete',
			});
		} else {
			// User is already rejected by Alpaca, so this task is not necessary
			log({
				message:
					'Requested refresh of Alpaca activation status, but Alpaca activation already rejected',
			});
		}
		return Promise.resolve();
	}

	// Retrieve the Alpaca Account
	const alpacaAccount = await alpaca.broker.retrieveAlpacaAccount(userInitialData);

	// Update the USER
	const updateUserParams = getUserPropertiesFromAlpacaAccount(alpacaAccount);
	await db
		.collection(usersApi.collectionId)
		.doc(userId)
		.update(updateUserParams);

	// Check if Alpaca activated or rejected the account
	if (isUserActivatedByAlpacaParams(updateUserParams)) {
		// Alpaca activated the account
		// Kick back to the `create_alpaca_ach_relationship` task
		log({ message: 'Alpaca activated the account. Next up: ACH relationship' });
		await gcp.tasks.enqueueCreateAlpacaAchRelationship({
			amountInCents,
			bankAccountId,
			orderId,
			userId,
		});
		return Promise.resolve();
	}
	if (isUserRejectedByAlpacaParams(updateUserParams)) {
		// Alpaca rejected the account
		// End the process
		log({
			code: 'ALPACA_ACCOUNT_ACTIVATION_FAILED',
			message: 'Alpaca rejected the account. User updated with rejection',
			userInitialData,
			alpacaAccount,
		});
		return Promise.resolve();
	}

	// Alpaca is still processing the account
	throw new firebaseFunctions.https.HttpsError(
		'internal',
		'Alpaca account still processing',
	);
};
