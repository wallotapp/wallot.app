import * as yup from 'yup';
import { AchTransfer } from '../models/achTransferProperties.js';
import { AlpacaAchTransferStatusEnum } from './alpacaAchTransfers.js';
import { getEnum } from 'ergonomic';

export const RejectedAlpacaAchTransferStatusEnum = getEnum([AlpacaAchTransferStatusEnum.obj.CANCELED, AlpacaAchTransferStatusEnum.obj.REJECTED, AlpacaAchTransferStatusEnum.obj.RETURNED]);

export const achTransferRejectedByAlpacaProperties = {
	alpaca_ach_transfer_status: RejectedAlpacaAchTransferStatusEnum.getDefinedSchema(),
};
export const achTransferRejectedByAlpacaSchema = yup.object(achTransferRejectedByAlpacaProperties);
export type AchTransferRejectedByAlpacaParams = yup.InferType<typeof achTransferRejectedByAlpacaSchema>;

export type AchTransferRejectedByAlpaca = AchTransfer & AchTransferRejectedByAlpacaParams;
export const isAchTransferRejectedByAlpaca = (achTransfer: AchTransfer): achTransfer is AchTransferRejectedByAlpaca => {
	try {
		achTransferRejectedByAlpacaSchema.validateSync(achTransfer);
		return true;
	} catch (error) {
		console.error('Error detected in isAchTransferRejectedByAlpaca', error);
		return false;
	}
};
