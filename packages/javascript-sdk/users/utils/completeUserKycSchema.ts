import * as yup from 'yup';
import { Keys, WithNonNullableKeys, getFieldSpecByFieldKey } from 'ergonomic';
import { User, usersApi } from '../models/userProperties.js';

export const completeUserKycProperties = {
	alpaca_account_identity_given_name:
		usersApi.properties.alpaca_account_identity_given_name
			.defined()
			.min(1)
			.nullable(false)
			.default(''),
	// rest...
} as const;
export const completeUserKycSchema = yup.object(completeUserKycProperties);
export const completeUserKycSchemaFieldSpecByFieldKey = getFieldSpecByFieldKey(
	completeUserKycSchema,
	Keys(completeUserKycProperties),
);

export type CompleteUserKycParams = yup.InferType<typeof completeUserKycSchema>;
export type CompleteUserKycResponse = {
	redirect_url: string;
};

export type KycUser = WithNonNullableKeys<User, keyof CompleteUserKycParams>;
export const isKycUser = (user: User): user is KycUser => {
	try {
		completeUserKycSchema.validateSync(user);
		return true;
	} catch (error) {
		return false;
	}
};
