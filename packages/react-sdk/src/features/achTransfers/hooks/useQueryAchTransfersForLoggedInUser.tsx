import { useQueryBankAccountsForLoggedInUser } from '@wallot/react/src/features/bankAccounts/hooks/useQueryBankAccountsForLoggedInUser';
import { useQueryAchTransferPage } from '@wallot/react/src/features/achTransfers/hooks/useQueryAchTransferPage';

export function useQueryAchTransfersForLoggedInUser() {
	const {
		resourcesForLoggedInUser: bankAccountsForLoggedInUser,
		isResourcePageLoading: isBankAccountPageLoading,
	} = useQueryBankAccountsForLoggedInUser();

	const isAchTransferPageQueryEnabled = !isBankAccountPageLoading;
	const bankAccountIds = bankAccountsForLoggedInUser.map(({ _id }) => _id);
	const achTransferPageObserver = useQueryAchTransferPage({
		firestoreQueryOptions: {
			whereClauses: [['bank_account', 'in', bankAccountIds]],
		},
		reactQueryOptions: {
			enabled: isAchTransferPageQueryEnabled,
		},
	});
	const achTransfersForLoggedInUser =
		achTransferPageObserver.data?.documents ?? [];

	return {
		achTransfersForLoggedInUser,
		isAchTransfersForLoggedInUserError: achTransferPageObserver.isError,
		isAchTransfersForLoggedInUserLoading:
			isBankAccountPageLoading ||
			!isAchTransferPageQueryEnabled ||
			achTransferPageObserver.isLoading,
		isAchTransferForLoggedInUserQueryEnabled: isAchTransferPageQueryEnabled,
		...achTransferPageObserver,
	};
}
