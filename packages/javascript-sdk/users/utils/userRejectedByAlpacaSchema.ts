import * as yup from 'yup';
import { User } from '../models/userProperties.js';
import { AlpacaAccountStatusEnum } from './alpacaAccounts.js';
import { UserPendingAlpacaAccount } from './userPendingAlpacaAccountSchema.js';
import { getEnum } from 'ergonomic';

export const RejectedAlpacaAccountStatusEnum = getEnum([AlpacaAccountStatusEnum.obj.ACTION_REQUIRED, AlpacaAccountStatusEnum.obj.REJECTED, AlpacaAccountStatusEnum.obj.SUBMISSION_FAILED, AlpacaAccountStatusEnum.obj.ACCOUNT_CLOSED]);

export const userRejectedByAlpacaProperties = {
	alpaca_account_status: RejectedAlpacaAccountStatusEnum.getDefinedSchema(),
};
export const userRejectedByAlpacaSchema = yup.object(userRejectedByAlpacaProperties);
export type UserRejectedByAlpacaParams = yup.InferType<typeof userRejectedByAlpacaSchema>;

export type UserRejectedByAlpaca = UserPendingAlpacaAccount & UserRejectedByAlpacaParams;
export const isUserRejectedByAlpaca = (user: User): user is UserRejectedByAlpaca => {
	try {
		userRejectedByAlpacaSchema.validateSync(user);
		return true;
	} catch (error) {
		console.error('Error detected in isUserRejectedByAlpaca', error);
		return false;
	}
};
