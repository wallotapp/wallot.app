import * as R from 'ramda';
import { CloudTaskHandler, firebaseFunctions } from 'ergonomic-node';
import {
	ordersApi,
	Order,
	usersApi,
	User,
	isUserWithAlpacaEquity,
	assetOrdersApi,
	AssetOrder, getAssetOrderPropertiesFromAlpacaOrder,
	UpdateAssetOrderParams,
	isAssetOrderPendingAlpacaFill,
	isOrderConfirmedByUser
} from '@wallot/js';
import { PlaceAlpacaOrdersTaskParams } from '@wallot/node';
import { alpaca, db, gcp, log } from '../../services.js';

export const handlePlaceAlpacaOrdersTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 3, minBackoffSeconds: 30 },
};

/**
 * Preconditions:
 * 	- USER has funds in their account
 *  - ORDER is confirmed by user
 *
 * Criteria for success:
 * 	- If any of the Alpaca order placements are successful, the task is considered successful.
 */
export const handlePlaceAlpacaOrdersTask: CloudTaskHandler<
	PlaceAlpacaOrdersTaskParams
> = async ({ data: { orderId } }) => {
	// Query ORDER
	const orderDoc = await db
		.collection(ordersApi.collectionId)
		.doc(orderId)
		.get();
	if (!orderDoc.exists) {
		// ORDER not found, so this task is not possible
		log(
			{
				message: 'Requested order placement, but order not found',
				orderId,
			},
			{ type: 'error' },
		);
		return Promise.resolve();
	}
	const order = orderDoc.data() as Order;

	if (!isOrderConfirmedByUser(order)) {
		// Precondition failed
		// The order is still in cart, so this task is not possible
		log({
			message: 'Requested order placement, but order not confirmed by user',
			orderId,
		});
		return Promise.resolve();
	}

	// Query USER
	const userDoc = await db
		.collection(usersApi.collectionId)
		.doc(order.user)
		.get();
	if (!userDoc.exists) {
		// User not found, so this task is not possible
		log({
			message:
				'Requested refresh of Alpaca activation status, but user not found',
		});
		return Promise.resolve();
	}
	const user = userDoc.data() as User;

	// Query the ASSET_ORDERs
	const assetOrdersQuery = await db
		.collection(assetOrdersApi.collectionId)
		.where('order', '==', orderId)
		.get();
	if (assetOrdersQuery.empty) {
		// The ORDER has no ASSET_ORDERs, so this task is not possible
		log({
			message: 'Requested order placement, but order has no asset orders',
			orderId,
		});
		return Promise.resolve();
	}
	const assetOrders = assetOrdersQuery.docs
		.map((doc) => doc.data() as AssetOrder)
		.filter(R.complement(isAssetOrderPendingAlpacaFill));
	if (assetOrders.length === 0) {
		// All the ASSET_ORDERs are already pending Alpaca fills, so this task is done
		log({
			message:
				'Requested order placement, but all asset orders are already pending Alpaca fills',
			orderId,
		});
		return Promise.resolve();
	}

	if (!isUserWithAlpacaEquity(user)) {
		// Precondition 1 failed
		// Kick to the `request_alpaca_ach_transfer` task

		// Derive the amount to transfer
		const orderSubtotalAmount = assetOrders.reduce((acc, assetOrder) => {
			return acc + Number(assetOrder.amount);
		}, 0);

		log({
			message:
				'Requested order placement, but user has no Alpaca equity. Kicking to ACH transfer',
			orderId,
		});
		await gcp.tasks.enqueueRequestAlpacaAchTransfer({
			amountInCents: orderSubtotalAmount,
			bankAccountId: order.bank_account,
			orderId,
			userId: order.user,
		});
		return Promise.resolve();
	}

	// Place the ALPACA_ORDERs such that the promise only rejects if all orders reject
	const alpacaOrderPromises = assetOrders.map((assetOrder) =>
		alpaca.broker.placeAlpacaOrder(user, assetOrder).then(
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
	const assetOrdersToRefresh = new Set<string>();

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
			assetOrdersToRefresh.add(assetOrder._id);
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

	// Kick to the `refresh_alpaca_order_status` task for each ASSET_ORDER
	for (const assetOrderId of assetOrdersToRefresh) {
		await gcp.tasks.enqueueRefreshAlpacaOrderStatus({
			assetOrderId,
			userId: user._id,
		});
	}

	// Task complete
	log({
		message: 'Alpaca orders placed',
		orderId,
		assetOrdersToRefresh: Array.from(assetOrdersToRefresh).join(', '),
	});
	return Promise.resolve();
};
