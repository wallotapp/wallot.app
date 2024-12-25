import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import { TokenizeBankAccountParams, TokenizeBankAccountRouteParams, TokenizeBankAccountResponse, UpdateBankAccountParams, bankAccountsApi } from '@wallot/js';
import { crypto, db } from '../../../services.js';

export const tokenizeBankAccount = async (
	{ account_number: accountNumber }: TokenizeBankAccountParams,
	{ bankAccountId }: TokenizeBankAccountRouteParams,
	_query: Record<string, never>,
	firebaseUser: FirebaseUser | null,
): Promise<FunctionResponse<TokenizeBankAccountResponse>> => {
	if (!firebaseUser) throw new Error('Unauthorized');
	const { encrypt } = crypto;
	const { data, ivHex } = encrypt(accountNumber);
	const updateParams: UpdateBankAccountParams = {
		account_number_data: data,
		account_number_iv_hex: ivHex,
	};
	await db.collection(bankAccountsApi.collectionId).doc(bankAccountId).update(updateParams);

	return { json: {} };
};
