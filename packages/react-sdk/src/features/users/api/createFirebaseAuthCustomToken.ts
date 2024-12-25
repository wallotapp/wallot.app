import { User as FirebaseUser } from 'firebase/auth';
import { FirebaseUserCustomTokenResponse, handleKyError } from 'ergonomic';
import { getAuthenticatedKyInstance } from '@wallot/react/src/lib/ky';

export const createFirebaseAuthCustomToken = async (firebaseUser: FirebaseUser | null, params: Record<string, never>) => {
	try {
		if (!firebaseUser) {
			throw new Error('User is not authenticated');
		}
		const data = await getAuthenticatedKyInstance(firebaseUser)
			.post('v0/firebase/auth/custom-tokens', {
				json: params,
			})
			.json<FirebaseUserCustomTokenResponse>();
		return data;
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
