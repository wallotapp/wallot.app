import * as yup from 'yup';
import { User } from '../models/userProperties.js';
import { alpacaAccountProperties } from './alpacaAccounts.js';
import { UserActivatedByAlpaca } from './userActivatedByAlpacaSchema.js';

export const userWithAlpacaEquityProperties = {
	alpaca_account_last_equity: alpacaAccountProperties.alpaca_account_last_equity
		.min(1)
		.nullable(false)
		.test({
			name: 'hasFunds',
			message: 'User does not have funds',
			test: (value) => {
				if (value == null) return false;
				const equity = parseFloat(value);
				if (isNaN(equity)) return false;

				return equity > 0;
			},
		}),
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
