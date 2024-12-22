import * as yup from 'yup';
import { AchTransfer } from '../models/achTransferProperties.js';
import { alpacaAchTransferProperties } from './alpacaAchTransfers.js';

export const achTransferPendingAlpacaQueueProperties = {
	alpaca_ach_transfer_id: alpacaAchTransferProperties.alpaca_ach_transfer_id
		.min(1)
		.nullable(false),
	alpaca_ach_transfer_status:
		alpacaAchTransferProperties.alpaca_ach_transfer_status.nullable(false),
};
export const achTransferPendingAlpacaQueueSchema = yup.object(
	achTransferPendingAlpacaQueueProperties,
);
export type AchTransferPendingAlpacaQueueParams = yup.InferType<
	typeof achTransferPendingAlpacaQueueSchema
>;

export type AchTransferPendingAlpacaQueue = AchTransfer &
	AchTransferPendingAlpacaQueueParams;
export const isAchTransferPendingAlpacaQueue = (
	achTransfer: AchTransfer,
): achTransfer is AchTransferPendingAlpacaQueue => {
	try {
		achTransferPendingAlpacaQueueSchema.validateSync(achTransfer);
		return true;
	} catch (error) {
		console.error('Error detected in isAchTransferPendingAlpacaQueue', error);
		return false;
	}
};
