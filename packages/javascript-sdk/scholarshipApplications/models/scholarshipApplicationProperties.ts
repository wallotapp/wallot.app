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

export const ScholarshipApplicationDecisionEnum = getEnum([
	'accepted',
	'rejected',
	'waitlisted',
]);
export type ScholarshipApplicationDecision =
	keyof typeof ScholarshipApplicationDecisionEnum.obj;

export const ScholarshipApplicationStatusEnum = getEnum([
	'in_progress',
	'submitted',
	'reviewed',
]);
export type ScholarshipApplicationStatus =
	keyof typeof ScholarshipApplicationStatusEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'user',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'scholarship_application';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: ScholarshipApplicationCategoryEnum.getDefinedSchema(),
	decision: ScholarshipApplicationDecisionEnum.getOptionalSchema()
		.nullable()
		.default(null),
	status:
		ScholarshipApplicationStatusEnum.getDefinedSchema().default('in_progress'),
	user: apiYupHelpers.idRef(['user']).min(1).meta({ unique_key: true }),
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
