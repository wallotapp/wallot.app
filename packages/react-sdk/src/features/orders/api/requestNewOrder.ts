import { User as FirebaseUser } from 'firebase/auth';
import { handleKyError } from 'ergonomic';
import { getAuthenticatedKyInstance } from '@wallot/react/src/lib/ky';
import { RequestNewOrderParams, RequestNewOrderResponse } from '@wallot/js';

export const requestNewOrder = async (
	firebaseUser: FirebaseUser | null,
	params: RequestNewOrderParams,
) => {
	try {
		if (!firebaseUser) {
			throw new Error('User is not authenticated');
		}

		const data = await getAuthenticatedKyInstance(firebaseUser)
			.post('v0/orders', {
				json: params,
			})
			.json<RequestNewOrderResponse>();
		return data;
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
