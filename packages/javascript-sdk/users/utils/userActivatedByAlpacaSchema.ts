import * as yup from 'yup';
import { User } from '../models/userProperties.js';
import { AlpacaAccountStatusEnum } from './alpacaAccounts.js';
import { UserPendingAlpacaAccount } from './userPendingAlpacaAccountSchema.js';
import { YupHelpers } from 'ergonomic';

export const userActivatedByAlpacaProperties = {
	alpaca_account_status: YupHelpers.constant(AlpacaAccountStatusEnum.obj.ACTIVE),
};
export const userActivatedByAlpacaSchema = yup.object(userActivatedByAlpacaProperties);
export type UserActivatedByAlpacaParams = yup.InferType<typeof userActivatedByAlpacaSchema>;

export type UserActivatedByAlpaca = UserPendingAlpacaAccount & UserActivatedByAlpacaParams;
export const isUserActivatedByAlpaca = (user: User): user is UserActivatedByAlpaca => {
	try {
		userActivatedByAlpacaSchema.validateSync(user);
		return true;
	} catch (error) {
		console.error('Error detected in isUserActivatedByAlpaca', error);
		return false;
	}
};
