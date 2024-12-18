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
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'asset_price';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: AssetPriceCategoryEnum.getDefinedSchema(),
	// Add more properties here
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
