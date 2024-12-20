import * as yup from 'yup';
import {
	GeneralizedApiResourceCreateParamsRequiredFieldEnum,
	GeneralizedApiResourceProperties,
	CreateParams,
	UpdateParams,
	YupHelpers,
	getApiResourceSpec,
	getEnum,
} from 'ergonomic';
import {
	apiYupHelpers,
	idPrefixByResourceName,
} from '../../utils/apiYupHelpers.js';

export const AssetPriceCategoryEnum = getEnum(['default']);
export type AssetPriceCategory = keyof typeof AssetPriceCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'adjusted_close',
	'asset',
	'close',
	'dividend_amount',
	'high',
	'low',
	'open',
	'split_coefficient',
	'symbol',
	'timestamp',
	'time_zone',
	'volume',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'asset_price';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	adjusted_close: yup.string().nullable().default(null),
	asset: apiYupHelpers.idRef(['asset']).min(1).meta({ unique_key: false }),
	category: AssetPriceCategoryEnum.getDefinedSchema(),
	close: yup.string().nullable().default(null),
	dividend_amount: yup.string().nullable().default(null),
	high: yup.string().nullable().default(null),
	low: yup.string().nullable().default(null),
	name: GeneralizedApiResourceProperties.name.meta({ unique_key: true }),
	open: yup.string().nullable().default(null),
	split_coefficient: yup.string().nullable().default(null),
	symbol: yup
		.string()
		.defined()
		.meta({
			unique_by: ['timestamp'],
			unique_key: false,
		}),
	timestamp: YupHelpers.date(),
	time_zone: yup.string().nullable().default(null),
	volume: yup.string().nullable().default(null),
} as const;
type U = typeof properties;

export const assetPricesApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
} as const);
export type AssetPrice = yup.InferType<
	typeof assetPricesApi.apiResourceJsonSchema
>;
export type CreateAssetPriceParams = CreateParams<AssetPrice, T>;
export type UpdateAssetPriceParams = UpdateParams<AssetPrice>;
