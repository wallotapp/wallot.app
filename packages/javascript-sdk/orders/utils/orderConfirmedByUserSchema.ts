import * as yup from 'yup';
import { YupHelpers } from 'ergonomic';
import { Order } from '../models/orderProperties.js';

export const orderConfirmedByUserProperties = {
	status: YupHelpers.constant('confirmed_by_user'),
};
export const orderConfirmedByUserSchema = yup.object(
	orderConfirmedByUserProperties,
);

export type OrderConfirmedByUserParams = yup.InferType<
	typeof orderConfirmedByUserSchema
>;
export type OrderConfirmedByUser = Order & OrderConfirmedByUserParams;

export const isOrderConfirmedByUser = (
	order: Order,
): order is OrderConfirmedByUser => {
	try {
		orderConfirmedByUserSchema.validateSync(order);
		return true;
	} catch (error) {
		return false;
	}
};
