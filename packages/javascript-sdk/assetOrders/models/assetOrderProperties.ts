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

export const AssetOrderCategoryEnum = getEnum(['default']);
export type AssetOrderCategory = keyof typeof AssetOrderCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'amount',
	'asset',
	'order',
	'recommendations',
	'side',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

export const AssetOrderSideEnum = getEnum(['buy', 'sell']);
export type AssetOrderSide = keyof typeof AssetOrderSideEnum.obj;

const _object = 'asset_order';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	alpaca_order_id: yup.string().default(null).nullable().meta({
		unique_key: true,
		type: GeneralizedFieldTypeEnum.obj.short_text,
	}),
	amount: YupHelpers.usd().defined().min(1),
	asset: apiYupHelpers
		.idRef(['asset'])
		.min(1)
		.meta({
			unique_by: ['order'],
			unique_key: false,
		}),
	category: AssetOrderCategoryEnum.getDefinedSchema(),
	order: apiYupHelpers.idRef(['order']).min(1).meta({ unique_key: false }),
	position: apiYupHelpers
		.idRef(['position'])
		.default(null)
		.nullable()
		.meta({ unique_key: false }),
	recommendations: apiYupHelpers.idRefs(['recommendation']).defined().min(1),
	side: AssetOrderSideEnum.getDefinedSchema(),
} as const;
type U = typeof properties;

export const assetOrdersApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
} as const);
export type AssetOrder = yup.InferType<
	typeof assetOrdersApi.apiResourceJsonSchema
>;
export type CreateAssetOrderParams = CreateParams<AssetOrder, T>;
export type UpdateAssetOrderParams = UpdateParams<AssetOrder>;
