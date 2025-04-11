import { handleKyError } from 'ergonomic';
import { defaultKyInstance } from '@wallot/react/src/lib/ky';
import {
	AcceptResearchSeatFormDataParams,
	ResearchAcceptanceLetter,
} from '@wallot/js';

export const retrieveAcceptanceLetter = async (
	searchParams: Pick<AcceptResearchSeatFormDataParams, 'client_verification'>,
) => {
	try {
		const data = await defaultKyInstance
			.get('v0/scholarship-applications/acceptance-letters', {
				searchParams,
			})
			.json<ResearchAcceptanceLetter>();
		return data;
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
};
