import * as yup from 'yup';
import { Keys, YupHelpers, getFieldSpecByFieldKey } from 'ergonomic';
import { usernameSchema } from './username.js';
import { passwordSchema } from './password.js';

export const registerUserProperties = {
	email: YupHelpers.emailAddress().required(),
	password: passwordSchema().required().default(''),
	username: usernameSchema().required().default(''),
} as const;
export const registerUserSchema = yup.object(registerUserProperties);
export const registerUserSchemaFieldSpecByFieldKey = getFieldSpecByFieldKey(registerUserSchema, Keys(registerUserProperties));

export type RegisterUserParams = yup.InferType<typeof registerUserSchema>;
export type RegisterUserResponse = {
	custom_token: string;
	redirect_url: string;
};
