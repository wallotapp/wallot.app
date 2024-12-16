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
	idPrefixByCollection,
} from '../../utils/apiYupHelpers.js';

export const AuthCredentialCategoryEnum = getEnum(['default']);
export type AuthCredentialCategory =
	keyof typeof AuthCredentialCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'user',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'auth_credential';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: AuthCredentialCategoryEnum.getDefinedSchema(),
	user: apiYupHelpers.idRef(['user']),
} as const;
type U = typeof properties;

export const authCredentialsApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type AuthCredential = yup.InferType<
	typeof authCredentialsApi.apiResourceJsonSchema
>;
export type CreateAuthCredentialParams = CreateParams<AuthCredential, T>;
export type UpdateAuthCredentialParams = UpdateParams<AuthCredential>;
