import { User } from '../models/userProperties.js';

export type OnboardUserParams = {
	[P in
		| 'age_range'
		| 'capital_level'
		| 'investing_goals'
		| 'risk_level']: NonNullable<User[P]>;
};
export type OnboardUserResponse = {
	redirect_url: string;
};
