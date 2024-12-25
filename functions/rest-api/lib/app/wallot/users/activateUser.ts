import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import {
	ActivateUserParams,
	ActivateUserResponse,
	UpdateUserParams,
	assetOrdersApi,
	getHomeWebAppRoute,
	ordersApi,
	recommendationsApi,
	usersApi,
} from '@wallot/js';
import { FunctionResponse } from '@wallot/node';
import { db } from '../../../services.js';
import { siteOriginByTarget } from '../../../variables.js';
import { locateCompatibleParameters } from '../parameters/locateCompatibleParameters.js';
import { createAssetOrdersFromRecommendation } from '../assetOrders/createAssetOrdersFromRecommendation.js';
import { createRecommendationForUser } from '../recommendations/createRecommendationForUser.js';
import { cancelActivationReminderEmails } from './cancelActivationReminderEmails.js';
import { placeUserInEmailCohorts } from './placeUserInEmailCohorts.js';
import { scheduleOrderCompletionReminderEmail } from './scheduleOrderCompletionReminderEmail.js';
import { scheduleWeek1RetentionEmail } from './scheduleWeek1RetentionEmail.js';

export const activateUser = async (
	{
		age_range,
		capital_level,
		investing_goals,
		risk_preference,
	}: ActivateUserParams,
	_params: Record<string, never>,
	_query: Record<string, never>,
	firebaseUser: FirebaseUser | null,
): Promise<FunctionResponse<ActivateUserResponse>> => {
	if (firebaseUser == null) throw new Error('Unauthorized');

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
		db.collection(usersApi.collectionId).doc(firebaseUser.uid),
		updateUserParams,
	);

	// Create a custom RECOMMENDATION for USER
	const recommendation = await createRecommendationForUser({
		age_range,
		capital_level,
		investing_goals,
		risk_preference,
		userId: firebaseUser.uid,
		compatibleParameters,
	});
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
			user: firebaseUser.uid,
		},
	});
	batch.set(db.collection(ordersApi.collectionId).doc(orderDocId), orderDoc);

	// Create ASSET_ORDERs using:
	// 	- the symbols from RECOMMENDATION
	// 	- recent ASSET_PRICEs
	const assetOrders = await createAssetOrdersFromRecommendation({
		orderId: orderDocId,
		recommendation,
	});
	assetOrders.forEach((assetOrder) => {
		const assetOrderDocId = assetOrder._id;
		batch.set(
			db.collection(assetOrdersApi.collectionId).doc(assetOrderDocId),
			assetOrder,
		);
	});

	// Commit the batch transaction
	await batch.commit();

	// Construct the redirect URL using ORDER
	const redirectUrl = getHomeWebAppRoute({
		includeOrigin: true,
		origin: siteOriginByTarget.HOME_WEB_APP,
		queryParams: { order_id: orderDocId },
		routeStaticId: 'HOME_WEB_APP__/ORDERS/[ORDER_ID]/ASSETS',
	});

	// Construct the post-response callback
	const onFinished = async () => {
		// Cancel activation reminder emails for USER (if any are remaining)
		await cancelActivationReminderEmails({ userId: firebaseUser.uid });

		// Place USER in email cohorts best fit for her PARAMETERs
		await placeUserInEmailCohorts({ userId: firebaseUser.uid });

		// Schedule order completion reminder email for USER
		await scheduleOrderCompletionReminderEmail({ userId: firebaseUser.uid });

		// Schedule week-1 retention email for USER
		await scheduleWeek1RetentionEmail({ userId: firebaseUser.uid });
	};

	// Construct the redirect URL using ORDER
	return { json: { redirect_url: redirectUrl }, onFinished };
};
