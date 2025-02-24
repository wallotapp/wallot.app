import { handleKyError } from 'ergonomic';
import { School } from '@wallot/js';
import { DEPLOYMENT_ENV } from 'ergonomic-react/src/config/deploymentEnv';
import { defaultKyInstance } from '@wallot/react/src/lib/ky';

export async function retrieveScholarshipApplicationSchools() {
	try {
		const scholarshipApplicationSchoolsDownloadUrl = {
			live: process.env
				.NEXT_PUBLIC_LIVE_SCHOLARSHIP_APPLICATION_SCHOOLS_DOWNLOAD_URL,
			test: process.env
				.NEXT_PUBLIC_TEST_SCHOLARSHIP_APPLICATION_SCHOOLS_DOWNLOAD_URL,
		}[DEPLOYMENT_ENV];

		if (!scholarshipApplicationSchoolsDownloadUrl) {
			throw new Error(
				'Environment variable to download the scholarship application schools is not set',
			);
		}

		const data = await defaultKyInstance
			.get(scholarshipApplicationSchoolsDownloadUrl)
			.json<School[]>();
		return data;
	} catch (err) {
		const kyErr = await handleKyError(err);
		return Promise.reject(kyErr);
	}
}
