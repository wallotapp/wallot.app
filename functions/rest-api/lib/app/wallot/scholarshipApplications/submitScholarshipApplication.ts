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
import { DateTime } from 'luxon';
import { variables } from '../../../variables.js';

const now = DateTime.now().toUTC();
const { SERVER_VAR_VISIONARY_SCHOLARSHIP_CLOSE_TIMESTAMP: closeTimestamp } =
	variables;
const close = DateTime.fromISO(closeTimestamp);
const isClosed = now > close;

export const submitScholarshipApplication = async (
	params: ScholarshipApplicationFormDataParams,
	{ scholarshipApplicationId }: ScholarshipApplicationFormDataRouteParams,
	_query: Record<string, never>,
	firebaseUser: FirebaseUser | null,
	headers: Record<string, unknown>,
): Promise<FunctionResponse<ScholarshipApplicationFormDataResponse>> => {
	if (isClosed)
		throw new Error(
			'Our application is now closed. Contact us at scholarships@wallot.app if you have special circumstances which caused a delay in completing your application.',
		);

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
			Boolean(headers['x-platform-version']) ? 'submit' : 'save',
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
			await sendScholarshipApplicationConfirmationEmail({
				recipientEmail: email,
				recipientGreeting: params.given_name
					? `Hi ${params.given_name.trim()},`
					: 'Dear Applicant,',
			});

			if (secrets.SECRET_CRED_DEPLOYMENT_ENVIRONMENT == 'live') {
				// Send developer alert
				const alertBody = JSON.stringify(
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
${alertBody}`,
					subject:
						'[Wallot Developer Alerts] New Scholarship Application Submission',
				});
			}
		} else {
			console.log(
				`Skipping sending confirmation email to ${email} in local environment`,
			);
		}
		return Promise.resolve();
	};

	// Check headers for 'X-Platform-Version'
	if (headers['x-platform-version']) {
		return { json: {}, onFinished };
	}

	throw new Error(
		'Please refresh the page and try to submit your application again.',
	);
};
