import * as R from 'ramda';
import * as yup from 'yup';
import {
	GeneralizedApiResourceCreateParamsRequiredFieldEnum,
	GeneralizedApiResourceProperties,
	CreateParams,
	UpdateParams,
	YupHelpers,
	getApiResourceSpec,
	getEnum,
	GeneralizedFieldTypeEnum,
} from 'ergonomic';
import {
	apiYupHelpers,
	idPrefixByResourceName,
} from '../../utils/apiYupHelpers.js';
import { scholarshipApplicationFormDataPropertiesBySection } from '../utils/scholarshipApplicationFormDataProperties.js';

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
	open_house_rsvps: YupHelpers.array(yup.string().defined()).defined(),
	reminder_emails_sent_for_application_completion: YupHelpers.integer(),
	status:
		ScholarshipApplicationStatusEnum.getDefinedSchema().default('in_progress'),
	enable_research_application: yup
		.mixed()
		.oneOf([true, false, null, ''])
		.default(null)
		.optional()
		.meta({ type: GeneralizedFieldTypeEnum.obj.boolean }),
	user: apiYupHelpers.idRef(['user']).min(1).meta({ unique_key: true }),
	...R.pick(
		['high_school'],
		scholarshipApplicationFormDataPropertiesBySection['Contact Details'],
	),
	...scholarshipApplicationFormDataPropertiesBySection['College Information'],
	...scholarshipApplicationFormDataPropertiesBySection['Student Profile'],
	...scholarshipApplicationFormDataPropertiesBySection['Personal Essays'],
	...scholarshipApplicationFormDataPropertiesBySection['Summer Research'],
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
