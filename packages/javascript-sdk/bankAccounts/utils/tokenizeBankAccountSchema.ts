import { BankAccount } from '../models/bankAccountProperties.js';

export const isBankAccountTokenized = (bankAccount: BankAccount) => {
	return (
		bankAccount.account_number_data !== null &&
		bankAccount.account_number_iv_hex !== null
	);
};
