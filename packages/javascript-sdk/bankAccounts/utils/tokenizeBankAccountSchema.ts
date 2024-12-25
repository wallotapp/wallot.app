import * as yup from 'yup';
import { BankAccount } from '../models/bankAccountProperties.js';
import { Keys, getFieldSpecByFieldKey } from 'ergonomic';

export const tokenizeBankAccountProperties = {
	account_number: yup.string().required().defined().default('').min(7).max(17),
} as const;
export const tokenizeBankAccountSchema = yup.object(tokenizeBankAccountProperties);
export const tokenizeBankAccountSchemaFieldSpecByFieldKey = getFieldSpecByFieldKey(tokenizeBankAccountSchema, Keys(tokenizeBankAccountProperties));

export type TokenizeBankAccountParams = yup.InferType<typeof tokenizeBankAccountSchema>;

export type TokenizeBankAccountRouteParams = { bankAccountId: string };
export type TokenizeBankAccountResponse = Record<string, never>;

export const isBankAccountTokenized = (bankAccount: BankAccount) => {
	return bankAccount.account_number_data !== null && bankAccount.account_number_iv_hex !== null;
};
