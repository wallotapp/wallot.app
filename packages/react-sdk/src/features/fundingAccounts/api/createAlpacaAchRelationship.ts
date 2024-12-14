import { User as FirebaseUser } from 'firebase/auth';
import { GeneralizedResponse, handleKyError } from 'ergonomic';
import { getAuthenticatedKyInstance } from '@wallot/react/src/lib/ky';
import {
	CreateAlpacaAchRelationshipParams,
	AlpacaAchRelationship,
} from '@wallot/js';

export const createAlpacaAchRelationship = async (
	firebaseUser: FirebaseUser | null,
	params: CreateAlpacaAchRelationshipParams[],
) => {
	try {
		if (!firebaseUser) {
			throw new Error('User is not authenticated');
		}

		const data = await getAuthenticatedKyInstance(firebaseUser)
			.post('v0/alpaca/ach-relationships', {
				json: params,
			})
			.json<GeneralizedResponse<AlpacaAchRelationship>>();
		return data;
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
