import * as yup from 'yup';
import { GeneralizedFieldTypeEnum } from 'ergonomic';

export const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*\-+?_=])[A-Za-z\d!@#$%^&*\-+?_=]{8,}$/;
export const isPassword = (password: unknown): password is string => typeof password === 'string' && password.match(passwordRegex) !== null && password.length <= 40;
export const passwordRules = [
	'at least 8 characters long',
	'at most 40 characters long',
	'contain at least one uppercase letter',
	'contain at least one lowercase letter',
	'contain at least one number',
	'contain at least one special character (!@#$%^&*-+?_=)',
];

export const passwordSchema = () =>
	yup
		.string()
		.min(8)
		.max(40)
		.test({
			message: '${path} is not a valid password',
			name: 'isPassword',
			test: isPassword,
		})
		.meta({ type: GeneralizedFieldTypeEnum.obj.sensitive_text });
