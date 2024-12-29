import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import { useContext } from 'react';
import { useQueryUserPage } from '@wallot/react/src/features/users/hooks/useQueryUserPage';
import { getUserDisplayName, getUserDisplayNameWithFallback } from '@wallot/js';

export const useQueryLoggedInUser = () => {
	const { user } = useContext(AuthContext);

	const isUserSignedIn = user?.uid != null;

	const isUserPageQueryEnabled = isUserSignedIn;
	const userPageQueryObserver = useQueryUserPage({
		firestoreQueryOptions: {
			whereClauses: [['_id', '==', user?.uid]],
		},
		reactQueryOptions: {
			enabled: isUserPageQueryEnabled,
		},
	});
	const isUserPageDataLoaded = userPageQueryObserver.data != null;

	const loggedInUser = userPageQueryObserver.data?.documents?.[0];
	const loggedInUserDisplayName = getUserDisplayName(loggedInUser);
	const loggedInUserDisplayNameWithFallback =
		getUserDisplayNameWithFallback(loggedInUser);

	return {
		loggedInUser,
		loggedInUserDisplayName,
		loggedInUserDisplayNameWithFallback,
		isUserPageDataLoaded,
		isUserPageError: userPageQueryObserver.isError,
		isUserPageLoading: userPageQueryObserver.isLoading,
		isUserPageQueryEnabled,
		...userPageQueryObserver,
	};
};
