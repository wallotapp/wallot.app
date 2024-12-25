import { User as FirebaseUser } from 'firebase/auth';
import { handleKyError } from 'ergonomic';
import { getAuthenticatedKyInstance } from '@wallot/react/src/lib/ky';
import { ConfirmOrderParams, ConfirmOrderResponse } from '@wallot/js';

export const confirmOrder = async (firebaseUser: FirebaseUser | null, orderId: string, params: ConfirmOrderParams) => {
	try {
		if (!firebaseUser) {
			throw new Error('User is not authenticated');
		}

		const data = await getAuthenticatedKyInstance(firebaseUser)
			.post(`v0/orders/${orderId}/confirm`, {
				json: params,
			})
			.json<ConfirmOrderResponse>();
		return data;
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
