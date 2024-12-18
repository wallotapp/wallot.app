import * as yup from 'yup';
import { YupHelpers, GeneralizedFieldTypeEnum } from 'ergonomic';
import { usersApi } from '../models/index.js';
import { isPassword } from '../utils/password.js';

export const registerUserSchema = yup.object().shape({
	email: YupHelpers.emailAddress(),
	password: yup
		.string()
		.min(8)
		.required()
		.test({
			message: '${path} is not a valid password',
			name: 'isPassword',
			test: isPassword,
		})
		.meta({ type: GeneralizedFieldTypeEnum.obj.sensitive_text }),
	username: usersApi.properties.username,
});

export type RegisterUserParams = yup.InferType<typeof registerUserSchema>;
export type RegisterUserResponse = {
	custom_token: string;
	redirect_url: string;
};
