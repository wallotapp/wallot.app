import { User } from '../models/userProperties.js';

export const getUserDisplayName = (user: User | null | undefined) => {
	if (user == null) {
		return '';
	}

	return user.alpaca_account_identity?.given_name ?? user.username ?? '';
};

export const getUserDisplayNameWithFallback = (
	user: User | null | undefined,
	fallback = 'User',
) => getUserDisplayName(user) || fallback;
