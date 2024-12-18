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

export const AssetCategoryEnum = getEnum(['default']);
export type AssetCategory = keyof typeof AssetCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'asset';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: AssetCategoryEnum.getDefinedSchema(),
	// Add more properties here
} as const;
type U = typeof properties;

export const assetsApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
} as const);
export type Asset = yup.InferType<typeof assetsApi.apiResourceJsonSchema>;
export type CreateAssetParams = CreateParams<Asset, T>;
export type UpdateAssetParams = UpdateParams<Asset>;
