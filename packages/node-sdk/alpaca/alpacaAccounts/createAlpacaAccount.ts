import { KyInstance } from 'ky-universal';
import { AlpacaAccount, KycUser } from '@wallot/js';
import { getUtcDateNow } from 'ergonomic';

export const createAlpacaAccount =
	(alpacaBrokerClient: KyInstance) => async (user: KycUser) => {
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
		const response = await alpacaBrokerClient.post<AlpacaAccount>(
			'v1/accounts',
			{
				json: createAlpacaAccountParams,
			},
		);
		return response.json();
	};
