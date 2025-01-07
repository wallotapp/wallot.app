import * as yup from 'yup';
import { User } from '../models/userProperties.js';
import { alpacaAccountProperties } from './alpacaAccounts.js';
import { UserActivatedByAlpaca } from './userActivatedByAlpacaSchema.js';

export const userWithAlpacaEquityProperties = {
	alpaca_account_last_equity: alpacaAccountProperties.alpaca_account_last_equity
		.optional()
		.nullable(true)
		.default(null), // <= changing to a no-op for now
};
export const userWithAlpacaEquitySchema = yup.object(
	userWithAlpacaEquityProperties,
);
export type UserWithAlpacaEquityParams = yup.InferType<
	typeof userWithAlpacaEquitySchema
>;

export type UserWithAlpacaEquity = UserActivatedByAlpaca &
	UserWithAlpacaEquityParams;
export const isUserWithAlpacaEquity = (
	user: User,
): user is UserWithAlpacaEquity => {
	try {
		userWithAlpacaEquitySchema.validateSync(user);
		return true;
	} catch (error) {
		console.error('Error detected in isUserWithAlpacaEquity', error);
		return false;
	}
};

export const isUserWithAlpacaEquityParams = (
	params: unknown,
): params is UserWithAlpacaEquityParams => {
	try {
		userWithAlpacaEquitySchema.validateSync(params);
		return true;
	} catch (error) {
		console.error('Error detected in isUserWithAlpacaEquityParams', error);
		return false;
	}
};
