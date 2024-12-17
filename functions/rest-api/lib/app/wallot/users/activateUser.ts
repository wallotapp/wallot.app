import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	ActivateUserParams,
	ActivateUserResponse,
	UpdateUserParams,
	getHomeWebAppRoute,
	ordersApi,
	recommendationsApi,
	stockOrdersApi,
	usersApi,
} from '@wallot/js';
import { auth, db } from '../../../services.js';
import { siteOriginByTarget } from '../../../variables.js';
import { locateCompatibleParameters } from '../parameters/locateCompatibleParameters.js';
import { createRecommendationForUser } from '../recommendations/createRecommendationForUser.js';
import { createStockOrdersFromRecommendation } from '../stockOrders/createStockOrdersFromRecommendation.js';

getHomeWebAppRoute;
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
	_params: Record<string, never>,
	_query: Record<string, never>,
	_firebaseUser: FirebaseUser | null,
	userId: string | null,
): Promise<ActivateUserResponse> => {
	if (!userId) throw new Error('Unauthorized');

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
	batch.update(
		db.collection(usersApi.collectionId).doc(userId),
		updateUserParams,
	);

	// Create a RECOMMENDATION for USER
	const recommendation = await createRecommendationForUser(
		{ age_range, capital_level, investing_goals, risk_preference },
		{ userId },
		compatibleParameters,
	);
	batch.set(
		db.collection(recommendationsApi.collectionId).doc(recommendation._id),
		recommendation,
	);

	// Create an ORDER for the USER
	const orderDocId = ordersApi.generateId();
	const orderDoc = ordersApi.mergeCreateParams({
		createParams: {
			_id: orderDocId,
			category: 'default',
			name: '',
			user: userId,
		},
	});
	batch.set(db.collection(ordersApi.collectionId).doc(orderDocId), orderDoc);

	// Create STOCK_ORDERs using:
	// 	- the symbols from RECOMMENDATION
	// 	- recent STOCK_PRICEs
	const stockOrders = await createStockOrdersFromRecommendation(
		recommendation,
		{
			orderId: orderDocId,
			userId,
		},
	);
	stockOrders.forEach((stockOrder) => {
		const stockOrderDocId = stockOrder._id;
		batch.set(
			db.collection(stockOrdersApi.collectionId).doc(stockOrderDocId),
			stockOrder,
		);
	});

	// Construct the redirect URL using ORDER
	return { redirect_url: 'TODO' };
};
