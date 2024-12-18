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
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'asset_order';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: AssetOrderCategoryEnum.getDefinedSchema(),
	// Add more properties here
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
