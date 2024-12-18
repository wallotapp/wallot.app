import * as yup from 'yup';
import { YupHelpers } from 'ergonomic';
import { usersApi } from '../models/index.js';

const { properties } = usersApi;

export const registerUserSchema = yup.object().shape({
	email: YupHelpers.emailAddress(),
	password: yup.string().min(6).required().meta({ pii: true }),
	username: properties.username,
});

export type RegisterUserParams = yup.InferType<typeof registerUserSchema>;
export type RegisterUserResponse = {
	custom_token: string;
	redirect_url: string;
};
