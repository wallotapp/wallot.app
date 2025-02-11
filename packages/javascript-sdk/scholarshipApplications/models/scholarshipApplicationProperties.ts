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

export const ScholarshipApplicationCategoryEnum = getEnum(['default']);
export type ScholarshipApplicationCategory =
	keyof typeof ScholarshipApplicationCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'scholarship_application';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: ScholarshipApplicationCategoryEnum.getDefinedSchema(),
	// Add more properties here
} as const;
type U = typeof properties;

export const scholarshipApplicationsApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
} as const);
export type ScholarshipApplication = yup.InferType<
	typeof scholarshipApplicationsApi.apiResourceJsonSchema
>;
export type CreateScholarshipApplicationParams = CreateParams<
	ScholarshipApplication,
	T
>;
export type UpdateScholarshipApplicationParams =
	UpdateParams<ScholarshipApplication>;
