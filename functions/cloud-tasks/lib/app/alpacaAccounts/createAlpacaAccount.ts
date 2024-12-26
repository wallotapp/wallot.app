import { CloudTaskHandler } from 'ergonomic-node';
import { CreateAlpacaAccountTaskParams } from '@wallot/node';
import {
	AlpacaAccount,
	KycUser,
	usersApi,
	User,
	isUserActivatedByAlpaca,
	isUserPendingAlpacaAccount,
	isKycUser,
	UpdateUserParams,
	getUserPropertiesFromAlpacaAccount,
} from '@wallot/js';
import { alpaca, db, gcp, log } from '../../services.js';
import { getUtcDateNow } from 'ergonomic';

export const handleCreateAlpacaAccountTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 3, minBackoffSeconds: 30 },
};

/**
 * Preconditions:
 * 	- USER has completed KYC information
 * 	- USER is not pending activation by Alpaca
 * 	- USER is not activated by Alpaca
 */
export const handleCreateAlpacaAccountTask: CloudTaskHandler<
	CreateAlpacaAccountTaskParams
> = async ({ data: { amountInCents, bankAccountId, orderId, userId } }) => {
	// Query the USER
	const userDoc = await db.collection(usersApi.collectionId).doc(userId).get();
	if (!userDoc.exists) {
		// User not found, so this task is not possible
		log({
			message: 'Requested ACH Relationship, but user not found',
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
	if (isUserActivatedByAlpaca(user)) {
		// Precondition failed
		// Alpaca activation is already complete, so this task is not necessary
		log({
			message:
				'Requested Alpaca activation, but Alpaca activation already complete',
		});
		return Promise.resolve();
	}

	// Create the Alpaca Account
	const alpacaAccount = await createAlpacaAccount(user);

	// Update the USER
	const updateUserParams: UpdateUserParams =
		getUserPropertiesFromAlpacaAccount(alpacaAccount);
	await db
		.collection(usersApi.collectionId)
		.doc(userId)
		.update(updateUserParams);

	// Kick to the `refresh_alpaca_account_status` task
	await gcp.tasks.enqueueRefreshAlpacaAccountStatus({
		amountInCents,
		bankAccountId,
		orderId,
		userId,
	});

	// Task complete
	return Promise.resolve();
};

async function createAlpacaAccount(user: KycUser) {
	const createAlpacaAccountParams: Pick<
		AlpacaAccount,
		'agreements' | 'contact' | 'disclosures' | 'identity'
	> = {
		agreements: [
			{
				agreement: 'customer_agreement',
				ip_address: '127.0.0.1',
				signed_at: getUtcDateNow(),
			},
		],
		contact: user.alpaca_account_contact,
		disclosures: user.alpaca_account_disclosures,
		identity: user.alpaca_account_identity,
	};
	const response = await alpaca.broker.post<AlpacaAccount>('v1/accounts', {
		json: createAlpacaAccountParams,
	});
	return response.json();
}
