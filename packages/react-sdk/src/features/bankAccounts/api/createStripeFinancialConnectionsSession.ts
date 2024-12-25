import { User as FirebaseUser } from 'firebase/auth';
import { handleKyError } from 'ergonomic';
import { getAuthenticatedKyInstance } from '@wallot/react/src/lib/ky';
import { CreateStripeFinancialConnectionsSessionParams, CreateStripeFinancialConnectionsSessionResponse } from '@wallot/js';

export const createStripeFinancialConnectionSession = async (firebaseUser: FirebaseUser | null, params: CreateStripeFinancialConnectionsSessionParams) => {
	try {
		if (!firebaseUser) {
			throw new Error('User is not authenticated');
		}

		const data = await getAuthenticatedKyInstance(firebaseUser)
			.post('v0/stripe/financial-connections/sessions', {
				json: params,
			})
			.json<CreateStripeFinancialConnectionsSessionResponse>();
		return data;
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
