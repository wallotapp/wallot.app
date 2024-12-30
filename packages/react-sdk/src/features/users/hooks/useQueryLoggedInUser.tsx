import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import { useContext } from 'react';
import { getCurrencyUsdStringFromCents } from 'ergonomic';
import { useQueryUserPage } from '@wallot/react/src/features/users/hooks/useQueryUserPage';
import { getUserDisplayName, getUserDisplayNameWithFallback } from '@wallot/js';

export function useQueryLoggedInUser() {
	const { user } = useContext(AuthContext);

	const isUserSignedIn = user?.uid != null;

	const isLoggedInUserQueryEnabled = isUserSignedIn;
	const loggedInUserQueryObserver = useQueryUserPage({
		firestoreQueryOptions: {
			whereClauses: [['_id', '==', user?.uid]],
		},
		reactQueryOptions: {
			enabled: isLoggedInUserQueryEnabled,
		},
	});

	const loggedInUser = loggedInUserQueryObserver.data?.documents?.[0];
	const loggedInUserDisplayName = getUserDisplayName(loggedInUser);
	const loggedInUserDisplayNameWithFallback =
		getUserDisplayNameWithFallback(loggedInUser);
	const loggedInUserEquityBalance =
		loggedInUser?.alpaca_account_last_equity ?? '0';
	const loggedInUserEquityBalanceCents =
		parseFloat(loggedInUserEquityBalance) * 100;
	const loggedInUserEquityBalanceUsdString = getCurrencyUsdStringFromCents(
		loggedInUserEquityBalanceCents,
	);

	return {
		loggedInUser,
		loggedInUserDisplayName,
		loggedInUserDisplayNameWithFallback,
		loggedInUserEquityBalanceCents,
		loggedInUserEquityBalanceUsdString,
		isLoggedInUserError: loggedInUserQueryObserver.isError,
		isLoggedInUserLoading:
			!isLoggedInUserQueryEnabled || loggedInUserQueryObserver.isLoading,
		isLoggedInUserQueryEnabled,
		...loggedInUserQueryObserver,
	};
}
