import * as yup from 'yup';
import { YupHelpers } from 'ergonomic';
import { usernameSchema } from '../utils/username.js';
import { passwordSchema } from '../utils/password.js';

export const registerUserSchema = yup.object().shape({
	email: YupHelpers.emailAddress(),
	password: passwordSchema(),
	username: usernameSchema(),
});

export type RegisterUserParams = yup.InferType<typeof registerUserSchema>;
export type RegisterUserResponse = {
	custom_token: string;
	redirect_url: string;
};
