import { handleKyError } from 'ergonomic';
import { KyInstance } from 'ky-universal';
import { AlpacaAccount, KycUser } from '@wallot/js';

export const createAlpacaAccount =
	(alpacaBrokerClient: KyInstance) => async (user: KycUser) => {
		try {
			const createAlpacaAccountParams: Pick<
				AlpacaAccount,
				'agreements' | 'contact' | 'disclosures' | 'identity'
			> = {
				agreements: user.alpaca_account_agreements,
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
		} catch (err) {
			const kyErr = await handleKyError(err);
			return Promise.reject(kyErr);
		}
	};
