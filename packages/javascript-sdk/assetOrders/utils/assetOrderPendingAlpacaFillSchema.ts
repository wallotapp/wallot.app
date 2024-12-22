import * as yup from 'yup';
import { AssetOrder } from '../models/assetOrderProperties.js';
import { alpacaOrderProperties } from './alpacaOrders.js';

export const assetOrderPendingAlpacaFillProperties = {
	alpaca_order_id: alpacaOrderProperties.alpaca_order_id.min(1).nullable(false),
	alpaca_order_status:
		alpacaOrderProperties.alpaca_order_status.nullable(false),
};
export const assetOrderPendingAlpacaFillSchema = yup.object(
	assetOrderPendingAlpacaFillProperties,
);
export type AssetOrderPendingAlpacaFillParams = yup.InferType<
	typeof assetOrderPendingAlpacaFillSchema
>;

export type AssetOrderPendingAlpacaFill = AssetOrder &
	AssetOrderPendingAlpacaFillParams;
export const isAssetOrderPendingAlpacaFill = (
	assetOrder: AssetOrder,
): assetOrder is AssetOrderPendingAlpacaFill => {
	try {
		assetOrderPendingAlpacaFillSchema.validateSync(assetOrder);
		return true;
	} catch (error) {
		console.error('Error detected in isAssetOrderPendingAlpacaFill', error);
		return false;
	}
};
