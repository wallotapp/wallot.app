import * as yup from 'yup';
import { AssetOrder } from '../models/assetOrderProperties.js';
import { AlpacaOrderStatusEnum } from './alpacaOrders.js';
import { YupHelpers } from 'ergonomic';
import { AssetOrderPendingAlpacaFill } from './assetOrderPendingAlpacaFillSchema.js';

export const assetOrderFilledByAlpacaProperties = {
	alpaca_order_status: YupHelpers.constant(AlpacaOrderStatusEnum.obj.filled),
};
export const assetOrderFilledByAlpacaSchema = yup.object(
	assetOrderFilledByAlpacaProperties,
);
export type AssetOrderFilledByAlpacaParams = yup.InferType<
	typeof assetOrderFilledByAlpacaSchema
>;

export type AssetOrderFilledByAlpaca = AssetOrderPendingAlpacaFill &
	AssetOrderFilledByAlpacaParams;
export const isAssetOrderFilledByAlpaca = (
	assetOrder: AssetOrder,
): assetOrder is AssetOrderFilledByAlpaca => {
	try {
		assetOrderFilledByAlpacaSchema.validateSync(assetOrder);
		return true;
	} catch (error) {
		console.error('Error detected in isAssetOrderFilledByAlpaca', error);
		return false;
	}
};
