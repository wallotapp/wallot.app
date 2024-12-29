import { useQueryBankAccountPage } from '@wallot/react/src/features/bankAccounts/hooks/useQueryBankAccountPage';
import { useQueryLoggedInUser } from '@wallot/react/src/features/users/hooks/useQueryLoggedInUser';

export const useQueryBankAccountsForLoggedInUser = () => {
	const { loggedInUser } = useQueryLoggedInUser();
	const isUserSignedIn = loggedInUser != null;
	const isBankAccountPageQueryEnabled = isUserSignedIn;
	const bankAccountPageQueryObserver = useQueryBankAccountPage({
		firestoreQueryOptions: {
			whereClauses: [['user', '==', loggedInUser?._id]],
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
