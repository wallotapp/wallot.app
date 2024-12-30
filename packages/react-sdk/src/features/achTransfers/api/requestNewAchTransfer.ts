import { User as FirebaseUser } from 'firebase/auth';
import { handleKyError } from 'ergonomic';
import { getAuthenticatedKyInstance } from '@wallot/react/src/lib/ky';
import {
	RequestNewAchTransferParams,
	RequestNewAchTransferResponse,
} from '@wallot/js';

export const requestNewAchTransfer = async (
	firebaseUser: FirebaseUser | null,
	params: RequestNewAchTransferParams,
) => {
	try {
		if (!firebaseUser) {
			throw new Error('User is not authenticated');
		}

		const data = await getAuthenticatedKyInstance(firebaseUser)
			.post('v0/transfers', {
				json: params,
			})
			.json<RequestNewAchTransferResponse>();
		return data;
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
