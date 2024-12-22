import * as yup from 'yup';
import { User } from '../models/userProperties.js';
import { AlpacaAccountStatusEnum } from './alpacaAccounts.js';
import { UserPendingAlpacaAccount } from './userPendingAlpacaAccountSchema.js';
import { YupHelpers } from 'ergonomic';

export const userWithActiveAlpacaAccountProperties = {
	alpaca_account_status: YupHelpers.constant(
		AlpacaAccountStatusEnum.obj.ACTIVE,
	),
};
export const userWithActiveAlpacaAccountSchema = yup.object(
	userWithActiveAlpacaAccountProperties,
);
export type UserWithActiveAlpacaAccountParams = yup.InferType<
	typeof userWithActiveAlpacaAccountSchema
>;

export type UserWithActiveAlpacaAccount = UserPendingAlpacaAccount &
	UserWithActiveAlpacaAccountParams;
export const isUserWithActiveAlpacaAccount = (
	user: User,
): user is UserWithActiveAlpacaAccount => {
	try {
		userWithActiveAlpacaAccountSchema.validateSync(user);
		return true;
	} catch (error) {
		console.error('Error detected in isUserWithActiveAlpacaAccount', error);
		return false;
	}
};
