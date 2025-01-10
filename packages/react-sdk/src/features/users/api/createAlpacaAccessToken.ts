import { User as FirebaseUser } from 'firebase/auth';
import { handleKyError } from 'ergonomic';
import { getAuthenticatedKyInstance } from '@wallot/react/src/lib/ky';
import {
	CreateAlpacaAccessTokenParams,
	CreateAlpacaAccessTokenResponse,
} from '@wallot/js';

export const createAlpacaAccessToken = async (
	firebaseUser: FirebaseUser | null,
	params: CreateAlpacaAccessTokenParams,
) => {
	try {
		if (!firebaseUser) {
			throw new Error('User is not authenticated');
		}
		const data = await getAuthenticatedKyInstance(firebaseUser)
			.post('v0/users/alpaca-access-tokens', {
				json: params,
			})
			.json<CreateAlpacaAccessTokenResponse>();
		return data;
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
