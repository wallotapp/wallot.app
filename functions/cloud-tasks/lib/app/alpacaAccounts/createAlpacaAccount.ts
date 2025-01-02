import { CloudTaskHandler } from 'ergonomic-node';
import { CreateAlpacaAccountTaskParams } from '@wallot/node';
import {
	usersApi,
	User,
	isUserPendingAlpacaAccount,
	isKycUser,
	UpdateUserParams,
	getUserPropertiesFromAlpacaAccount,
} from '@wallot/js';
import { alpaca, db, gcp, log } from '../../services.js';

export const handleCreateAlpacaAccountTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 3, minBackoffSeconds: 30 },
};

/**
 * Preconditions:
 * 	- USER has completed KYC information
 * 	- USER is not pending activation by Alpaca
 */
export const handleCreateAlpacaAccountTask: CloudTaskHandler<
	CreateAlpacaAccountTaskParams
> = async ({
	data: { achTransferId = null, amountInCents, bankAccountId, orderId, userId },
}) => {
	// Query the USER
	const userDoc = await db.collection(usersApi.collectionId).doc(userId).get();
	if (!userDoc.exists) {
		// User not found, so this task is not possible
		log({
			message: 'Requested Alpaca activation, but user not found',
		});
		return Promise.resolve();
	}
	const user = userDoc.data() as User;
	if (!isKycUser(user)) {
		// Precondition failed
		// User has not completed KYC information, so this task is not possible
		log({
			message: 'Requested Alpaca activation, but user has not completed KYC',
		});
		return Promise.resolve();
	}
	if (isUserPendingAlpacaAccount(user)) {
		// Precondition failed
		// User is already pending activation by Alpaca, so this task is not necessary
		log({
			message:
				'Requested Alpaca activation, but Alpaca activation already pending',
		});
		return Promise.resolve();
	}

	// Create the Alpaca Account
	const alpacaAccount = await alpaca.broker.createAlpacaAccount(user);

	// Update the USER
	const updateUserParams: UpdateUserParams =
		getUserPropertiesFromAlpacaAccount(alpacaAccount);
	await db
		.collection(usersApi.collectionId)
		.doc(userId)
		.update(updateUserParams);

	// Kick to the `refreshAlpacaAccountStatus` task
	await gcp.tasks.enqueueRefreshAlpacaAccountStatus({
		achTransferId: achTransferId ?? undefined,
		amountInCents,
		bankAccountId,
		orderId,
		userId,
	});

	// Task complete
	return Promise.resolve();
};
