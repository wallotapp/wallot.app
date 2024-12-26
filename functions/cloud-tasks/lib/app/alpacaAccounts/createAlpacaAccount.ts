import { CloudTaskHandler } from 'ergonomic-node';
import { CreateAlpacaAccountTaskParams } from '@wallot/node';
import { AlpacaAccount, KycUser } from '@wallot/js';
import { alpaca } from '../../services.js';
import { getUtcDateNow } from 'ergonomic';

export const handleCreateAlpacaAccountTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 3, minBackoffSeconds: 30 },
};

export const handleCreateAlpacaAccountTask: CloudTaskHandler<
	CreateAlpacaAccountTaskParams
> = async ({ data: { amountInCents, bankAccountId, orderId, userId } }) => {
	amountInCents;
	bankAccountId;
	orderId;
	userId;
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
