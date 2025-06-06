import * as R from 'ramda';
import * as yup from 'yup';
import {
	GeneralizedApiResourceCreateParamsRequiredFieldEnum,
	GeneralizedApiResourceProperties,
	GeneralizedFieldTypeEnum,
	CreateParams,
	UpdateParams,
	YupHelpers,
	getApiResourceSpec,
	getEnum,
	getCurrencyUsdStringFromCents,
} from 'ergonomic';
import {
	apiYupHelpers,
	idPrefixByResourceName,
} from '../../utils/apiYupHelpers.js';
import { usernameSchema } from '../utils/username.js';
import { AgeRangeEnum } from '../../utils/ageRange.js';
import { CapitalLevelEnum } from '../../utils/capitalLevel.js';
import { InvestingGoalEnum } from '../../utils/investingGoal.js';
import {
	RiskPreferenceEnum,
	riskPreferenceLabelDictionary,
} from '../../utils/riskPreference.js';
import {
	AlpacaAccountPropertyName,
	RemoveAlpacaAccountPrefix,
	alpacaAccountProperties,
} from '../utils/alpacaAccounts.js';

export const UserCategoryEnum = getEnum(['default']);
export type UserCategory = keyof typeof UserCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'firebase_auth_email',
	'username',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'user';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	age_range: AgeRangeEnum.getOptionalSchema().default(null).nullable().meta({
		label_by_enum_option: AgeRangeEnum.obj,
		label_message_user_text: 'Select your age range',
	}),
	alpaca_oauth_access_token_data: yup.string().nullable().default(null),
	alpaca_oauth_access_token_iv_hex: yup.string().nullable().default(null),
	capital_level: CapitalLevelEnum.getDefinedSchema()
		.default(null)
		.nullable()
		.label('Capital')
		.meta({
			label_by_enum_option: R.mapObjIndexed(
				(v) => getCurrencyUsdStringFromCents(Number(v)),
				CapitalLevelEnum.obj,
			),
			label_message_user_text: 'Enter the amount you would like to invest',
		}),
	category: UserCategoryEnum.getDefinedSchema(),
	default_bank_account: apiYupHelpers
		.idRef(['bank_account'])
		.default(null)
		.nullable()
		.meta({ unique_key: true }),
	firebase_auth_email: YupHelpers.emailAddress().defined().min(1),
	investing_goals: YupHelpers.array(InvestingGoalEnum.getDefinedSchema()).meta({
		label_message_user_text:
			'Tell us a bit about your goals, for example, retirement or purchasing a home',
		type: GeneralizedFieldTypeEnum.obj.select_many,
	}),
	parameters: apiYupHelpers.idRefs(['parameter']).default(null).nullable(),
	risk_preference: RiskPreferenceEnum.getDefinedSchema()
		.default(null)
		.nullable()
		.meta({
			label_by_enum_option: riskPreferenceLabelDictionary,
			label_message_user_text: 'Select a risk level you are comfortable with',
		}),
	username: usernameSchema().defined().meta({ unique_key: true }),
	...alpacaAccountProperties,
} as const;
type U = typeof properties;

export const usersApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByResourceName[_object],
	properties,
} as const);
export type User = yup.InferType<typeof usersApi.apiResourceJsonSchema>;
export type CreateUserParams = CreateParams<User, T>;
export type UpdateUserParams = UpdateParams<User>;

export type AlpacaAccount = RemoveAlpacaAccountPrefix<
	Pick<User, AlpacaAccountPropertyName>
>;
