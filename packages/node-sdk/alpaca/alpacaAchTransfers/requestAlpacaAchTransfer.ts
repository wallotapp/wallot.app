import { handleKyError, getCurrencyUsdStringFromCents } from 'ergonomic';
import { KyInstance } from 'ky-universal';
import {
	AlpacaAchTransfer,
	BankAccountApprovedByAlpaca,
	UserActivatedByAlpaca,
} from '@wallot/js';

export const requestAlpacaAchTransfer =
	(alpacaBrokerClient: KyInstance) =>
	async (
		user: UserActivatedByAlpaca,
		bankAccount: BankAccountApprovedByAlpaca,
		amountInCents: number,
	) => {
		try {
			if (amountInCents <= 0) {
				throw new Error('Amount must be greater than 0');
			}

			const requestAlpacaAchTransferParams: Pick<
				AlpacaAchTransfer,
				'amount' | 'direction' | 'relationship_id'
			> & {
				transfer_type: 'ach';
			} = {
				amount: getCurrencyUsdStringFromCents(amountInCents)
					.replace('$', '')
					.replace(/,/g, ''),
				direction: 'INCOMING',
				relationship_id: bankAccount.alpaca_ach_relationship_id,
				transfer_type: 'ach',
			};

			const response = await alpacaBrokerClient.post<AlpacaAchTransfer>(
				`v1/accounts/${user.alpaca_account_id}/transfers`,
				{
					json: requestAlpacaAchTransferParams,
				},
			);
			return response.json();
		} catch (err) {
			const kyErr = await handleKyError(err);
			return Promise.reject(kyErr);
		}
	};
