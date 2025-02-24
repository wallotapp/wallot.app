import { handleKyError } from 'ergonomic';
import { defaultKyInstance } from '@wallot/react/src/lib/ky';
import {
	ScholarshipOpenHouseRsvpFormDataParams,
	ScholarshipOpenHouseRsvpFormDataResponse,
} from '@wallot/js';

export const submitScholarshipOpenHouseRsvp = async (
	params: ScholarshipOpenHouseRsvpFormDataParams,
) => {
	try {
		const data = await defaultKyInstance
			.post(`v0/scholarship-applications/open-houses/rsvp`, {
				json: params,
			})
			.json<ScholarshipOpenHouseRsvpFormDataResponse>();
		return data;
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
