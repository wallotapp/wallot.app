import * as yup from 'yup';
import { GeneralizedFieldTypeEnum } from 'ergonomic';

export const usernameRegex = /^(?![0-9]+$)(?!_+$)[a-z0-9_]{3,}$/;
export const isUsername = (username: unknown): username is string =>
	typeof username === 'string' && username.match(usernameRegex) !== null;
export const usernameRules = [
	'at least three characters',
	'lowercase letters, numbers or underscores',
	"can't be only numbers",
	"can't be only underscores",
];

export const usernameSchema = () =>
	yup
		.string()
		.min(1)
		.test({
			message: '${path} is not a valid username',
			name: 'isUsername',
			test: isUsername,
		})
		.meta({ type: GeneralizedFieldTypeEnum.obj.short_text, unique_key: true });
