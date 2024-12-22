import * as yup from 'yup';
import { User } from '../models/userProperties.js';
import { alpacaAccountProperties } from './alpacaAccounts.js';
import { KycUser } from './completeUserKycSchema';

export const userPendingAlpacaAccountProperties = {
	alpaca_account_account_number:
		alpacaAccountProperties.alpaca_account_account_number
			.min(1)
			.nullable(false),
	alpaca_account_id: alpacaAccountProperties.alpaca_account_id
		.min(1)
		.nullable(false),
	alpaca_account_status: alpacaAccountProperties.alpaca_account_status
		.min(1)
		.nullable(false),
};
export const userPendingAlpacaAccountSchema = yup.object(
	userPendingAlpacaAccountProperties,
);
export type UserPendingAlpacaAccountParams = yup.InferType<
	typeof userPendingAlpacaAccountSchema
>;

export type UserPendingAlpacaAccount = KycUser & UserPendingAlpacaAccountParams;
export const isUserPendingAlpacaAccount = (
	user: User,
): user is UserPendingAlpacaAccount => {
	try {
		userPendingAlpacaAccountSchema.validateSync(user);
		return true;
	} catch (error) {
		return false;
	}
};
