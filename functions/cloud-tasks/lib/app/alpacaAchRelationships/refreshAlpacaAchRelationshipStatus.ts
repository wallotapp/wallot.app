import { CloudTaskHandler } from 'ergonomic-node';
import { RefreshAlpacaAchRelationshipStatusTaskParams } from '@wallot/node';
import {
	BankAccountPendingAlpacaAchRelationship,
	UserActivatedByAlpaca,
	AlpacaAccount,
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
	const response = await alpaca.broker.get<AlpacaAccount>(
		`v1/todo/${user.alpaca_account_id}`,
	);
	return response.json();
}
