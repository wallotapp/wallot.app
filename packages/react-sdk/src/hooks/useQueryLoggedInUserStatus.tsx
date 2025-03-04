import {
	AchTransfer,
	AssetOrder,
	BankAccount,
	getHomeSiteRoute,
	isAchTransferRejectedByAlpaca,
	isAssetOrderRejectedByAlpaca,
	isAssetOrderFilledByAlpaca,
	isActivatedUser,
	isBankAccountApprovedByAlpaca,
	isBankAccountRejectedByAlpaca,
	isBankAccountTokenized,
	isKycUser,
	isOrderConfirmedByUser,
	isUserActivatedByAlpaca,
	isUserRejectedByAlpaca,
	Order,
	User,
	UserExperienceState,
	isAchTransferWithFundsReceivedByAlpaca,
} from '@wallot/js';
import { useQueryLoggedInUser } from '@wallot/react/src/features/users/hooks/useQueryLoggedInUser';
import { useQueryBankAccountsForLoggedInUser } from '@wallot/react/src/features/bankAccounts/hooks/useQueryBankAccountsForLoggedInUser';
import { useQueryOrdersForLoggedInUser } from '@wallot/react/src/features/orders/hooks/useQueryOrdersForLoggedInUser';
import { useQueryAchTransfersForLoggedInUser } from '@wallot/react/src/features/achTransfers/hooks/useQueryAchTransfersForLoggedInUser';
import { useRetrievePositions } from '@wallot/react/src/features/positions/hooks/useRetrievePositions';
import { useQueryAssetOrdersForLoggedInUser } from '@wallot/react/src/features/assetOrders/hooks/useQueryAssetOrdersForLoggedInUser';

export type LoggedInUserStatus = {
	isLoggedInUserStatusLoading: boolean;
	state: UserExperienceState;
	tasks: {
		ctaHref: string;
		ctaText: string;
		subtitle: string;
		title: string;
	}[];
	isActivatedUser: boolean;
	isKycUser: boolean;
	isUserActivatedByAlpaca: boolean;
	isUserRejectedByAlpaca: boolean;
	isUserWithAlpacaEquity: boolean;
};

export function useQueryLoggedInUserStatus(): LoggedInUserStatus {
	const { loggedInUser, isLoggedInUserLoading } = useQueryLoggedInUser();
	const {
		resourcesForLoggedInUser: bankAccountsForLoggedInUser,
		isResourcePageLoading: isBankAccountPageLoading,
	} = useQueryBankAccountsForLoggedInUser();
	const {
		resourcesForLoggedInUser: ordersForLoggedInUser,
		isResourcePageLoading: isOrderPageLoading,
	} = useQueryOrdersForLoggedInUser();

	const { achTransfersForLoggedInUser, isAchTransfersForLoggedInUserLoading } =
		useQueryAchTransfersForLoggedInUser();
	const { assetOrdersForLoggedInUser, isAssetOrdersForLoggedInUserLoading } =
		useQueryAssetOrdersForLoggedInUser();

	const { isLoading: isRetrievePositionsLoading } = useRetrievePositions();

	return getLoggedInUserStatus({
		loggedInUser,
		isLoggedInUserLoading,
		achTransfersForLoggedInUser,
		isAchTransfersForLoggedInUserLoading,
		assetOrdersForLoggedInUser,
		isAssetOrdersForLoggedInUserLoading,
		bankAccountsForLoggedInUser,
		isBankAccountPageLoading,
		ordersForLoggedInUser,
		isOrderPageLoading,
		isRetrievePositionsLoading,
	});
}

