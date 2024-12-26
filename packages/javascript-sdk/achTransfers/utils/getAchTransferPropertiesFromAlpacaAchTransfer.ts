import { AchTransfer, AlpacaAchTransfer } from '../models/achTransferProperties.js';
import {
	AlpacaAchTransferPropertyName,
	AlpacaAchTransferPropertyNameEnum,
} from './alpacaAchTransfers.js';

export const getAchTransferPropertiesFromAlpacaAchTransfer = (
	alpacaAchTransfer: AlpacaAchTransfer,
): Pick<AchTransfer, AlpacaAchTransferPropertyName> => {
	return AlpacaAchTransferPropertyNameEnum.arr.reduce((acc, propertyName) => {
		const originalPropertyName = propertyName.replace(
			'alpaca_ach_transfer_',
			'',
		) as keyof AlpacaAchTransfer;
		const value = alpacaAchTransfer[originalPropertyName] ?? null;
		return {
			...acc,
			[propertyName]: value,
		};
	}, {} as Pick<AchTransfer, AlpacaAchTransferPropertyName>);
};
