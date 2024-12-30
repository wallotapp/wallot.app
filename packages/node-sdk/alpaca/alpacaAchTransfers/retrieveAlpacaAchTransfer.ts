import { handleKyError } from 'ergonomic';
import { KyInstance } from 'ky-universal';
import {
	AchTransfer,
	AlpacaAchTransfer,
	UserActivatedByAlpaca,
} from '@wallot/js';

export const retrieveAlpacaAchTransfer =
	(alpacaBrokerClient: KyInstance) =>
	async (user: UserActivatedByAlpaca, achTransfer: AchTransfer) => {
		try {
			const response = await alpacaBrokerClient.get<AlpacaAchTransfer[]>(
				`v1/accounts/${user.alpaca_account_id}/transfers`,
				{
					searchParams: {
						direction: achTransfer.alpaca_ach_transfer_direction,
					},
				},
			);
			const achTransfers = await response.json();
			const match = achTransfers.find(
				({ id }) => id === achTransfer.alpaca_ach_transfer_id,
			);
			if (match == null) {
				throw new Error(
					`Alpaca ACH relationship ${achTransfer.alpaca_ach_transfer_id} not found`,
				);
			}
			return match;
		} catch (err) {
			const kyErr = await handleKyError(err);
			return Promise.reject(kyErr);
		}
	};
