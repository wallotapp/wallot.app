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
import { assetOrdersApi } from '../../assetOrders/models/assetOrderProperties.js';

export const RecommendationCategoryEnum = getEnum(['default']);
export type RecommendationCategory =
	keyof typeof RecommendationCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'best_orders',
	'model',
	'news_reports',
	'open_ai_api_request_ids',
	'user',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'recommendation';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	best_orders: YupHelpers.array(
		yup.object({
			symbol: yup.string().defined(),
			side: assetOrdersApi.properties.alpaca_order_side.defined(),
			amount: yup.string().defined(), // String number of dollars, e.g. '1000' for $1,000.00
		}),
	)
		.defined()
		.min(1),
	category: RecommendationCategoryEnum.getDefinedSchema(),
	model: apiYupHelpers.idRef(['model']).min(1).meta({ unique_key: false }),
	news_reports: apiYupHelpers.idRefs(['news_report']).min(1),
	open_ai_api_request_ids: YupHelpers.array(yup.string().defined())
		.defined()
		.min(1),
	user: apiYupHelpers.idRef(['user']).min(1).meta({ unique_key: false }),
} as const;
type U = typeof properties;

export const recommendationsApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
} as const);
export type Recommendation = yup.InferType<
	typeof recommendationsApi.apiResourceJsonSchema
>;
export type CreateRecommendationParams = CreateParams<Recommendation, T>;
export type UpdateRecommendationParams = UpdateParams<Recommendation>;
