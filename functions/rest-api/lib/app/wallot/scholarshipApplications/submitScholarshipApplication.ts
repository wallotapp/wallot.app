import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import {
	ScholarshipApplicationFormDataRouteParams,
	ScholarshipApplicationFormDataResponse,
	ScholarshipApplicationFormDataParams,
	usersApi,
	scholarshipApplicationsApi,
} from '@wallot/js';
import { sendScholarshipApplicationConfirmationEmail } from './sendScholarshipApplicationConfirmationEmail.js';
import { db, gmail } from '../../../services.js';
import { secrets } from '../../../secrets.js';
import { getUpdateUserParamsFromScholarshipApplicationFormDataParams } from './getUpdateUserParamsFromScholarshipApplicationFormDataParams.js';
import { getUpdateScholarshipApplicationParamsFromScholarshipApplicationFormDataParams } from './getUpdateScholarshipApplicationParamsFromScholarshipApplicationFormDataParams.js';

export const submitScholarshipApplication = async (
	params: ScholarshipApplicationFormDataParams,
	{ scholarshipApplicationId }: ScholarshipApplicationFormDataRouteParams,
	_query: Record<string, never>,
	firebaseUser: FirebaseUser | null,
): Promise<FunctionResponse<ScholarshipApplicationFormDataResponse>> => {
	if (!firebaseUser) throw new Error('Unauthorized');
	const email = firebaseUser.email;
	if (email == null) throw new Error('User email not found');

	// Initialize a Firestore batch transaction
	const batch = db.batch();

	// Save user changes
	const updateUserParams =
		await getUpdateUserParamsFromScholarshipApplicationFormDataParams(
			firebaseUser.uid,
			params,
		);
	batch.update(
		db.collection(usersApi.collectionId).doc(firebaseUser.uid),
		updateUserParams,
	);

	// Save application changes
	const updateScholarshipApplicationParams =
		getUpdateScholarshipApplicationParamsFromScholarshipApplicationFormDataParams(
			params,
			'submit',
		);
	batch.update(
		db
			.collection(scholarshipApplicationsApi.collectionId)
			.doc(scholarshipApplicationId),
		updateScholarshipApplicationParams,
	);

	// Commit changes
	await batch.commit();

	const onFinished = async () => {
		if (secrets.SECRET_CRED_SERVER_PROTOCOL === 'https') {
			// Send confirmation email
			await sendScholarshipApplicationConfirmationEmail(email);

			if (secrets.SECRET_CRED_DEPLOYMENT_ENVIRONMENT == 'live') {
				// Send developer alert
				const log = JSON.stringify(
					{
						user_id: firebaseUser.uid,
						scholarship_application_id: scholarshipApplicationId,
						...params,
					},
					null,
					2,
				);
				await gmail.sendDeveloperAlert({
					message: `New scholarship application submission from ${email}.\
<br/><br/>\
${log}`,
					subject: '[Wallot Developer Alerts] New Scholarship Application Submission',
				});
			}
		} else {
			console.log(
				`Skipping sending confirmation email to ${email} in local environment`,
			);
		}
		return Promise.resolve();
	};

	return { json: {}, onFinished };
};
