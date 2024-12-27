import { CloudTaskHandler } from 'ergonomic-node';
import { RefreshAlpacaAchTransferStatusTaskParams } from '@wallot/node';
import {
	AchTransfer,
	AlpacaAchTransfer,
	UserActivatedByAlpaca,
} from '@wallot/js';
import { alpaca } from '../../services.js';

export const handleRefreshAlpacaAchTransferStatusTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 5, minBackoffSeconds: 120 },
};

export const handleRefreshAlpacaAchTransferStatusTask: CloudTaskHandler<
	RefreshAlpacaAchTransferStatusTaskParams
> = async ({ data: { achTransferId, orderId, userId } }) => {
	achTransferId;
	orderId;
	userId;
	return Promise.resolve();
};

async function retrieveAlpacaAchTransfer(
	user: UserActivatedByAlpaca,
	achTransfer: AchTransfer,
) {
	const response = await alpaca.broker.get<AlpacaAchTransfer[]>(
		`v1/accounts/${user.alpaca_account_id}/transfers`,
		{
			searchParams: { direction: achTransfer.alpaca_ach_transfer_direction },
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
}
