import { User as FirebaseUser } from 'firebase/auth';
import { handleKyError } from 'ergonomic';
import { getAuthenticatedKyInstance } from '@wallot/react/src/lib/ky';
import {
	UpdateAlpacaAccountParams,
	UpdateAlpacaAccountResponse,
} from '@wallot/js';

export const updateAlpacaAccount = async (
	firebaseUser: FirebaseUser | null,
	params: UpdateAlpacaAccountParams,
) => {
	try {
		if (!firebaseUser) {
			throw new Error('User is not authenticated');
		}
		const data = await getAuthenticatedKyInstance(firebaseUser)
			.patch('v0/users/alpaca-account', {
				json: params,
			})
			.json<UpdateAlpacaAccountResponse>();
		return data;
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
