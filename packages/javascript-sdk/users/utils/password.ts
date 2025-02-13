import * as yup from 'yup';
import { GeneralizedFieldTypeEnum } from 'ergonomic';

const specialCharacters = '!@#$%^&*-+?_=';
export const isPassword = (password: unknown): password is string => {
	return (
		typeof password === 'string' &&
		password.length >= 7 &&
		password.length <= 40 &&
		password.split('').some((char) => specialCharacters.includes(char))
	);
};
export const passwordRules = [
	'at least 7 characters long',
	'at most 40 characters long',
	`contain at least one special character (${specialCharacters})`,
];

export const passwordSchema = () =>
	yup
		.string()
		.min(7)
		.max(40)
		.test({
			message: '${path} is not a valid password',
			name: 'isPassword',
			test: isPassword,
		})
		.meta({ type: GeneralizedFieldTypeEnum.obj.sensitive_text });
