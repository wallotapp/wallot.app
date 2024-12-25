import * as yup from 'yup';
import { AssetOrder } from '../models/assetOrderProperties.js';
import { AlpacaOrderStatusEnum } from './alpacaOrders.js';
import { getEnum } from 'ergonomic';
import { AssetOrderPendingAlpacaFill } from './assetOrderPendingAlpacaFillSchema.js';

export const RejectedAlpacaOrderStatusEnum = getEnum([
	AlpacaOrderStatusEnum.obj.canceled,
	AlpacaOrderStatusEnum.obj.expired,
	AlpacaOrderStatusEnum.obj.pending_cancel,
	AlpacaOrderStatusEnum.obj.rejected,
	AlpacaOrderStatusEnum.obj.replaced,
	AlpacaOrderStatusEnum.obj.stopped,
	AlpacaOrderStatusEnum.obj.suspended,
]);

export const assetOrderRejectedByAlpacaProperties = {
	alpaca_order_status: RejectedAlpacaOrderStatusEnum.getDefinedSchema(),
};
export const assetOrderRejectedByAlpacaSchema = yup.object(assetOrderRejectedByAlpacaProperties);
export type AssetOrderRejectedByAlpacaParams = yup.InferType<typeof assetOrderRejectedByAlpacaSchema>;

export type AssetOrderRejectedByAlpaca = AssetOrderPendingAlpacaFill & AssetOrderRejectedByAlpacaParams;
export const isAssetOrderRejectedByAlpaca = (assetOrder: AssetOrder): assetOrder is AssetOrderRejectedByAlpaca => {
	try {
		assetOrderRejectedByAlpacaSchema.validateSync(assetOrder);
		return true;
	} catch (error) {
		console.error('Error detected in isAssetOrderRejectedByAlpaca', error);
		return false;
	}
};
