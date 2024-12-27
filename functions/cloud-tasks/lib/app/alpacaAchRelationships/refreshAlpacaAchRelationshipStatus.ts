import { CloudTaskHandler } from 'ergonomic-node';
import { RefreshAlpacaAchRelationshipStatusTaskParams } from '@wallot/node';
import {
	BankAccountPendingAlpacaAchRelationship,
	UserActivatedByAlpaca,
	AlpacaAchRelationship,
	bankAccountsApi,
	BankAccount,
	isBankAccountPendingAlpacaAchRelationship,
	isBankAccountApprovedByAlpaca,
	isBankAccountRejectedByAlpaca,
} from '@wallot/js';
import { alpaca, db, log } from '../../services.js';

export const handleRefreshAlpacaAchRelationshipStatusTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 5, minBackoffSeconds: 120 },
};

export const handleRefreshAlpacaAchRelationshipStatusTask: CloudTaskHandler<
	RefreshAlpacaAchRelationshipStatusTaskParams
> = async ({ data: { amountInCents, bankAccountId, orderId, userId } }) => {
	// Query the BANK_ACCOUNT
	const bankAccountDoc = await db
		.collection(bankAccountsApi.collectionId)
		.doc(bankAccountId)
		.get();
	if (!bankAccountDoc.exists) {
		// BankAccount not found, so this task is not possible
		log({
			message:
				'Requested refresh of Alpaca activation status, but bankAccount not found',
		});
		return Promise.resolve();
	}
	const bankAccountInitialData = bankAccountDoc.data() as BankAccount;
	const isPending = isBankAccountPendingAlpacaAchRelationship(
		bankAccountInitialData,
	);
	const isApproved = isBankAccountApprovedByAlpaca(bankAccountInitialData);
	const isRejected = isBankAccountRejectedByAlpaca(bankAccountInitialData);
	if (!isPending || isApproved || isRejected) {
		// Precondition failed
		if (!isPending) {
			// BANK_ACCOUNT is not pending approval by Alpaca, so this task is not possible
			log({
				message:
					'Requested refresh of Alpaca ACH relationship approval status, but Alpaca approval not pending',
			});
		} else if (isApproved) {
			// BANK_ACCOUNT is already approved by Alpaca, so this task is not necessary
			log({
				message:
					'Requested refresh of Alpaca ACH relationship approval status, but Alpaca approval already complete',
			});
		} else {
			// BANK_ACCOUNT is already rejected by Alpaca, so this task is not necessary
			log({
				message:
					'Requested refresh of Alpaca ACH relationship approval status, but Alpaca approval already rejected',
			});
		}
		return Promise.resolve();
	}
	amountInCents;
	bankAccountId;
	orderId;
	userId;
	return Promise.resolve();
};

async function retrieveAlpacaAchRelationship(
	user: UserActivatedByAlpaca,
	bankAccount: BankAccountPendingAlpacaAchRelationship,
) {
	const response = await alpaca.broker.get<AlpacaAchRelationship[]>(
		`v1/accounts/${user.alpaca_account_id}/ach_relationships`,
	);
	const achRelationships = await response.json();
	const match = achRelationships.find(
		({ id }) => id === bankAccount.alpaca_ach_relationship_id,
	);
	if (match == null) {
		throw new Error(
			`Alpaca ACH relationship ${bankAccount.alpaca_ach_relationship_id} not found`,
		);
	}
	return match;
}
