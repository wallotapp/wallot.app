import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import { useContext } from 'react';
import { useQueryUserPage } from '@wallot/react/src/features/users/hooks/useQueryUserPage';
import { getUserDisplayName, getUserDisplayNameWithFallback } from '@wallot/js';

export const useQueryLoggedInUser = () => {
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

	return {
		loggedInUser,
		loggedInUserDisplayName,
		loggedInUserDisplayNameWithFallback,
		isLoggedInUserError: loggedInUserQueryObserver.isError,
		isLoggedInUserLoading:
			!isLoggedInUserQueryEnabled || loggedInUserQueryObserver.isLoading,
		isLoggedInUserQueryEnabled,
		...loggedInUserQueryObserver,
	};
};
