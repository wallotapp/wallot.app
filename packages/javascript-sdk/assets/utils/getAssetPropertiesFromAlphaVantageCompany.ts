import { Asset, AlphaVantageCompany } from '../models/assetProperties.js';
import { AlpacaAssetPropertyNameEnum } from './alpacaAssets.js';
import { AlphaVantageCompanyPropertyName } from './alphaVantageCompanies.js';

export const getAssetPropertiesFromAlphaVantageCompany = (
	alphaVantageCompany: AlphaVantageCompany,
): Pick<Asset, AlphaVantageCompanyPropertyName> => {
	return AlpacaAssetPropertyNameEnum.arr.reduce((acc, propertyName) => {
		const originalPropertyName = propertyName.replace(
			'alpha_vantage_company_',
			'',
		) as keyof AlphaVantageCompany;
		const value = alphaVantageCompany[originalPropertyName] ?? null;
		return {
			...acc,
			[propertyName]: value,
		};
	}, {} as Pick<Asset, AlphaVantageCompanyPropertyName>);
};
