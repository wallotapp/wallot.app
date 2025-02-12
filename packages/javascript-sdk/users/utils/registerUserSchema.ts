import * as yup from 'yup';
import { Keys, YupHelpers, getFieldSpecByFieldKey } from 'ergonomic';
import { usernameSchema } from './username.js';
import { passwordSchema } from './password.js';

export const registerUserProperties = {
	email: YupHelpers.emailAddress().required(),
	password: passwordSchema().required().default(''),
	redirect_uri: YupHelpers.url().nullable().default(null),
	username: usernameSchema().required().default('').lowercase(),
} as const;
export const registerUserSchema = yup.object(registerUserProperties);
export const registerUserSchemaFieldSpecByFieldKey = getFieldSpecByFieldKey(
	registerUserSchema,
	Keys(registerUserProperties),
);

export type RegisterUserParams = yup.InferType<typeof registerUserSchema>;
export type RegisterUserResponse = {
	custom_token: string;
	redirect_uri: string;
};
