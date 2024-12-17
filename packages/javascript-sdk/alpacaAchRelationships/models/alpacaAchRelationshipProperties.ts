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

export const AlpacaAchRelationshipCategoryEnum = getEnum(['default']);
export type AlpacaAchRelationshipCategory =
	keyof typeof AlpacaAchRelationshipCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'alpaca_ach_relationship';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: AlpacaAchRelationshipCategoryEnum.getDefinedSchema(),
	// Add more properties here
} as const;
type U = typeof properties;

export const alpacaAchRelationshipsApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
} as const);
export type AlpacaAchRelationship = yup.InferType<
	typeof alpacaAchRelationshipsApi.apiResourceJsonSchema
>;
export type CreateAlpacaAchRelationshipParams = CreateParams<
	AlpacaAchRelationship,
	T
>;
export type UpdateAlpacaAchRelationshipParams =
	UpdateParams<AlpacaAchRelationship>;
