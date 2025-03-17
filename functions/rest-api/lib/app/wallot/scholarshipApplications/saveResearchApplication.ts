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

export const saveResearchApplication = async (
	params: ResearchApplicationFormDataParams,
	{ scholarshipApplicationId }: ResearchApplicationFormDataRouteParams,
	_query: Record<string, never>,
	firebaseUser: FirebaseUser | null,
): Promise<FunctionResponse<ResearchApplicationFormDataResponse>> => {
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
