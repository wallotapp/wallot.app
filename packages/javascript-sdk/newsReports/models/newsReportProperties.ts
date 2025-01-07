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

export const NewsReportCategoryEnum = getEnum([
	'company_specific_financial_releases',
	'mergers_acquisitions_and_corporate_restructuring',
	'regulatory_and_legal_developments',
	'changes_in_executive_leadership_or_governance',
	'macroeconomic_indicators_and_policy_announcements',
	'geopolitical_events_and_crises',
	'industry_specific_innovations_and_disruptions',
	'credit_ratings_and_analyst_reports',
]);
export type NewsReportCategory = keyof typeof NewsReportCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'news_report';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: NewsReportCategoryEnum.getDefinedSchema(),
	// Add more properties here
} as const;
type U = typeof properties;

export const newsReportsApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
} as const);
export type NewsReport = yup.InferType<
	typeof newsReportsApi.apiResourceJsonSchema
>;
export type CreateNewsReportParams = CreateParams<NewsReport, T>;
export type UpdateNewsReportParams = UpdateParams<NewsReport>;
