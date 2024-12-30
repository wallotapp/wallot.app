import { BankAccount } from '@wallot/js';
import { useQueryResourcesForLoggedInUser } from '@wallot/react/src/hooks/useQueryResourcesForLoggedInUser';

export const useQueryBankAccountsForLoggedInUser =
	useQueryResourcesForLoggedInUser<BankAccount>('bank_account');
