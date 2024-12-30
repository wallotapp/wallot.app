import { handleKyError } from 'ergonomic';
import { KyInstance } from 'ky-universal';
import { AlpacaAccount, UserPendingAlpacaAccount } from '@wallot/js';

export const retrieveAlpacaAccount =
	(alpacaBrokerClient: KyInstance) =>
	async (user: UserPendingAlpacaAccount) => {
		try {
			const response = await alpacaBrokerClient.get<AlpacaAccount>(
				`v1/accounts/${user.alpaca_account_id}`,
			);
			return response.json();
		} catch (err) {
			const kyErr = await handleKyError(err);
			return Promise.reject(kyErr);
		}
	};
