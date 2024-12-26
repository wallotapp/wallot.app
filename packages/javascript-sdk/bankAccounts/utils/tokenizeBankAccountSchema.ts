import * as yup from 'yup';
import {
	BankAccount,
	bankAccountsApi,
} from '../models/bankAccountProperties.js';
import { Keys, getFieldSpecByFieldKey } from 'ergonomic';

export const tokenizeBankAccountProperties = {
	account_number: yup.string().required().defined().default('').min(7).max(17),
} as const;
export const tokenizeBankAccountSchema = yup.object(
	tokenizeBankAccountProperties,
);
export const tokenizeBankAccountSchemaFieldSpecByFieldKey =
	getFieldSpecByFieldKey(
		tokenizeBankAccountSchema,
		Keys(tokenizeBankAccountProperties),
	);

export type TokenizeBankAccountParams = yup.InferType<
	typeof tokenizeBankAccountSchema
>;

export type TokenizeBankAccountRouteParams = { bankAccountId: string };
export type TokenizeBankAccountResponse = Record<string, never>;

export const tokenizedBankAccountProperties = {
	account_number_data: bankAccountsApi.properties.account_number_data
		.nullable(false)
		.defined()
		.min(1),
	account_number_iv_hex: bankAccountsApi.properties.account_number_iv_hex
		.nullable(false)
		.defined()
		.min(1),
} as const;
export const tokenizedBankAccountSchema = yup.object(
	tokenizedBankAccountProperties,
);
export type TokenizedBankAccountParams = yup.InferType<
	typeof tokenizedBankAccountSchema
>;
export type TokenizedBankAccount = BankAccount & TokenizedBankAccountParams;
export const isBankAccountTokenized = (
	bankAccount: BankAccount,
): bankAccount is TokenizedBankAccount => {
	try {
		tokenizedBankAccountSchema.validateSync(bankAccount);
		return true;
	} catch (error) {
		console.error('Error detected in isBankAccountTokenized', error);
		return false;
	}
};
