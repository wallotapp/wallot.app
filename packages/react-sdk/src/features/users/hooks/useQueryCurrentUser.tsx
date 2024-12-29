import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import { useContext } from 'react';
import { useQueryUserPage } from '@wallot/react/src/features/users/hooks/useQueryUserPage';
import { getUserDisplayName, getUserDisplayNameWithFallback } from '@wallot/js';

export const useQueryCurrentUser = () => {
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

	const currentUser = userPageQueryObserver.data?.documents?.[0];
	const currentUserDisplayName = getUserDisplayName(currentUser);
	const currentUserDisplayNameWithFallback =
		getUserDisplayNameWithFallback(currentUser);

	return {
		currentUser,
		currentUserDisplayName,
		currentUserDisplayNameWithFallback,
		isUserPageDataLoaded,
		isUserPageError: userPageQueryObserver.isError,
		isUserPageLoading: userPageQueryObserver.isLoading,
		isUserPageQueryEnabled,
		...userPageQueryObserver,
	};
};
