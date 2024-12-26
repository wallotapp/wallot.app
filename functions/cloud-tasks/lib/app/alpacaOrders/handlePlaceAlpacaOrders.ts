import { CloudTaskHandler } from 'ergonomic-node';
import {
	getHomeSiteRoute, // route function
	ConfirmOrderParams,
	ConfirmOrderRouteParams,
	ConfirmOrderResponse,
	OrderConfirmedByUserParams,
	ordersApi,
	UpdateOrderParams,
	Order,
	licensesApi,
	License,
	isProLicense,
	usersApi,
	User,
	ProLicenseParams,
	isUserWithAlpacaEquity,
} from '@wallot/js';
import { PlaceAlpacaOrdersListenerTaskParams } from '@wallot/node';
import { db, log } from '../../services.js';

/**
 * handlePlaceAlpacaOrders
 *
 * Precondition: USER has funds in their account
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
		// Kick to the `request_alpaca_ach_transfer` task
		// TODO
	} else {
		// Place the order
		// TODO
	}
	return Promise.resolve();
};
