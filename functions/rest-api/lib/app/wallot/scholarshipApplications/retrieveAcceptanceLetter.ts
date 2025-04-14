import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import {
	AcceptResearchSeatFormDataParams,
	ResearchAcceptanceLetter,
	ScholarshipApplication,
	scholarshipApplicationsApi,
	ResearchSeatCohortEnum,
} from '@wallot/js';
import { db, gmail } from '../../../services.js';
import { secrets } from '../../../secrets.js';

export const retrieveAcceptanceLetter = async (
	_body: Record<string, never>,
	_params: Record<string, never>,
	{
		client_verification,
	}: Pick<AcceptResearchSeatFormDataParams, 'client_verification'>,
	_firebaseUser: FirebaseUser | null,
): Promise<FunctionResponse<ResearchAcceptanceLetter>> => {
	const applicationSnapshot = await db
		.collection(scholarshipApplicationsApi.collectionId)
		.where('research_seat_client_verification', '==', client_verification)
		.get();
	const application =
		applicationSnapshot.docs?.[0]?.data() as ScholarshipApplication;
	if (application == null)
		throw new Error(
			'Invalid verification code. Please check your email for the correct link to sign your acceptance letter.',
		);

	const { research_seat_cohort } = application;
	if (!ResearchSeatCohortEnum.isMember(research_seat_cohort)) {
		await gmail.sendDeveloperAlert({
			subject:
				'[Wallot Developer Alerts] Error with Research Acceptance Letter',
			message: `Attempted to access an acceptance letter but no cohort is assigned.

${JSON.stringify({ application, client_verification }, null, 2)}
`,
		});

		throw new Error(
			'There was an error loading your acceptance letter. Please contact our program staff.',
		);
	}

	const json: ResearchAcceptanceLetter = {
		research_seat_acceptance_letter:
			research_seat_cohort === 'fall'
				? secrets.SECRET_CRED_RESEARCH_ACCEPTANCE_LETTER_DOWNLOAD_URL_FALL
				: secrets.SECRET_CRED_RESEARCH_ACCEPTANCE_LETTER_DOWNLOAD_URL_SUMMER,
		research_seat_cohort,
		research_seat_signed_acceptance_letter:
			application.research_seat_signed_acceptance_letter ?? null,
	};

	return { json };
};
