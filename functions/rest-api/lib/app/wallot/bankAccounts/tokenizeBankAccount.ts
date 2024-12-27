import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import {
	TokenizeBankAccountParams,
	TokenizeBankAccountRouteParams,
	TokenizeBankAccountResponse,
	TokenizedBankAccountParams,
	bankAccountsApi,
} from '@wallot/js';
import { crypto, db } from '../../../services.js';

export const tokenizeBankAccount = async (
	{
		account_number: accountNumber,
		account_owner_name: accountOwnerName,
	}: TokenizeBankAccountParams,
	{ bankAccountId }: TokenizeBankAccountRouteParams,
	_query: Record<string, never>,
	firebaseUser: FirebaseUser | null,
): Promise<FunctionResponse<TokenizeBankAccountResponse>> => {
	if (!firebaseUser) throw new Error('Unauthorized');
	const { encrypt } = crypto;
	const { data, ivHex } = encrypt(accountNumber);
	const updateParams: TokenizedBankAccountParams = {
		account_number_data: data,
		account_number_iv_hex: ivHex,
		account_owner_name: accountOwnerName,
	};
	await db
		.collection(bankAccountsApi.collectionId)
		.doc(bankAccountId)
		.update(updateParams);

	return { json: {} };
};
