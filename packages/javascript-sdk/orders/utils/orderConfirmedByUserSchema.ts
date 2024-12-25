import * as yup from 'yup';
import { YupHelpers } from 'ergonomic';
import { Order, OrderStatusEnum } from '../models/orderProperties.js';

export const orderConfirmedByUserProperties = {
	fill_task_id: yup.string().defined().nullable(false).min(1),
	status: YupHelpers.constant(OrderStatusEnum.obj.confirmed_by_user),
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
		console.error('Error detected in isOrderConfirmedByUser', error);
		return false;
	}
};

export type ConfirmOrderRouteParams = { orderId: string };
export type ConfirmOrderParams = { bank_account: string };
export type ConfirmOrderResponse = { redirect_url: string };
