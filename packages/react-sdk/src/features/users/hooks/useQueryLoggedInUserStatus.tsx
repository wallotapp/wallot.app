import { UserExperienceState } from '@wallot/js';
import { useQueryLoggedInUser } from '@wallot/react/src/features/users/hooks/useQueryLoggedInUser';
import { useQueryBankAccountsForLoggedInUser } from '@wallot/react/src/features/bankAccounts/hooks/useQueryBankAccountsForLoggedInUser';
import { useQueryLicensesForLoggedInUser } from '@wallot/react/src/features/licenses/hooks/useQueryLicensesForLoggedInUser';
import { useQueryOrdersForLoggedInUser } from '@wallot/react/src/features/orders/hooks/useQueryOrdersForLoggedInUser';
import { useQueryPositionsForLoggedInUser } from '@wallot/react/src/features/positions/hooks/useQueryPositionsForLoggedInUser';
import { useQueryRecommendationsForLoggedInUser } from '@wallot/react/src/features/recommendations/hooks/useQueryRecommendationsForLoggedInUser';

export type LoggedInUserStatus = {
	isLoggedInUserStatusLoading: boolean;
	state: UserExperienceState | null;
	tasks:
		| {
				ctaHref: string;
				ctaText: string;
				subtitle: string;
				title: string;
		  }[]
		| null;
};

export const useQueryLoggedInUserStatus = (): LoggedInUserStatus => {
	const { loggedInUser, isLoggedInUserLoading } = useQueryLoggedInUser();
	const {
		resourcesForLoggedInUser: bankAccountsForLoggedInUserUnsorted,
		isResourcePageLoading: isBankAccountPageLoading,
	} = useQueryBankAccountsForLoggedInUser();
	const {
		resourcesForLoggedInUser: licensesForLoggedInUserUnsorted,
		isResourcePageLoading: isLicensePageLoading,
	} = useQueryLicensesForLoggedInUser();
	const {
		resourcesForLoggedInUser: ordersForLoggedInUserUnsorted,
		isResourcePageLoading: isOrderPageLoading,
	} = useQueryOrdersForLoggedInUser();
	const {
		resourcesForLoggedInUser: positionsForLoggedInUserUnsorted,
		isResourcePageLoading: isPositionPageLoading,
	} = useQueryPositionsForLoggedInUser();
	const {
		resourcesForLoggedInUser: recommendationsForLoggedInUserUnsorted,
		isResourcePageLoading: isRecommendationPageLoading,
	} = useQueryRecommendationsForLoggedInUser();
	return {
		isLoggedInUserStatusLoading: true,
		state: null,
		tasks: [],
	};
};
