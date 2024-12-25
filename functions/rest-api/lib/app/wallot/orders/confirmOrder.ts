import { getCloudFunctionUrl } from 'ergonomic-node';

import { getFunctions } from 'firebase-admin/functions';
import { secrets } from '../../../secrets.js';
import { directoryPath } from '../../../directoryPath.js';
import { v4 } from 'uuid';
const serviceAccountPath = `${directoryPath}/../gmailApiServiceAccount.json`;

import { type DecodedIdToken as FirebaseUser } from 'firebase-admin/auth';
import { FunctionResponse } from '@wallot/node';
import { getHomeWebAppRoute, ConfirmOrderParams, ConfirmOrderRouteParams, ConfirmOrderResponse, OrderConfirmedByUserParams, ordersApi, assetOrdersApi, AssetOrder, UpdateOrderParams } from '@wallot/js';
import { db } from '../../../services.js';
import { siteOriginByTarget } from '../../../variables.js';

export const confirmOrder = async ({ bank_account }: ConfirmOrderParams, { orderId }: ConfirmOrderRouteParams, _query: Record<string, never>, firebaseUser: FirebaseUser | null): Promise<FunctionResponse<ConfirmOrderResponse>> => {
	if (!firebaseUser) throw new Error('Unauthorized');

	// Update ORDER status
	const fillTaskId = v4();
	const updateParams: UpdateOrderParams & OrderConfirmedByUserParams = {
		bank_account,
		fill_task_id: fillTaskId,
		status: 'confirmed_by_user',
	};
	await db.collection(ordersApi.collectionId).doc(orderId).update(updateParams);

	// Query ASSET_ORDERs and grab the first one
	const assetOrdersQuerySnapshot = await db.collection(assetOrdersApi.collectionId).where('order', '==', orderId).get();
	const assetOrderDoc = assetOrdersQuerySnapshot.docs[0];
	if (!assetOrderDoc) throw new Error('Asset order not found');
	const assetOrder = assetOrderDoc.data() as AssetOrder;

	// Construct redirect URL
	const redirectUrl = getHomeWebAppRoute({
		origin: siteOriginByTarget.HOME_WEB_APP,
		includeOrigin: true,
		queryParams: { asset_id: assetOrder.asset },
		routeStaticId: 'HOME_WEB_APP__/ASSETS/[ASSET_ID]/CONGRATULATIONS',
	});

	// Enqueue fill_order task
	const onFinished = async () => {
		const queue = getFunctions().taskQueue<FillOrderListenerTaskParams>('fill_order');
		const targetUri = await getCloudFunctionUrl({
			...secrets,
			functionName: 'fill_order',
			serviceAccountPath,
		});
		await queue.enqueue(
			{ orderId },
			{
				id: fillTaskId,
				scheduleDelaySeconds: 0,
				uri: targetUri,
			},
		);
	};

	return { json: { redirect_url: redirectUrl }, onFinished };
};

type FillOrderListenerTaskParams = ConfirmOrderRouteParams;
