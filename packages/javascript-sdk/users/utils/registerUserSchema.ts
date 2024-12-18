import * as yup from 'yup';
import { YupHelpers } from 'ergonomic';
import { usernameSchema } from './username.js';
import { passwordSchema } from './password.js';

export const registerUserSchema = yup.object({
	email: YupHelpers.emailAddress().required(),
	password: passwordSchema().required(),
	username: usernameSchema().required(),
} as const);

export type RegisterUserParams = yup.InferType<typeof registerUserSchema>;
export type RegisterUserResponse = {
	custom_token: string;
	redirect_url: string;
};
