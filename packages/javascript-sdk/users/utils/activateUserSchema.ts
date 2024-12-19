import * as yup from 'yup';
import { Keys, getFieldSpecByFieldKey } from 'ergonomic';
import { usersApi } from '../models/userProperties.js';
import { AgeRange } from '../../utils/ageRange.js';
import { CapitalLevel } from '../../utils/capitalLevel.js';

export const activateUserProperties = {
	age_range: usersApi.properties.age_range
		.defined()
		.required()
		.default('' as AgeRange),
	capital_level: usersApi.properties.capital_level
		.defined()
		.required()
		.default('' as CapitalLevel),
	investing_goals: usersApi.properties.investing_goals.defined().required(),
	risk_preference: usersApi.properties.risk_preference
		.defined()
		.required()
		.default('medium'),
} as const;
export const activateUserSchema = yup.object(activateUserProperties);
export const activateUserSchemaFieldSpecByFieldKey = getFieldSpecByFieldKey(
	activateUserSchema,
	Keys(activateUserProperties),
);

export type ActivateUserParams = yup.InferType<typeof activateUserSchema>;
export type ActivateUserResponse = {
	redirect_url: string;
};
