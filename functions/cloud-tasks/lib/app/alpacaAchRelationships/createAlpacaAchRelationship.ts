import { CloudTaskHandler } from 'ergonomic-node';
import {
	AlpacaAchRelationship,
	UserWithAlpacaEquity,
	TokenizedBankAccount,
} from '@wallot/js';
import { CreateAlpacaAchRelationshipTaskParams } from '@wallot/node';
import { alpaca, crypto } from '../../services.js';

export const handleCreateAlpacaAchRelationshipTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 3, minBackoffSeconds: 30 },
};

export const handleCreateAlpacaAchRelationshipTask: CloudTaskHandler<
	CreateAlpacaAchRelationshipTaskParams
> = async ({ data: { amountInCents, bankAccountId, orderId, userId } }) => {
	amountInCents;
	bankAccountId;
	orderId;
	userId;
	return Promise.resolve();
};

async function createAlpacaAchRelationship(
	user: UserWithAlpacaEquity,
	bankAccount: TokenizedBankAccount,
) {
	const response = await alpaca.broker.post<AlpacaAchRelationship>(
		`v1/accounts/${user.alpaca_account_id}/ach_relationships`,
		{
			json: {
				account_owner_name: bankAccount.account_owner_name,
				bank_account_type: bankAccount.account_type,
				bank_account_number: crypto.decrypt({
					data: bankAccount.account_number_data,
					ivHex: bankAccount.account_number_iv_hex,
				}),
				bank_routing_number: bankAccount.routing_number,
				// nickname: '',
			},
		},
	);
	return response.json();
}
createAlpacaAchRelationship;
