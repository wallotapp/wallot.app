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
import {
	AlpacaAssetPropertyName,
	AlpacaAssetPropertyNameEnum,
	RemoveAlpacaAssetPrefix,
	alpacaAssetProperties,
} from '../utils/alpacaAssets.js';
import {
	AlphaVantageCompanyPropertyName,
	AlphaVantageCompanyPropertyNameEnum,
	RemoveAlphaVantageCompanyPrefix,
	alphaVantageCompanyProperties,
} from '../utils/alphaVantageCompanies.js';

export const AssetCategoryEnum = getEnum(['default']);
export type AssetCategory = keyof typeof AssetCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'symbol',
	...AlpacaAssetPropertyNameEnum.arr,
	...AlphaVantageCompanyPropertyNameEnum.arr,
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'asset';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: AssetCategoryEnum.getDefinedSchema(),
	symbol: yup.string().defined().min(1).meta({ unique_key: true }),
	...alpacaAssetProperties,
	...alphaVantageCompanyProperties,
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

export type AlpacaAsset = RemoveAlpacaAssetPrefix<
	Pick<Asset, AlpacaAssetPropertyName>
>;
export type AlphaVantageCompany = RemoveAlphaVantageCompanyPrefix<
	Pick<Asset, AlphaVantageCompanyPropertyName>
>;
