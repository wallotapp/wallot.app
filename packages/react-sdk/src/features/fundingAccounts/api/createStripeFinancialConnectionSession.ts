import { User as FirebaseUser } from 'firebase/auth';
import { GeneralizedResponse, handleKyError } from 'ergonomic';
import { getAuthenticatedKyInstance } from '@wallot/react/src/lib/ky';

export const createStripeFinancialConnectionSession = async (
	firebaseUser: FirebaseUser | null,
	params: unknown,
) => {
	try {
		if (!firebaseUser) {
			throw new Error('User is not authenticated');
		}

		const data = await getAuthenticatedKyInstance(firebaseUser)
			.post('v0/stripe-financial-connections/create-session', {
				json: params,
			})
			.json<GeneralizedResponse<unknown>>();
		return data;
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
