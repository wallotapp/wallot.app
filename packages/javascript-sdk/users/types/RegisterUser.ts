import * as yup from 'yup';
import { GeneralizedFieldTypeEnum, YupHelpers } from 'ergonomic';
import { usernameSchema } from '../utils/username.js';
import { passwordSchema } from '../utils/password.js';

export const registerUserSchema = yup.object().shape({
	email: YupHelpers.emailAddress().required(),
	password: passwordSchema()
		.required()
		.meta({ type: GeneralizedFieldTypeEnum.obj.sensitive_text }),
	username: usernameSchema().required(),
});

export type RegisterUserParams = yup.InferType<typeof registerUserSchema>;
export type RegisterUserResponse = {
	custom_token: string;
	redirect_url: string;
};
