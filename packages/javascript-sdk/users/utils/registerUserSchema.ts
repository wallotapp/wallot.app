import * as R from 'ramda';
import * as yup from 'yup';
import { Keys, YupHelpers, getFieldSpecByFieldKey } from 'ergonomic';
import { usernameSchema } from './username.js';
import { passwordSchema } from './password.js';

export const registerUserProperties = {
	email: YupHelpers.emailAddress().required().trim().lowercase(),
	password: passwordSchema().required().default(''),
	redirect_uri: YupHelpers.url().nullable().default(null),
	username: usernameSchema().required().default('').trim().lowercase(),
} as const;
export const registerUserSchema = yup.object(registerUserProperties);
export const registerUserFormDataProperties = R.omit(
	['redirect_uri'],
	registerUserProperties,
);
export const registerUserFormDataSchema = yup.object(
	registerUserFormDataProperties,
);
export const registerUserFormDataSchemaFieldSpecByFieldKey =
	getFieldSpecByFieldKey(
		registerUserFormDataSchema,
		Keys(registerUserFormDataProperties),
	);

export type RegisterUserParams = yup.InferType<typeof registerUserSchema>;
export type RegisterUserResponse = {
	custom_token: string;
	redirect_uri: string;
};
