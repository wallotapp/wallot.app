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
import { usernameSchema } from '../utils/username.js';
import { AgeRangeEnum } from '../../utils/ageRange.js'; // Select one
import { CapitalLevelEnum } from '../../utils/capitalLevel.js'; // Select one
import { InvestingGoalEnum } from '../../utils/investingGoal.js'; // Select many
import { RiskPreferenceEnum } from '../../utils/riskPreference.js'; // Select one

export const UserCategoryEnum = getEnum(['default']);
export type UserCategory = keyof typeof UserCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'activation_reminder_task_id',
	'stripe_customer',
	'username',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'user';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	activation_reminder_task_id: yup.string().min(1).meta({
		unique_key: true,
	}),
	age_range: AgeRangeEnum.getOptionalSchema().default(null).nullable(),
	alpaca_account: apiYupHelpers
		.idRef(['alpaca_account'])
		.default(null)
		.nullable()
		.meta({ unique_key: true }),
	capital_level: CapitalLevelEnum.getDefinedSchema().default(null).nullable(),
	category: UserCategoryEnum.getDefinedSchema(),
	investing_goals: YupHelpers.array(InvestingGoalEnum.getDefinedSchema()),
	parameters: apiYupHelpers.idRefs(['parameter']).default(null).nullable(),
	risk_preference: RiskPreferenceEnum.getDefinedSchema()
		.default(null)
		.nullable(),
	stripe_customer: apiYupHelpers
		.idRef(['stripe_customer'])
		.min(1)
		.meta({ unique_key: true }),
	username: usernameSchema(),
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
