import { User as FirebaseUser } from 'firebase/auth';
import { handleKyError } from 'ergonomic';
import { getAuthenticatedKyInstance } from '@wallot/react/src/lib/ky';
import {
	CreateStripeFinancialConnectionSessionFormData,
	StripeFinancialConnectionSessionResponseData,
} from '@wallot/js';

export const createStripeFinancialConnectionSession = async (
	firebaseUser: FirebaseUser | null,
	params: CreateStripeFinancialConnectionSessionFormData,
) => {
	try {
		if (!firebaseUser) {
			throw new Error('User is not authenticated');
		}

		const data = await getAuthenticatedKyInstance(firebaseUser)
			.post('v0/stripe-financial-connections/create-session', {
				json: params,
			})
			.json<StripeFinancialConnectionSessionResponseData>();
		return data;
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
