import { getFunctions } from 'firebase-admin/functions';
import { CloudTaskHandler, firebaseFunctions } from 'ergonomic-node';
import {
	ordersApi,
	Order,
	usersApi,
	User,
	isUserWithAlpacaEquity,
	assetOrdersApi,
	AssetOrder,
	AlpacaOrder,
	UserWithAlpacaEquity,
	getAssetOrderPropertiesFromAlpacaOrder,
	UpdateAssetOrderParams,
} from '@wallot/js';
import { PlaceAlpacaOrdersTaskParams } from '@wallot/node';
import { alpaca, db, gcp, log } from '../../services.js';

export const handlePlaceAlpacaOrdersTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 3, minBackoffSeconds: 30 },
};

/**
 * handlePlaceAlpacaOrders
 *
 * Precondition 1: USER has funds in their account
 *
 * Criteria for success:
 * 	If any of the Alpaca order placements are successful, the task is considered successful.
 */
export const handlePlaceAlpacaOrders: CloudTaskHandler<
	PlaceAlpacaOrdersTaskParams
> = async ({ data: { orderId } }) => {
	// Get ORDER
	const orderDoc = await db
		.collection(ordersApi.collectionId)
		.doc(orderId)
		.get();
	if (!orderDoc.exists) throw new Error('Order not found');
	const order = orderDoc.data() as Order;

	// Get USER
	const userDoc = await db
		.collection(usersApi.collectionId)
		.doc(order.user)
		.get();
	if (!userDoc.exists) throw new Error('User not found');
	const user = userDoc.data() as User;

	if (!isUserWithAlpacaEquity(user)) {
		// Precondition 1 failed
		// Kick to the `request_alpaca_ach_transfer` task
		const queue = getFunctions().taskQueue<PlaceAlpacaOrdersTaskParams>(
			'request_alpaca_ach_transfer',
		);
		const targetUri = await gcp.getCloudFunctionUrl(
			'request_alpaca_ach_transfer',
		);
		log({ message: 'Enqueuing request_alpaca_ach_transfer task', targetUri });
		const requestAlpacaAchTransferParams: PlaceAlpacaOrdersTaskParams = {
			orderId,
		};
		await queue.enqueue(requestAlpacaAchTransferParams, {
			scheduleDelaySeconds: 0,
			uri: targetUri,
		});
		return Promise.resolve();
	}

	// Query the ASSET_ORDERs
	const assetOrdersQuery = await db
		.collection(assetOrdersApi.collectionId)
		.where('order', '==', orderId)
		.get();
	if (assetOrdersQuery.empty) throw new Error('No ASSET_ORDERs found');
	const assetOrders = assetOrdersQuery.docs.map(
		(doc) => doc.data() as AssetOrder,
	);

	// Place the ALPACA_ORDERs such that the promise only rejects if all orders reject
	const alpacaOrderPromises = assetOrders.map((assetOrder) =>
		placeAlpacaOrder(user, assetOrder).then(
			(alpacaOrder) => ({
				alpacaOrder,
				assetOrder,
				error: null,
				success: true,
			}),
			(error) => ({ alpacaOrder: null, assetOrder, success: false, error }),
		),
	);
	const results = await Promise.all(alpacaOrderPromises);

	if (results.every((result) => !result.success)) {
		// If all Alpaca Order placements failed, throw an error
		throw new firebaseFunctions.https.HttpsError(
			'internal',
			'All Alpaca Order placements failed',
		);
	}

	// Initialize a batch
	const batch = db.batch();

	// Add updates to batch
	for (const { alpacaOrder, assetOrder, success, error } of results) {
		if (success) {
			if (alpacaOrder == null) throw new Error('Alpaca order is null'); // this shouldn't happen

			const assetOrderUpdateParams: UpdateAssetOrderParams =
				getAssetOrderPropertiesFromAlpacaOrder(alpacaOrder);
			const assetOrderDoc = db
				.collection(assetOrdersApi.collectionId)
				.doc(assetOrder._id);
			batch.update(assetOrderDoc, assetOrderUpdateParams);
		} else {
			log(
				{
					message: 'Alpaca order placement failed',
					code: 'ALPACA_ORDER_PLACEMENT_FAILED',
					assetOrder,
					error,
				},
				{ type: 'error' },
			);
			const assetOrderUpdateParams: UpdateAssetOrderParams = {
				description: 'Alpaca order placement failed',
			};
			const assetOrderDoc = db
				.collection(assetOrdersApi.collectionId)
				.doc(assetOrder._id);
			batch.update(assetOrderDoc, assetOrderUpdateParams);
		}
	}

	// Commit the batch
	await batch.commit();

	// Kick to the `refresh_alpaca_orders_status` task
	const queue = getFunctions().taskQueue<PlaceAlpacaOrdersTaskParams>(
		'refresh_alpaca_orders_status',
	);
	const targetUri = await gcp.getCloudFunctionUrl(
		'refresh_alpaca_orders_status',
	);
	log({ message: 'Enqueuing refresh_alpaca_orders_status task', targetUri });
	const refreshAlpacaOrdersParams: PlaceAlpacaOrdersTaskParams = {
		orderId,
	};
	await queue.enqueue(refreshAlpacaOrdersParams, {
		scheduleDelaySeconds: 20,
		uri: targetUri,
	});

	// Task complete
	return Promise.resolve();
};

async function placeAlpacaOrder(
	user: UserWithAlpacaEquity,
	assetOrder: AssetOrder,
) {
	const response = await alpaca.broker.post<AlpacaOrder>(
		`v1/trading/accounts/${user.alpaca_account_id}/orders`,
		{
			json: {
				qty: assetOrder.alpaca_order_qty,
				side: assetOrder.alpaca_order_side,
				symbol: assetOrder.alpaca_order_symbol,
				time_in_force: assetOrder.alpaca_order_time_in_force,
				type: assetOrder.alpaca_order_type,
			},
		},
	);
	return response.json();
}
