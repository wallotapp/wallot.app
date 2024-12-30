import { BankAccount } from '@wallot/js';
import { useQueryResourcesForLoggedInUser } from '@wallot/react/src/hooks/useQueryResourcesForLoggedInUser';

export function useQueryBankAccountsForLoggedInUser() {
	return useQueryResourcesForLoggedInUser<BankAccount>('bank_account')();
}
