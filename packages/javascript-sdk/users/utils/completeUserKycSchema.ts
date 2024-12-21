import * as yup from 'yup';
import { Keys, getFieldSpecByFieldKey } from 'ergonomic';
import { ActivatedUser } from './activateUserSchema.js';
import { User, usersApi } from '../models/userProperties.js';

export const completeUserKycProperties = {
	alpaca_account_identity_given_name:
		usersApi.properties.alpaca_account_identity_given_name
			.defined()
			.min(1)
			.nullable(false)
			.default(''),
	// rest of alpaca...
	default_bank_account: usersApi.properties.default_bank_account
		.min(1)
		.nullable(false)
		.default(''),
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

export type KycUser = ActivatedUser & CompleteUserKycParams;
export const isKycUser = (user: User): user is KycUser => {
	try {
		completeUserKycSchema.validateSync(user);
		return true;
	} catch (error) {
		return false;
	}
};
