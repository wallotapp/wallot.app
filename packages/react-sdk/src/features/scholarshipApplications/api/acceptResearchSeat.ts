import { handleKyError } from 'ergonomic';
import { defaultKyInstance } from '@wallot/react/src/lib/ky';
import {
	AcceptResearchSeatFormDataParams,
	AcceptResearchSeatFormDataResponse,
} from '@wallot/js';

export const acceptResearchSeat = async (
	scholarshipApplicationId: string | null,
	params: AcceptResearchSeatFormDataParams,
) => {
	try {
		if (!scholarshipApplicationId) {
			throw new Error('Scholarship application ID is required');
		}
		const data = await defaultKyInstance
			.post(
				`v0/scholarship-applications/${scholarshipApplicationId}/research/accept-seat`,
				{
					json: params,
				},
			)
			.json<AcceptResearchSeatFormDataResponse>();
		return data;
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
