import { User as FirebaseUser } from 'firebase/auth';
import { handleKyError } from 'ergonomic';
import { getAuthenticatedKyInstance } from '@wallot/react/src/lib/ky';
import { ActivateUserParams, ActivateUserResponse } from '@wallot/js';

export const activateUser = async (firebaseUser: FirebaseUser | null, params: ActivateUserParams) => {
	try {
		if (!firebaseUser) {
			throw new Error('User is not authenticated');
		}
		const data = await getAuthenticatedKyInstance(firebaseUser)
			.post('v0/users/activate', {
				json: params,
			})
			.json<ActivateUserResponse>();
		return data;
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
