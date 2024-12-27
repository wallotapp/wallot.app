import { CloudTaskHandler, firebaseFunctions } from 'ergonomic-node';
import { RefreshAlpacaAchRelationshipStatusTaskParams } from '@wallot/node';
import {
	bankAccountsApi,
	BankAccount,
	isBankAccountPendingAlpacaAchRelationship,
	isBankAccountApprovedByAlpaca,
	isBankAccountApprovedByAlpacaParams,
	isBankAccountRejectedByAlpaca,
	isBankAccountRejectedByAlpacaParams,
	getBankAccountPropertiesFromAlpacaAchRelationship,
	isUserActivatedByAlpaca,
	User
} from '@wallot/js';
import { alpaca, db, gcp, log } from '../../services.js';

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

	// Query the USER
	const userDoc = await db.collection('users').doc(userId).get();
	if (!userDoc.exists) {
		// User not found, so this task is not possible
		log({
			message:
				'Requested refresh of Alpaca ACH Relationship status, but user not found',
		});
		return Promise.resolve();
	}
	const user = userDoc.data() as User;
	if (!isUserActivatedByAlpaca(user)) {
		// User is not activated by Alpaca, so this task is not possible
		log({
			message:
				'Requested refresh of Alpaca ACH Relationship status, but user not activated by Alpaca',
		});
		return Promise.resolve();
	}

	// Retrieve the Alpaca Account
	const alpacaAchRelationship = await alpaca.broker.retrieveAlpacaAchRelationship(
		user,
		bankAccountInitialData,
	);

	// Update the USER
	const updateBankAccountParams =
		getBankAccountPropertiesFromAlpacaAchRelationship(alpacaAchRelationship);
	await db
		.collection(bankAccountsApi.collectionId)
		.doc(bankAccountId)
		.update(updateBankAccountParams);

	// Check if Alpaca activated or rejected the account
	if (isBankAccountApprovedByAlpacaParams(updateBankAccountParams)) {
		// Alpaca approved the ACH relationship
		// Kick back to the `request_alpaca_ach_transfer` task
		log({
			message: 'Alpaca approved the ACH relationship. Next up: ACH transfer',
		});
		await gcp.tasks.enqueueRequestAlpacaAchTransfer({
			amountInCents,
			bankAccountId,
			orderId,
			userId,
		});
		return Promise.resolve();
	}
	if (isBankAccountRejectedByAlpacaParams(updateBankAccountParams)) {
		// Alpaca rejected the ACH relationship
		// End the process
		log({
			code: 'ALPACA_ACH_RELATIONSHIP_FAILED',
			message:
				'Alpaca rejected the ACH relationship. BankAccount updated with rejection',
			bankAccountInitialData,
			alpacaAccount: alpacaAchRelationship,
		});
		return Promise.resolve();
	}

	// Alpaca is still processing the account
	throw new firebaseFunctions.https.HttpsError(
		'internal',
		'Alpaca ACH relationship still pending',
	);
};
