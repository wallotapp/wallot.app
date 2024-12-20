import * as yup from 'yup';
import {
	GeneralizedApiResourceCreateParamsRequiredFieldEnum,
	GeneralizedApiResourceProperties,
	CreateParams,
	UpdateParams,
	YupHelpers,
	getApiResourceSpec,
	getEnum,
	GeneralizedFieldTypeEnum,
} from 'ergonomic';
import {
	apiYupHelpers,
	idPrefixByResourceName,
} from '../../utils/apiYupHelpers.js';

export const AlpacaAssetCategoryEnum = getEnum(['default']);
export type AlpacaAssetCategory = keyof typeof AlpacaAssetCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'attributes',
	'class',
	'easy_to_borrow',
	'exchange',
	'fractionable',
	'id',
	'maintenance_margin_requirement',
	'margin_requirement_long',
	'margin_requirement_short',
	'marginable',
	'status',
	'symbol',
	'tradable',
	'shortable',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

// Attributes
export const AlpacaAssetAttributesEnum = getEnum([
	'ptp_no_exception',
	'ptp_with_exception',
	'ipo',
	'has_options',
	'options_late_close',
]);
export type AlpacaAssetAttributes = keyof typeof AlpacaAssetAttributesEnum.obj;

// Class
export const AlpacaAssetClassEnum = getEnum([
	'us_equity',
	'us_option',
	'crypto',
]);
export type AlpacaAssetClass = keyof typeof AlpacaAssetClassEnum.obj;

// Exchange
export const AlpacaStockExchangeEnum = getEnum([
	'AMEX',
	'ARCA',
	'BATS',
	'NYSE',
	'NASDAQ',
	'NYSEARCA',
	'OTC',
]);
export type AlpacaStockExchange = keyof typeof AlpacaStockExchangeEnum.obj;

export const AlpacaCryptoExchangeEnum = getEnum(['ERSX', 'FTXU']);
export type AlpacaCryptoExchange = keyof typeof AlpacaCryptoExchangeEnum.obj;

export const AlpacaExchangeEnum = getEnum([
	...AlpacaStockExchangeEnum.arr,
	...AlpacaCryptoExchangeEnum.arr,
]);
export type AlpacaExchange = keyof typeof AlpacaExchangeEnum.obj;

// Status
export const AlpacaAssetStatusEnum = getEnum(['active', 'inactive']);
export type AlpacaAssetStatus = keyof typeof AlpacaAssetStatusEnum.obj;

const _object = 'alpaca_asset';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: AlpacaAssetCategoryEnum.getDefinedSchema(),
	// API Reference -- https://docs.alpaca.markets/reference/getassetbysymbolorid-1
	attributes: YupHelpers.array(AlpacaAssetAttributesEnum.getDefinedSchema()),
	class: AlpacaAssetClassEnum.getDefinedSchema(),
	easy_to_borrow: YupHelpers.booleanDefaultUnset(),
	exchange: AlpacaExchangeEnum.getDefinedSchema(),
	fractionable: YupHelpers.booleanDefaultUnset(),
	id: yup.string().required().defined().min(1).meta({ unique_key: true }),
	maintenance_margin_requirement: yup.number().nullable().default(null), // <= deprecated
	margin_requirement_long: yup.string().nullable().default(null),
	margin_requirement_short: yup.string().nullable().default(null),
	marginable: YupHelpers.booleanDefaultUnset(),
	shortable: YupHelpers.booleanDefaultUnset(),
	status: AlpacaAssetStatusEnum.getDefinedSchema(),
	symbol: yup
		.string()
		.nullable()
		.default(null)
		.meta({ type: GeneralizedFieldTypeEnum.obj.short_text, unique_key: true }),
	tradable: YupHelpers.booleanDefaultUnset(),
} as const;
type U = typeof properties;

export const alpacaAssetsApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
} as const);
export type AlpacaAsset = yup.InferType<
	typeof alpacaAssetsApi.apiResourceJsonSchema
>;
export type CreateAlpacaAssetParams = CreateParams<AlpacaAsset, T>;
export type UpdateAlpacaAssetParams = UpdateParams<AlpacaAsset>;
