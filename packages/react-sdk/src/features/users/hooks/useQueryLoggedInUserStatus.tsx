import {
	BankAccount,
	License,
	Order,
	Position,
	Recommendation,
	User,
	UserExperienceState,
} from '@wallot/js';
import { useQueryLoggedInUser } from '@wallot/react/src/features/users/hooks/useQueryLoggedInUser';
import { useQueryBankAccountsForLoggedInUser } from '@wallot/react/src/features/bankAccounts/hooks/useQueryBankAccountsForLoggedInUser';
import { useQueryLicensesForLoggedInUser } from '@wallot/react/src/features/licenses/hooks/useQueryLicensesForLoggedInUser';
import { useQueryOrdersForLoggedInUser } from '@wallot/react/src/features/orders/hooks/useQueryOrdersForLoggedInUser';
import { useQueryPositionsForLoggedInUser } from '@wallot/react/src/features/positions/hooks/useQueryPositionsForLoggedInUser';
import { useQueryRecommendationsForLoggedInUser } from '@wallot/react/src/features/recommendations/hooks/useQueryRecommendationsForLoggedInUser';

export type LoggedInUserStatus = {
	isLoggedInUserStatusLoading: boolean;
	state: UserExperienceState;
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
		resourcesForLoggedInUser: bankAccountsForLoggedInUser,
		isResourcePageLoading: isBankAccountPageLoading,
	} = useQueryBankAccountsForLoggedInUser();
	const {
		resourcesForLoggedInUser: licensesForLoggedInUser,
		isResourcePageLoading: isLicensePageLoading,
	} = useQueryLicensesForLoggedInUser();
	const {
		resourcesForLoggedInUser: ordersForLoggedInUser,
		isResourcePageLoading: isOrderPageLoading,
	} = useQueryOrdersForLoggedInUser();
	const {
		resourcesForLoggedInUser: positionsForLoggedInUser,
		isResourcePageLoading: isPositionPageLoading,
	} = useQueryPositionsForLoggedInUser();
	const {
		resourcesForLoggedInUser: recommendationsForLoggedInUser,
		isResourcePageLoading: isRecommendationPageLoading,
	} = useQueryRecommendationsForLoggedInUser();

	return getLoggedInUserStatus({
		loggedInUser,
		isLoggedInUserLoading,
		bankAccountsForLoggedInUser,
		isBankAccountPageLoading,
		licensesForLoggedInUser,
		isLicensePageLoading,
		ordersForLoggedInUser,
		isOrderPageLoading,
		positionsForLoggedInUser,
		isPositionPageLoading,
		recommendationsForLoggedInUser,
		isRecommendationPageLoading,
	});
};

function getLoggedInUserStatus({
	loggedInUser,
	isLoggedInUserLoading,
	bankAccountsForLoggedInUser,
	isBankAccountPageLoading,
	licensesForLoggedInUser,
	isLicensePageLoading,
	ordersForLoggedInUser,
	isOrderPageLoading,
	positionsForLoggedInUser,
	isPositionPageLoading,
	recommendationsForLoggedInUser,
	isRecommendationPageLoading,
}: {
	loggedInUser: User | undefined;
	isLoggedInUserLoading: boolean;
	bankAccountsForLoggedInUser: BankAccount[];
	isBankAccountPageLoading: boolean;
	licensesForLoggedInUser: License[];
	isLicensePageLoading: boolean;
	ordersForLoggedInUser: Order[];
	isOrderPageLoading: boolean;
	positionsForLoggedInUser: Position[];
	isPositionPageLoading: boolean;
	recommendationsForLoggedInUser: Recommendation[];
	isRecommendationPageLoading: boolean;
}): LoggedInUserStatus {
	const tasks: LoggedInUserStatus['tasks'] = [];
	let state: UserExperienceState = 'registered';

	const isLoggedInUserStatusLoading = [
		isLoggedInUserLoading,
		isBankAccountPageLoading,
		isLicensePageLoading,
		isOrderPageLoading,
		isPositionPageLoading,
		isRecommendationPageLoading,
	].some(Boolean);

	return {
		isLoggedInUserStatusLoading,
		state,
		tasks,
	};
}
