import { useQueryUserPage } from '@wallot/react/src/features/users/hooks/useQueryUserPage';
import { useQueryCurrentAuthCredential } from '@wallot/react/src/features/authCredentials/hooks/useQueryCurrentAuthCredential';

export const useQueryCurrentUser = () => {
	const { currentAuthCredential } = useQueryCurrentAuthCredential();
	const isUserSignedIn = currentAuthCredential != null;

	const isUserPageQueryEnabled = isUserSignedIn;
	const userPageQueryObserver = useQueryUserPage({
		firestoreQueryOptions: {
			whereClauses: [['_id', '==', currentAuthCredential?.user]],
		},
		reactQueryOptions: {
			enabled: isUserPageQueryEnabled,
		},
	});
	const isUserPageDataLoaded = userPageQueryObserver.data != null;

	const currentUser = userPageQueryObserver.data?.documents?.[0];

	return {
		currentUser,
		isUserPageDataLoaded,
		isUserPageError: userPageQueryObserver.isError,
		isUserPageLoading: userPageQueryObserver.isLoading,
		isUserPageQueryEnabled,
		...userPageQueryObserver,
	};
};
