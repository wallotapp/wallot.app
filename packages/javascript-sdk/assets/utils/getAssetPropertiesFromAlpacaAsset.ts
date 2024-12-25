import { Asset, AlpacaAsset } from '../models/assetProperties.js';
import { AlpacaAssetPropertyNameEnum } from './alpacaAssets.js';
import { AlpacaAssetPropertyName } from './alpacaAssets.js';

export const getAssetPropertiesFromAlpacaAsset = (
	alpacaAsset: AlpacaAsset,
): Pick<Asset, AlpacaAssetPropertyName> => {
	return AlpacaAssetPropertyNameEnum.arr.reduce((acc, propertyName) => {
		const originalPropertyName = propertyName.replace(
			'alpaca_asset_',
			'',
		) as keyof AlpacaAsset;
		const value = alpacaAsset[originalPropertyName] ?? null;
		return {
			...acc,
			[propertyName]: value,
		};
	}, {} as Pick<Asset, AlpacaAssetPropertyName>);
};
