import { useQueryBankAccountPage } from '@wallot/react/src/features/bankAccounts/hooks/useQueryBankAccountPage';
import { useQueryCurrentUser } from '../../users';

export const useQueryBankAccountsForLoggedInUser = () => {
	const { currentUser } = useQueryCurrentUser();
	const isUserSignedIn = currentUser != null;
	const isBankAccountPageQueryEnabled = isUserSignedIn;
	const bankAccountPageQueryObserver = useQueryBankAccountPage({
		firestoreQueryOptions: {
			whereClauses: [['user', '==', currentUser?._id]],
		},
		reactQueryOptions: {
			enabled: isBankAccountPageQueryEnabled,
		},
	});
	const isBankAccountPageDataLoaded = bankAccountPageQueryObserver.data != null;

	const bankAccountsForLoggedInUser =
		bankAccountPageQueryObserver.data?.documents ?? [];

	return {
		bankAccountsForLoggedInUser,
		isBankAccountPageDataLoaded,
		isBankAccountPageError: bankAccountPageQueryObserver.isError,
		isBankAccountPageLoading: bankAccountPageQueryObserver.isLoading,
		isBankAccountPageQueryEnabled,
		...bankAccountPageQueryObserver,
	};
};
