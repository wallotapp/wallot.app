import * as yup from 'yup';
import { BankAccount } from '../models/bankAccountProperties.js';
import { AlpacaAchRelationshipStatusEnum } from './alpacaAchRelationships.js';
import { YupHelpers } from 'ergonomic';
import { BankAccountPendingAlpacaAchRelationship } from './bankAccountPendingAlpacaAchRelationshipSchema.js';

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

export type BankAccountRejectedByAlpaca =
	BankAccountPendingAlpacaAchRelationship & BankAccountRejectedByAlpacaParams;
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

export const isBankAccountRejectedByAlpacaParams = (
	params: unknown,
): params is BankAccountRejectedByAlpacaParams => {
	try {
		bankAccountRejectedByAlpacaSchema.validateSync(params);
		return true;
	} catch (error) {
		console.error(
			'Error detected in isBankAccountRejectedByAlpacaParams',
			error,
		);
		return false;
	}
};
