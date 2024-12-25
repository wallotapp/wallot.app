import { BankAccount } from '../models/bankAccountProperties.js';

export type TokenizeBankAccountRouteParams = { bankAccountId: string };
export type TokenizeBankAccountParams = { account_number: string };
export type TokenizeBankAccountResponse = Record<string, never>;

export const isBankAccountTokenized = (bankAccount: BankAccount) => {
	return bankAccount.account_number_data !== null && bankAccount.account_number_iv_hex !== null;
};
