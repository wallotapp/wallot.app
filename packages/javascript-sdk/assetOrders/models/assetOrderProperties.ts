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

export const AssetOrderCategoryEnum = getEnum(['default']);
export type AssetOrderCategory = keyof typeof AssetOrderCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'asset',
	'order',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'asset_order';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	alpaca_order: apiYupHelpers
		.idRef(['alpaca_order'])
		.default(null)
		.nullable()
		.meta({ unique_key: true }),
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
	recommendations: apiYupHelpers
		.idRefs(['recommendation'])
		.default(null)
		.nullable(),
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
