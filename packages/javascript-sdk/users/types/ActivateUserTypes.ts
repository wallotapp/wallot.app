import { User } from '../models/userProperties.js';

export type ActivateUserParams = {
	[P in
		| 'age_range'
		| 'capital_level'
		| 'investing_goals'
		| 'risk_level']: NonNullable<User[P]>;
};
export type ActivateUserResponse = {
	redirect_url: string;
};
