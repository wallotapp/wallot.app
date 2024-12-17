/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	ActivateUserParams,
	ActivateUserResponse,
	UpdateUserParams,
	getHomeWebAppRoute,
	getFirestoreCollectionPath,
	ordersApi,
	recommendationsApi,
	usersApi,
} from '@wallot/js';
import { auth, db } from '../../../services.js';
import { siteOriginByTarget } from '../../../variables.js';
import { locateCompatibleParameters } from '../parameters/locateCompatibleParameters.js';
import { createRecommendationForUser } from '../recommendations/createRecommendationForUser.js';

getHomeWebAppRoute;
getFirestoreCollectionPath;
auth;
db;
siteOriginByTarget;

export const activateUser = async (
	{
		age_range,
		capital_level,
		investing_goals,
		risk_preference,
	}: ActivateUserParams,
	{ userId }: { userId: string },
): Promise<ActivateUserResponse> => {
	// Initialize Firestore collection names
	const userCollectionName = getFirestoreCollectionPath(
		usersApi.apiResourceCollectionId,
	);
	const ordersCollectionName = getFirestoreCollectionPath(
		ordersApi.apiResourceCollectionId,
	);
	ordersCollectionName; // TODO
	const recommendationsCollectionName = getFirestoreCollectionPath(
		recommendationsApi.apiResourceCollectionId,
	);

	// Initialize a Firestore batch transaction
	const batch = db.batch();

	// Locate compatible PARAMETERs
	const compatibleParameters = await locateCompatibleParameters({
		age_range,
		capital_level,
		investing_goals,
		risk_preference,
	});

	// Set USER.parameters as an array of the PARAMETER._id values
	const compatibleParameterIds = compatibleParameters.map(({ _id }) => _id);
	const updateUserParams: UpdateUserParams = {
		parameters: compatibleParameterIds,
	};
	batch.update(db.collection(userCollectionName).doc(userId), updateUserParams);

	// Create a RECOMMENDATION for USER
	const recommendation = await createRecommendationForUser(
		{ age_range, capital_level, investing_goals, risk_preference },
		{ userId },
		compatibleParameters,
	);
	batch.set(
		db.collection(recommendationsCollectionName).doc(recommendation._id),
		recommendation,
	);

	// Create an ORDER for the USER
	// Create STOCK_ORDERs using:
	// 	- the symbols from RECOMMENDATION
	// 	- recent STOCK_PRICEs
	// Construct the redirect URL using ORDER
	return { redirect_url: 'TODO' };
};
