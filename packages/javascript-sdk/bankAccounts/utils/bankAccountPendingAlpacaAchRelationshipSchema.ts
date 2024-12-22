import * as yup from 'yup';
import { BankAccount } from '../models/bankAccountProperties.js';
import { alpacaAchRelationshipProperties } from './alpacaAchRelationships.js';

export const bankAccountPendingAlpacaAchRelationshipProperties = {
	alpaca_ach_relationship_id:
		alpacaAchRelationshipProperties.alpaca_ach_relationship_id
			.min(1)
			.nullable(false),
	alpaca_ach_relationship_status:
		alpacaAchRelationshipProperties.alpaca_ach_relationship_status.nullable(
			false,
		),
};
export const bankAccountPendingAlpacaAchRelationshipSchema = yup.object(
	bankAccountPendingAlpacaAchRelationshipProperties,
);
export type BankAccountPendingAlpacaAchRelationshipParams = yup.InferType<
	typeof bankAccountPendingAlpacaAchRelationshipSchema
>;

export type BankAccountPendingAlpacaAchRelationship = BankAccount &
	BankAccountPendingAlpacaAchRelationshipParams;
export const isBankAccountPendingAlpacaAchRelationship = (
	bankAccount: BankAccount,
): bankAccount is BankAccountPendingAlpacaAchRelationship => {
	try {
		bankAccountPendingAlpacaAchRelationshipSchema.validateSync(bankAccount);
		return true;
	} catch (error) {
		console.error(
			'Error detected in isBankAccountPendingAlpacaAchRelationship',
			error,
		);
		return false;
	}
};
