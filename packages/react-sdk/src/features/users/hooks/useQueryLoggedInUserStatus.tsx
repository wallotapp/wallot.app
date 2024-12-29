import {
	BankAccount,
	getHomeSiteRoute,
	isActivatedUser,
	isBankAccountTokenized,
	isKycUser,
	isOrderConfirmedByUser,
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
	tasks: {
		ctaHref: string;
		ctaText: string;
		subtitle: string;
		title: string;
	}[];
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
	// licensesForLoggedInUser,
	isLicensePageLoading,
	ordersForLoggedInUser,
	isOrderPageLoading,
	// positionsForLoggedInUser,
	isPositionPageLoading,
	// recommendationsForLoggedInUser,
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
	const isLoggedInUserStatusLoading =
		loggedInUser == null ||
		[
			isLoggedInUserLoading,
			isBankAccountPageLoading,
			isLicensePageLoading,
			isOrderPageLoading,
			isPositionPageLoading,
			isRecommendationPageLoading,
		].some(Boolean);

	const status: LoggedInUserStatus = {
		isLoggedInUserStatusLoading,
		state: 'registered',
		tasks: [],
	};

	if (isLoggedInUserStatusLoading) {
		return status;
	}

	const defaultRouteOptions = {
		includeOrigin: false,
		origin: null,
		queryParams: {},
	};

	if (!isActivatedUser(loggedInUser)) {
		status.tasks.push({
			ctaHref: getHomeSiteRoute({
				...defaultRouteOptions,
				routeStaticId: 'HOME_SITE__/GET_STARTED',
			}),
			ctaText: 'Get Started',
			subtitle:
				"Activate your account to receive personalized AI insights and unlock all of Wallot's features.",
			title: 'Activate Account',
		});
		return status;
	}

	const firstOrder = ordersForLoggedInUser[0];
	if (firstOrder == null) return status;

	if (!isKycUser(loggedInUser)) {
		status.state = 'activated.inputting_kyc_and_bank';
		status.tasks.push({
			ctaHref: getHomeSiteRoute({
				...defaultRouteOptions,
				queryParams: { order_id: firstOrder._id },
				routeStaticId: 'HOME_SITE__/ORDERS/[ORDER_ID]/CHECKOUT',
			}),
			ctaText: 'Continue',
			subtitle:
				"You're one step away from investing. Complete our billing information form, and add a bank to finish your order.",
			title: 'Complete your first order',
		});
		return status;
	}

	const firstBankAccount = bankAccountsForLoggedInUser[0];

	if (firstBankAccount == null || !isBankAccountTokenized(firstBankAccount)) {
		status.state = 'activated.inputting_kyc_and_bank';
		status.tasks.push({
			ctaHref: getHomeSiteRoute({
				...defaultRouteOptions,
				queryParams: { order_id: firstOrder._id },
				routeStaticId: 'HOME_SITE__/ORDERS/[ORDER_ID]/CHECKOUT',
			}),
			ctaText: 'Continue',
			subtitle:
				firstBankAccount == null
					? 'Looks like you still need to connect a bank account. We use Stripe to make this process secure and easy.'
					: 'Looks like you still need to confirm your bank account details. Head over to our checkout page to complete this step.',
			title: 'Connect a bank account',
		});
		return status;
	}

	if (!isOrderConfirmedByUser(firstOrder)) {
		status.state = 'activated.ready_to_confirm_order';
		status.tasks.push({
			ctaHref: getHomeSiteRoute({
				...defaultRouteOptions,
				queryParams: { order_id: firstOrder._id },
				routeStaticId: 'HOME_SITE__/ORDERS/[ORDER_ID]/CHECKOUT',
			}),
			ctaText: 'Continue',
			subtitle:
				"Don't miss out on your investment. Confirm your order, and we'll take care of the rest.",
			title: 'Complete your first order',
		});
		return status;
	}

	// TODO -- Add logic for the following states:
	// | 'trackingProgress.waitingForOrderToBeFilled.waitingForAlpacaAccountToChangeFromSubmittedToActive'
	// | 'trackingProgress.waitingForOrderToBeFilled.waitingForAlpacaAchRelationshipToChangeFromQueuedToApproved'
	// | 'trackingProgress.waitingForOrderToBeFilled.waitingForAlpacaAchTransferToChangeFromQueuedToComplete'
	// | 'trackingProgress.waitingForOrderToBeFilled.waitingForAlpacaOrderToChangeFromPendingNewToFilled'
	// | 'trackingProgress.resolvingProblemWithOrder.resolvingAlpacaAccountActivationError'
	// | 'trackingProgress.resolvingProblemWithOrder.resolvingAlpacaAchRelationshipError'
	// | 'trackingProgress.resolvingProblemWithOrder.resolvingAlpacaAchTransferError'
	// | 'trackingProgress.resolvingProblemWithOrder.resolvingAlpacaOrderError'

	status.state = 'trackingProgress.homeostasis';
	return status;
}
