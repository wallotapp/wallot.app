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
	idPrefixByCollection,
} from '../../utils/apiYupHelpers.js';
import { isUsername } from '../utils/username.js';

export const UserCategoryEnum = getEnum(['default']);
export type UserCategory = keyof typeof UserCategoryEnum.obj;

const createParamsRequiredFieldEnum = getEnum([
	...GeneralizedApiResourceCreateParamsRequiredFieldEnum.arr,
	'stripe_customer',
	'username',
] as const);
type T = keyof typeof createParamsRequiredFieldEnum.obj;

const _object = 'user';
const properties = {
	...GeneralizedApiResourceProperties,
	_id: apiYupHelpers.id(_object),
	_object: YupHelpers.constant(_object),
	alpaca_account: apiYupHelpers
		.idRef(['alpaca_account'])
		.default(null)
		.nullable()
		.meta({ unique_key: true }),
	category: UserCategoryEnum.getDefinedSchema(),
	parameters: apiYupHelpers.idRefs(['parameter']).default(null).nullable(),
	stripe_customer: apiYupHelpers
		.idRef(['stripe_customer'])
		.min(1)
		.meta({ unique_key: true }),
	username: yup
		.string()
		.test({
			message: '${path} is not a valid username',
			name: 'isUsername',
			test: isUsername,
		})
		.meta({ type: GeneralizedFieldTypeEnum.obj.short_text, unique_key: true }),
} as const;
type U = typeof properties;

export const usersApi = getApiResourceSpec<keyof U, U, T>({
	createParamsRequiredFieldEnum,
	idPrefix: idPrefixByCollection[_object],
	properties,
} as const);
export type User = yup.InferType<typeof usersApi.apiResourceJsonSchema>;
export type CreateUserParams = CreateParams<User, T>;
export type UpdateUserParams = UpdateParams<User>;
