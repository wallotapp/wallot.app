import { AssetOrder, AlpacaOrder } from '../models/assetOrderProperties.js';
import {
	AlpacaOrderPropertyName,
	AlpacaOrderPropertyNameEnum,
} from './alpacaOrders.js';

export const getAssetOrderPropertiesFromAlpacaOrder = (
	alpacaOrder: AlpacaOrder,
): Pick<AssetOrder, AlpacaOrderPropertyName> => {
	return AlpacaOrderPropertyNameEnum.arr.reduce((acc, propertyName) => {
		const originalPropertyName = propertyName.replace(
			'alpaca_order_',
			'',
		) as keyof AlpacaOrder;
		const value = alpacaOrder[originalPropertyName] ?? null;
		return {
			...acc,
			[propertyName]: value,
		};
	}, {} as Pick<AssetOrder, AlpacaOrderPropertyName>);
};
