import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import { useContext } from 'react';
import { useQueryAuthCredentialPage } from '@wallot/react/src/features/authCredentials/hooks/useQueryAuthCredentialPage';

export const useQueryCurrentAuthCredential = () => {
	const { user } = useContext(AuthContext);

	const isUserSignedIn = user?.uid != null;

	const isAuthCredentialPageQueryEnabled = isUserSignedIn;
	const authCredentialPageQueryObserver = useQueryAuthCredentialPage({
		firestoreQueryOptions: {
			whereClauses: [['_id', '==', user?.uid]],
		},
		reactQueryOptions: {
			enabled: isAuthCredentialPageQueryEnabled,
		},
	});
	const isAuthCredentialPageDataLoaded =
		authCredentialPageQueryObserver.data != null;

	const currentAuthCredential =
		authCredentialPageQueryObserver.data?.documents?.[0];

	return {
		currentAuthCredential,
		isAuthCredentialPageDataLoaded,
		isAuthCredentialPageError: authCredentialPageQueryObserver.isError,
		isAuthCredentialPageLoading: authCredentialPageQueryObserver.isLoading,
		isAuthCredentialPageQueryEnabled,
		...authCredentialPageQueryObserver,
	};
};
