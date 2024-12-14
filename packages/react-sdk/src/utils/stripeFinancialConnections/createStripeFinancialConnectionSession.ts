import { User as FirebaseUser } from 'firebase/auth';
import { handleKyError } from 'ergonomic';
import { getAuthenticatedKyInstance } from '@wallot/react/src/lib/ky';
import {
	CreateStripeFinancialConnectionSessionFormData,
	StripeFinancialConnectionSessionResponseData,
} from '@wallot/js';

export const createStripeFinancialConnectionSession = async (
	firebaseUser: FirebaseUser,
	params: CreateStripeFinancialConnectionSessionFormData,
) => {
	try {
		const { data } = await getAuthenticatedKyInstance(firebaseUser)
			.post('v0/stripe-financial-connections/create-session', {
				json: params,
			})
			.json<
				StripeFinancialConnectionSessionResponseData & {
					readonly data: [
						StripeFinancialConnectionSessionResponseData['data'][number],
					];
				}
			>();
		return data[0];
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
