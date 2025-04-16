import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import {
	ResearchApplicationFormDataRouteParams,
	ResearchApplicationFormDataResponse,
	ResearchApplicationFormDataParams,
	scholarshipApplicationsApi,
	ScholarshipApplication,
} from '@wallot/js';
import { db } from '../../../services.js';
import { DateTime } from 'luxon';
import { variables } from '../../../variables.js';

const now = DateTime.now().toUTC();
const { SERVER_VAR_VISIONARY_SCHOLARSHIP_CLOSE_TIMESTAMP: closeTimestamp } =
	variables;
const close = DateTime.fromISO(closeTimestamp);
const isClosed = now > close;

export const saveResearchApplication = async (
	params: ResearchApplicationFormDataParams,
	{ scholarshipApplicationId }: ResearchApplicationFormDataRouteParams,
	_query: Record<string, never>,
	firebaseUser: FirebaseUser | null,
): Promise<FunctionResponse<ResearchApplicationFormDataResponse>> => {
	if (isClosed)
		throw new Error(
			'Our application is now closed. Contact us at scholarships@wallot.app if you have special circumstances which caused a delay in completing your application.',
		);

	if (!firebaseUser) throw new Error('Unauthorized');

	const researchApplicationRef = db
		.collection(scholarshipApplicationsApi.collectionId)
		.doc(scholarshipApplicationId);

	// Query application
	const researchApplicationDoc = await researchApplicationRef.get();
	if (!researchApplicationDoc.exists)
		throw new Error('Invalid scholarshipApplicationId');
	const { user: userId } =
		researchApplicationDoc.data() as ScholarshipApplication;

	// Validate permissions
	if (firebaseUser.uid !== userId)
		throw new Error(
			"Modifying another user's scholarship application is not allowed",
		);

	// Save application changes
	await researchApplicationRef.update(params);

	return { json: {} };
};
