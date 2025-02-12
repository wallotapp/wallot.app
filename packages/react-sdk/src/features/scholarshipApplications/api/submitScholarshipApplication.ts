import { User as FirebaseUser } from 'firebase/auth';
import { handleKyError } from 'ergonomic';
import { getAuthenticatedKyInstance } from '@wallot/react/src/lib/ky';
import {
	ScholarshipApplicationFormDataParams,
	ScholarshipApplicationFormDataResponse,
} from '@wallot/js';

export const submitScholarshipApplication = async (
	firebaseUser: FirebaseUser | null,
	scholarshipApplicationId: string | null,
	params: ScholarshipApplicationFormDataParams,
) => {
	try {
		if (!firebaseUser) {
			throw new Error('User is not authenticated');
		}
		if (!scholarshipApplicationId) {
			throw new Error('Scholarship application ID is required');
		}
		const data = await getAuthenticatedKyInstance(firebaseUser)
			.post(`v0/scholarship-applications/${scholarshipApplicationId}/submit`, {
				json: params,
			})
			.json<ScholarshipApplicationFormDataResponse>();
		return data;
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