function getLoggedInUserStatus({
	loggedInUser,
	isLoggedInUserLoading,
	achTransfersForLoggedInUser,
	isAchTransfersForLoggedInUserLoading,
	assetOrdersForLoggedInUser,
	isAssetOrdersForLoggedInUserLoading,
	bankAccountsForLoggedInUser,
	isBankAccountPageLoading,
	ordersForLoggedInUser,
	isOrderPageLoading,
	isRetrievePositionsLoading,
}: {
	loggedInUser: User | undefined;
	isLoggedInUserLoading: boolean;
	achTransfersForLoggedInUser: AchTransfer[];
	isAchTransfersForLoggedInUserLoading: boolean;
	assetOrdersForLoggedInUser: AssetOrder[];
	isAssetOrdersForLoggedInUserLoading: boolean;
	bankAccountsForLoggedInUser: BankAccount[];
	isBankAccountPageLoading: boolean;
	ordersForLoggedInUser: Order[];
	isOrderPageLoading: boolean;
	isRetrievePositionsLoading: boolean;
}): LoggedInUserStatus {
	const isLoggedInUserStatusLoading =
		loggedInUser == null ||
		[
			isLoggedInUserLoading,
			isAchTransfersForLoggedInUserLoading,
			isAssetOrdersForLoggedInUserLoading,
			isBankAccountPageLoading,
			isOrderPageLoading,
			isRetrievePositionsLoading,
		].some(Boolean);

	const status: LoggedInUserStatus = {
		isLoggedInUserStatusLoading,
		state: 'registered',
		tasks: [],
		isActivatedUser: false,
		isKycUser: false,
		isUserActivatedByAlpaca: false,
		isUserRejectedByAlpaca: false,
		isUserWithAlpacaEquity: false,
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
	status.isActivatedUser = true;

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
	status.isKycUser = true;

	const { default_bank_account } = loggedInUser;
	const defaultBankAccount = bankAccountsForLoggedInUser.find(
		(bankAccount) => bankAccount._id === default_bank_account,
	);

	if (
		defaultBankAccount == null ||
		!isBankAccountTokenized(defaultBankAccount)
	) {
		status.state = 'activated.inputting_kyc_and_bank';
		status.tasks.push({
			ctaHref: getHomeSiteRoute({
				...defaultRouteOptions,
				queryParams: { order_id: firstOrder._id },
				routeStaticId: 'HOME_SITE__/ORDERS/[ORDER_ID]/CHECKOUT',
			}),
			ctaText: 'Continue',
			subtitle:
				'Looks like you still need to confirm your bank account details. Head over to the checkout page to complete this step.',
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

	const resolutionTaskCtaData = {
		ctaHref: 'mailto:support@wallot.app',
		ctaText: 'Contact Support',
	};

	// Alpaca Account
	if (isUserRejectedByAlpaca(loggedInUser)) {
		status.state =
			'trackingProgress.resolvingProblemWithOrder.resolvingAlpacaAccountActivationError';
		status.tasks.push({
			...resolutionTaskCtaData,
			subtitle:
				'Your account activation was unsuccessful. Please contact support to resolve this issue.',
			title: 'Account activation failed',
		});
		status.isUserRejectedByAlpaca = true;
		return status;
	}
	if (!isUserActivatedByAlpaca(loggedInUser)) {
		status.state =
			'trackingProgress.waitingForOrderToBeFilled.waitingForAlpacaAccountToChangeFromSubmittedToActive';
		return status;
	}
	status.isUserActivatedByAlpaca = true;

	// Alpaca ACH Relationship
	if (isBankAccountRejectedByAlpaca(defaultBankAccount)) {
		status.state =
			'trackingProgress.resolvingProblemWithOrder.resolvingAlpacaAchRelationshipError';
		status.tasks.push({
			...resolutionTaskCtaData,
			subtitle:
				'There was a problem completing your bank account connection. Please contact support to resolve this issue.',
			title: 'Bank account connection failed',
		});
		return status;
	}
	if (!isBankAccountApprovedByAlpaca(defaultBankAccount)) {
		status.state =
			'trackingProgress.waitingForOrderToBeFilled.waitingForAlpacaAchRelationshipToChangeFromQueuedToApproved';
		return status;
	}

	// Alpaca ACH Transfer
	if (achTransfersForLoggedInUser.some(isAchTransferRejectedByAlpaca)) {
		status.state =
			'trackingProgress.resolvingProblemWithOrder.resolvingAlpacaAchTransferError';
		status.tasks.push({
			...resolutionTaskCtaData,
			subtitle:
				'There was a problem with your ACH transfer. Please contact support to resolve this issue.',
			title: 'ACH transfer failed',
		});
		return status;
	}
	if (
		!achTransfersForLoggedInUser.some(isAchTransferWithFundsReceivedByAlpaca)
	) {
		status.state =
			'trackingProgress.waitingForOrderToBeFilled.waitingForAlpacaAchTransferToChangeFromQueuedToComplete';
		return status;
	}
	status.isUserWithAlpacaEquity = true;

	// Alpaca Order
	if (assetOrdersForLoggedInUser.some(isAssetOrderRejectedByAlpaca)) {
		status.state =
			'trackingProgress.resolvingProblemWithOrder.resolvingAlpacaOrderError';
		status.tasks.push({
			...resolutionTaskCtaData,
			subtitle:
				'There was a problem with one or more of your orders. Please contact support to resolve this issue.',
			title: 'Order failed',
		});
		return status;
	}
	if (assetOrdersForLoggedInUser.every(isAssetOrderFilledByAlpaca)) {
		status.state = 'trackingProgress.homeostasis';
		return status;
	}

	status.state =
		'trackingProgress.waitingForOrderToBeFilled.waitingForAlpacaOrderToChangeFromPendingNewToFilled';
	return status;
}
