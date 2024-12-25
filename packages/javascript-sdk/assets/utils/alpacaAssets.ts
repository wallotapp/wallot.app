import * as yup from 'yup';
import { YupHelpers, getEnum, GeneralizedFieldTypeEnum, Keys } from 'ergonomic';

export const AlpacaAssetCategoryEnum = getEnum(['default']);
export type AlpacaAssetCategory = keyof typeof AlpacaAssetCategoryEnum.obj;

// Attributes
export const AlpacaAssetAttributesEnum = getEnum(['ptp_no_exception', 'ptp_with_exception', 'ipo', 'has_options', 'options_late_close', 'fractional_eh_enabled']);
export type AlpacaAssetAttributes = keyof typeof AlpacaAssetAttributesEnum.obj;

// Class
export const AlpacaAssetClassEnum = getEnum(['us_equity', 'us_option', 'crypto']);
export type AlpacaAssetClass = keyof typeof AlpacaAssetClassEnum.obj;

// Exchange
export const AlpacaStockExchangeEnum = getEnum(['AMEX', 'ARCA', 'BATS', 'NYSE', 'NASDAQ', 'NYSEARCA', 'OTC']);
export type AlpacaStockExchange = keyof typeof AlpacaStockExchangeEnum.obj;

export const AlpacaCryptoExchangeEnum = getEnum(['ERSX', 'FTXU']);
export type AlpacaCryptoExchange = keyof typeof AlpacaCryptoExchangeEnum.obj;

export const AlpacaExchangeEnum = getEnum([...AlpacaStockExchangeEnum.arr, ...AlpacaCryptoExchangeEnum.arr]);
export type AlpacaExchange = keyof typeof AlpacaExchangeEnum.obj;

// Status
export const AlpacaAssetStatusEnum = getEnum(['active', 'inactive']);
export type AlpacaAssetStatus = keyof typeof AlpacaAssetStatusEnum.obj;

export const alpacaAssetProperties = {
	alpaca_asset_attributes: YupHelpers.array(AlpacaAssetAttributesEnum.getDefinedSchema()),
	alpaca_asset_class: AlpacaAssetClassEnum.getDefinedSchema(),
	alpaca_asset_easy_to_borrow: YupHelpers.booleanDefaultUnset(),
	alpaca_asset_exchange: AlpacaExchangeEnum.getDefinedSchema(),
	alpaca_asset_fractionable: YupHelpers.booleanDefaultUnset(),
	alpaca_asset_id: yup.string().required().defined().min(1).meta({ unique_key: true }),
	alpaca_asset_maintenance_margin_requirement: yup.number().nullable().default(null), // <= deprecated
	alpaca_asset_margin_requirement_long: yup.string().nullable().default(null),
	alpaca_asset_margin_requirement_short: yup.string().nullable().default(null),
	alpaca_asset_marginable: YupHelpers.booleanDefaultUnset(),
	alpaca_asset_name: yup.string().defined().min(1),
	alpaca_asset_shortable: YupHelpers.booleanDefaultUnset(),
	alpaca_asset_status: AlpacaAssetStatusEnum.getDefinedSchema(),
	alpaca_asset_symbol: yup.string().nullable().default(null).meta({ type: GeneralizedFieldTypeEnum.obj.short_text, unique_key: true }),
	alpaca_asset_tradable: YupHelpers.booleanDefaultUnset(),
} as const;

export const AlpacaAssetPropertyNameEnum = getEnum(Keys(alpacaAssetProperties));
export type AlpacaAssetPropertyName = keyof typeof AlpacaAssetPropertyNameEnum.obj;

export type RemoveAlpacaAssetPrefix<T> = {
	[K in keyof T as K extends `alpaca_asset_${infer Rest}` ? Rest : K]: T[K];
};
