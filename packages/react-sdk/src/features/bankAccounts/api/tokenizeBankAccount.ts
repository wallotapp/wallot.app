import { User as FirebaseUser } from 'firebase/auth';
import { handleKyError } from 'ergonomic';
import { getAuthenticatedKyInstance } from '@wallot/react/src/lib/ky';
import {
	TokenizeBankAccountParams,
	TokenizeBankAccountResponse,
} from '@wallot/js';

export const tokenizeBankAccount = async (
	firebaseUser: FirebaseUser | null,
	bankAccountId: string,
	params: TokenizeBankAccountParams,
) => {
	try {
		if (!firebaseUser) {
			throw new Error('User is not authenticated');
		}

		const data = await getAuthenticatedKyInstance(firebaseUser)
			.post(`v0/bank-accounts/${bankAccountId}/tokenize`, {
				json: params,
			})
			.json<TokenizeBankAccountResponse>();
		return data;
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
