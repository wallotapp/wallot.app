import {
	OnboardUserParams,
	OnboardUserResponse,
	getHomeWebAppRoute,
	getFirestoreCollectionPath,
} from '@wallot/js';
import { auth, db } from '../../../services.js';
import { siteOriginByTarget } from '../../../variables.js';

getHomeWebAppRoute;
getFirestoreCollectionPath;
auth;
db;
siteOriginByTarget;

export const onboardUser = async ({
	age_range,
	capital_level,
	investing_goals,
	risk_level,
}: OnboardUserParams): Promise<OnboardUserResponse> => {
	age_range;
	capital_level;
	investing_goals;
	risk_level;
	// Wait 1 second
	await new Promise((resolve) => setTimeout(resolve, 2500));
	const redirectUrl = 'TODO';
	return { redirect_url: redirectUrl };
};
