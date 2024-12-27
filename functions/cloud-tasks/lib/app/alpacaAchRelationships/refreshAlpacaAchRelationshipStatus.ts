import { CloudTaskHandler } from 'ergonomic-node';
import { RefreshAlpacaAchRelationshipStatusTaskParams } from '@wallot/node';
import {
	BankAccountPendingAlpacaAchRelationship,
	UserActivatedByAlpaca,
	AlpacaAchRelationship,
} from '@wallot/js';
import { alpaca } from '../../services.js';

export const handleRefreshAlpacaAchRelationshipStatusTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 5, minBackoffSeconds: 120 },
};

export const handleRefreshAlpacaAchRelationshipStatusTask: CloudTaskHandler<
	RefreshAlpacaAchRelationshipStatusTaskParams
> = async ({ data: { amountInCents, bankAccountId, orderId, userId } }) => {
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
