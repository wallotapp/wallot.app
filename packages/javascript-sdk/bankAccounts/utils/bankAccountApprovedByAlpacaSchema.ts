import * as yup from 'yup';
import { BankAccount } from '../models/bankAccountProperties.js';
import { AlpacaAchRelationshipStatusEnum } from './alpacaAchRelationships.js';
import { YupHelpers } from 'ergonomic';
import { BankAccountPendingAlpacaAchRelationship } from './bankAccountPendingAlpacaAchRelationshipSchema.js';

export const bankAccountApprovedByAlpacaProperties = {
	alpaca_ach_relationship_status: YupHelpers.constant(AlpacaAchRelationshipStatusEnum.obj.APPROVED),
};
export const bankAccountApprovedByAlpacaSchema = yup.object(bankAccountApprovedByAlpacaProperties);
export type BankAccountApprovedByAlpacaParams = yup.InferType<typeof bankAccountApprovedByAlpacaSchema>;

export type BankAccountApprovedByAlpaca = BankAccountPendingAlpacaAchRelationship & BankAccountApprovedByAlpacaParams;
export const isBankAccountApprovedByAlpaca = (bankAccount: BankAccount): bankAccount is BankAccountApprovedByAlpaca => {
	try {
		bankAccountApprovedByAlpacaSchema.validateSync(bankAccount);
		return true;
	} catch (error) {
		console.error('Error detected in isBankAccountApprovedByAlpaca', error);
		return false;
	}
};
