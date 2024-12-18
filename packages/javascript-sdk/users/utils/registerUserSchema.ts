import * as yup from 'yup';
import { Keys, YupHelpers, getFieldSpecByFieldKey } from 'ergonomic';
import { usernameSchema } from './username.js';
import { passwordSchema } from './password.js';

export const registerUserProperties = {
	email: YupHelpers.emailAddress().required(),
	password: passwordSchema().required(),
	username: usernameSchema().required(),
} as const;
export const registerUserSchema = yup.object(registerUserProperties);
export const registerUserSchemaFieldSpecByFieldKey = getFieldSpecByFieldKey(
	registerUserSchema,
	Keys(registerUserProperties),
);

export type RegisterUserParams = yup.InferType<typeof registerUserSchema>;
/**
 * Response from registering a user
 * 
 * The custom token is used to authenticate the user
 * 
 * The redirect URL is where the user should be redirected to after registering
 */
export type RegisterUserResponse = {
	custom_token: string;
	redirect_url: string;
};
