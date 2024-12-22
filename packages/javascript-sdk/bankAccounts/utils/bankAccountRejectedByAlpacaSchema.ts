import * as yup from 'yup';
import { BankAccount } from '../models/bankAccountProperties.js';
import { AlpacaAchRelationshipStatusEnum } from './alpacaAchRelationships.js';
import { YupHelpers } from 'ergonomic';

export const bankAccountRejectedByAlpacaProperties = {
	alpaca_ach_relationship_status: YupHelpers.constant(
		AlpacaAchRelationshipStatusEnum.obj.CANCELED,
	),
};
export const bankAccountRejectedByAlpacaSchema = yup.object(
	bankAccountRejectedByAlpacaProperties,
);
export type BankAccountRejectedByAlpacaParams = yup.InferType<
	typeof bankAccountRejectedByAlpacaSchema
>;

export type BankAccountRejectedByAlpaca = BankAccount &
	BankAccountRejectedByAlpacaParams;
export const isBankAccountRejectedByAlpaca = (
	bankAccount: BankAccount,
): bankAccount is BankAccountRejectedByAlpaca => {
	try {
		bankAccountRejectedByAlpacaSchema.validateSync(bankAccount);
		return true;
	} catch (error) {
		console.error('Error detected in isBankAccountRejectedByAlpaca', error);
		return false;
	}
};
