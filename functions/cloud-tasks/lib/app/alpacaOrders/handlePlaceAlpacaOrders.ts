import { getFunctions } from 'firebase-admin/functions';
import { CloudTaskHandler } from 'ergonomic-node';
import {
	ordersApi,
	Order,
	usersApi,
	User,
	isUserWithAlpacaEquity,
} from '@wallot/js';
import { PlaceAlpacaOrdersListenerTaskParams } from '@wallot/node';
import { db, gcp, log } from '../../services.js';

export const handlePlaceAlpacaOrdersTaskOptions = {
	rateLimits: { maxConcurrentDispatches: 6 },
	retryConfig: { maxAttempts: 3, minBackoffSeconds: 30 },
};

/**
 * handlePlaceAlpacaOrders
 *
 * Precondition 1: USER has funds in their account
 */
export const handlePlaceAlpacaOrders: CloudTaskHandler<
	PlaceAlpacaOrdersListenerTaskParams
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
		const queue = getFunctions().taskQueue<PlaceAlpacaOrdersListenerTaskParams>(
			'request_alpaca_ach_transfer',
		);
		const targetUri = await gcp.getCloudFunctionUrl(
			'request_alpaca_ach_transfer',
		);
		log({ message: 'Enqueuing request_alpaca_ach_transfer task', targetUri });
		const requestAlpacaAchTransferParams: PlaceAlpacaOrdersListenerTaskParams =
			{
				orderId,
			};
		await queue.enqueue(requestAlpacaAchTransferParams, {
			scheduleDelaySeconds: 0,
			uri: targetUri,
		});
		return Promise.resolve();
	}

	// Place the order
	// TODO
	return Promise.resolve();
};
