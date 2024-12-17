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

export const LicenseCategoryEnum = getEnum(['default']);
export type LicenseCategory = keyof typeof LicenseCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'user',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'license';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: LicenseCategoryEnum.getDefinedSchema(),
	stripe_subscription: apiYupHelpers
		.idRef(['stripe_subscription'])
		.default(null)
		.nullable()
		.meta({ unique_key: true }),
	user: apiYupHelpers.idRef(['user']).min(1).meta({ unique_key: true }),
} as const;
type U = typeof properties;

export const licensesApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
} as const);
export type License = yup.InferType<typeof licensesApi.apiResourceJsonSchema>;
export type CreateLicenseParams = CreateParams<License, T>;
export type UpdateLicenseParams = UpdateParams<License>;
