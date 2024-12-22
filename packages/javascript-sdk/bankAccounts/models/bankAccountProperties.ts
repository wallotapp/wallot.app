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
import {
	alpacaAchRelationshipProperties,
	AlpacaAchRelationshipPropertyName,
	RemoveAlpacaAchRelationshipPrefix,
} from '../utils/alpacaAchRelationships.js';

export const BankAccountCategoryEnum = getEnum(['default']);
export type BankAccountCategory = keyof typeof BankAccountCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'stripe_financial_connections_account_id',
	'stripe_payment_method_id',
	'user',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'bank_account';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	category: BankAccountCategoryEnum.getDefinedSchema(),
	stripe_financial_connections_account_id: yup.string().defined().min(1).meta({
		unique_key: true,
		type: GeneralizedFieldTypeEnum.obj.short_text,
	}),
	stripe_payment_method_id: yup.string().defined().min(1).meta({
		unique_key: true,
		type: GeneralizedFieldTypeEnum.obj.short_text,
	}),
	user: apiYupHelpers.idRef(['user']).min(1).meta({ unique_key: false }),
	...alpacaAchRelationshipProperties,
} as const;
type U = typeof properties;

export const bankAccountsApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
} as const);
export type BankAccount = yup.InferType<
	typeof bankAccountsApi.apiResourceJsonSchema
>;
export type CreateBankAccountParams = CreateParams<BankAccount, T>;
export type UpdateBankAccountParams = UpdateParams<BankAccount>;

export type AlpacaAchRelationship = RemoveAlpacaAchRelationshipPrefix<
	Pick<BankAccount, AlpacaAchRelationshipPropertyName>
>;
