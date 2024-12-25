import * as yup from 'yup';
import { AchTransfer } from '../models/achTransferProperties.js';
import { AlpacaAchTransferStatusEnum } from './alpacaAchTransfers.js';
import { YupHelpers } from 'ergonomic';

export const achTransferWithFundsReceivedByAlpacaProperties = {
	alpaca_ach_transfer_status: YupHelpers.constant(
		AlpacaAchTransferStatusEnum.obj.COMPLETE,
	),
};
export const achTransferWithFundsReceivedByAlpacaSchema = yup.object(
	achTransferWithFundsReceivedByAlpacaProperties,
);
export type AchTransferWithFundsReceivedByAlpacaParams = yup.InferType<
	typeof achTransferWithFundsReceivedByAlpacaSchema
>;

export type AchTransferWithFundsReceivedByAlpaca = AchTransfer &
	AchTransferWithFundsReceivedByAlpacaParams;
export const isAchTransferWithFundsReceivedByAlpaca = (
	achTransfer: AchTransfer,
): achTransfer is AchTransferWithFundsReceivedByAlpaca => {
	try {
		achTransferWithFundsReceivedByAlpacaSchema.validateSync(achTransfer);
		return true;
	} catch (error) {
		console.error(
			'Error detected in isAchTransferWithFundsReceivedByAlpaca',
			error,
		);
		return false;
	}
};
