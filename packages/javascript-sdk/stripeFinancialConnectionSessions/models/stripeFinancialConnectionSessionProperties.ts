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

export const StripeFinancialConnectionSessionCategoryEnum = getEnum([
	'default',
]);
export type StripeFinancialConnectionSessionCategory =
	keyof typeof StripeFinancialConnectionSessionCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'user',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'stripe_financial_connection_session';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: StripeFinancialConnectionSessionCategoryEnum.getDefinedSchema(),
	user: apiYupHelpers.idRef(['user']).min(1).meta({ unique_key: false }),
} as const;
type U = typeof properties;

export const stripeFinancialConnectionSessionsApi = getApiResourceSpec<
	keyof U,
	U,
	T
>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type StripeFinancialConnectionSession = yup.InferType<
	typeof stripeFinancialConnectionSessionsApi.apiResourceJsonSchema
>;
export type CreateStripeFinancialConnectionSessionParams = CreateParams<
	StripeFinancialConnectionSession,
	T
>;
export type UpdateStripeFinancialConnectionSessionParams =
	UpdateParams<StripeFinancialConnectionSession>;
