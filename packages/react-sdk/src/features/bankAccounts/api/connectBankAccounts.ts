import { User as FirebaseUser } from 'firebase/auth';
import { handleKyError } from 'ergonomic';
import { getAuthenticatedKyInstance } from '@wallot/react/src/lib/ky';
import {
	ConnectBankAccountsParams,
	ConnectBankAccountsResponse,
} from '@wallot/js';

export const connectBankAccounts = async (
	firebaseUser: FirebaseUser | null,
	params: ConnectBankAccountsParams<Record<string, unknown>>,
) => {
	try {
		if (!firebaseUser) {
			throw new Error('User is not authenticated');
		}

		const data = await getAuthenticatedKyInstance(firebaseUser)
			.post('v0/bank-accounts/connect', {
				json: params,
			})
			.json<ConnectBankAccountsResponse>();
		return data;
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
