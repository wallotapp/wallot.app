import { getCloudFunctionUrl } from 'ergonomic-node';

import { getFunctions } from 'firebase-admin/functions';
import { secrets } from '../../../secrets.js';
import { directoryPath } from '../../../directoryPath.js';
import { v4 } from 'uuid';
const serviceAccountPath = `${directoryPath}/../gmailApiServiceAccount.json`;

import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import {
	getHomeSiteRoute, // route function
	ConfirmOrderParams,
	ConfirmOrderRouteParams,
	ConfirmOrderResponse,
	OrderConfirmedByUserParams,
	ordersApi,
	UpdateOrderParams,
	licensesApi,
	License,
	isProLicense,
	usersApi,
	User,
	ProLicenseParams,
} from '@wallot/js';
import { db, log, stripe } from '../../../services.js';
import { siteOriginByTarget } from '../../../variables.js';

export const confirmOrder = async (
	{ bank_account }: ConfirmOrderParams,
	{ orderId }: ConfirmOrderRouteParams,
	_query: Record<string, never>,
	firebaseUser: FirebaseUser | null,
): Promise<FunctionResponse<ConfirmOrderResponse>> => {
	if (!firebaseUser) throw new Error('Unauthorized');

	// Get USER
	const userDoc = await db
		.collection(usersApi.collectionId)
		.doc(firebaseUser.uid)
		.get();
	if (!userDoc.exists) throw new Error('User not found');
	const user = userDoc.data() as User;

	// Create a batch
	const batch = db.batch();

	// Subscribe the user to Wallot Pro if they are on free plan
	const licensesQuerySnapshot = await db
		.collection(licensesApi.collectionId)
		.where('user', '==', firebaseUser.uid)
		.get();
	const licenseDoc = licensesQuerySnapshot.docs[0];
	if (!licenseDoc) throw new Error('License not found');
	const license = licenseDoc.data() as License;
	log({ message: 'License found', license });
	if (!isProLicense(license)) {
		log({ message: 'User does not have a pro license' });
		const stripeSubscription = await stripe.subscriptions.create({
			customer: user.stripe_customer_id,
			items: [
				{
					price:
						secrets.SECRET_CRED_STRIPE_PRO_LICENSE_PRODUCT_MONTHLY_PRICE_ID,
					quantity: 1,
				},
			],
			metadata: {
				user_id: user._id,
				firebase_auth_email: user.firebase_auth_email || 'No email',
				license_id: license._id,
			},
		});
		const licenseUpdateParams: ProLicenseParams = {
			stripe_subscription_id: stripeSubscription.id,
			plan: 'pro',
		};
		log({
			message: 'Stripe subscription created',
			licenseUpdateParams,
			stripeSubscription,
		});
		batch.update(
			db.collection(licensesApi.collectionId).doc(license._id),
			licenseUpdateParams,
		);
	} else {
		log({ message: 'User already has a pro license' });
	}

	// Update ORDER status
	const fillOrderTaskId = v4();
	const orderUpdateParams: UpdateOrderParams & OrderConfirmedByUserParams = {
		bank_account,
		fill_task_id: fillOrderTaskId,
		status: 'confirmed_by_user',
	};
	log({ message: 'Updating order', orderUpdateParams });
	batch.update(
		db.collection(ordersApi.collectionId).doc(orderId),
		orderUpdateParams,
	);

	// Commit batch
	await batch.commit();

	// Construct redirect URL
	const redirectUrl = getHomeSiteRoute({
		origin: siteOriginByTarget.HOME_SITE,
		includeOrigin: true,
		queryParams: { order_id: orderId },
		routeStaticId: 'HOME_SITE__/ORDERS/[ORDER_ID]/CONGRATULATIONS',
	});

	const onFinished = async () => {
		// Enqueue place_alpaca_orders task
		const queue = getFunctions().taskQueue<FillOrderListenerTaskParams>(
			'place_alpaca_orders',
		);
		const targetUri = await getCloudFunctionUrl({
			...secrets,
			functionName: 'place_alpaca_orders',
			serviceAccountPath,
		});
		log({ message: 'Enqueuing place_alpaca_orders task', targetUri });
		await queue.enqueue(
			{ orderId },
			{
				id: fillOrderTaskId,
				scheduleDelaySeconds: 0,
				uri: targetUri,
			},
		);
	};

	return { json: { redirect_url: redirectUrl }, onFinished };
};

type FillOrderListenerTaskParams = ConfirmOrderRouteParams;
