import { GeneralizedApiResource, GeneralizedResponse } from 'ergonomic';
import { UseQueryResult } from '@tanstack/react-query';
import { GeneralizedFirestoreCollectionPage } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreCollectionPageQuery';
import { GeneralizedUseQueryPageProps } from 'ergonomic-react/src/lib/tanstackQuery';
import { WallotCollection } from '@wallot/js';

import { useQueryAlpacaAccountPage } from '@wallot/react/src/features/alpacaAccounts';
import { useQueryAlpacaAchRelationshipPage } from '@wallot/react/src/features/alpacaAchRelationships';
import { useQueryAlpacaAchTransferPage } from '@wallot/react/src/features/alpacaAchTransfers';
import { useQueryAlpacaAssetPage } from '@wallot/react/src/features/alpacaAssets';
import { useQueryAlpacaOrderPage } from '@wallot/react/src/features/alpacaOrders';
import { useQueryAlpacaPositionPage } from '@wallot/react/src/features/alpacaPositions';
import { useQueryAlphaVantageCompanyPage } from '@wallot/react/src/features/alphaVantageCompanies';
import { useQueryAuthCredentialPage } from '@wallot/react/src/features/authCredentials';
import { useQueryForecastPage } from '@wallot/react/src/features/forecasts';
import { useQueryFundingAccountPage } from '@wallot/react/src/features/fundingAccounts';
import { useQueryInvoicePage } from '@wallot/react/src/features/invoices';
import { useQueryLicensePage } from '@wallot/react/src/features/licenses';
import { useQueryModelPage } from '@wallot/react/src/features/models';
import { useQueryOrderPage } from '@wallot/react/src/features/orders';
import { useQueryPaymentMethodPage } from '@wallot/react/src/features/paymentMethods';
import { useQueryPositionPage } from '@wallot/react/src/features/positions';
import { useQueryRecommendationPage } from '@wallot/react/src/features/recommendations';
import { useQueryStockPage } from '@wallot/react/src/features/stocks';
import { useQueryStripeCustomerPage } from '@wallot/react/src/features/stripeCustomers';
import { useQueryStripeFinancialConnectionsAccountPage } from '@wallot/react/src/features/stripeFinancialConnectionsAccounts';
import { useQueryTransactionPage } from '@wallot/react/src/features/transactions';
import { useQueryUserPage } from '@wallot/react/src/features/users';

type PageQueryHook = (
	options: GeneralizedUseQueryPageProps<GeneralizedApiResource>,
) => UseQueryResult<GeneralizedFirestoreCollectionPage, GeneralizedResponse>;

// Map of collection IDs to their respective hooks
const queryHookMap = {
	alpaca_account: useQueryAlpacaAccountPage,
	alpaca_ach_relationship: useQueryAlpacaAchRelationshipPage,
	alpaca_ach_transfer: useQueryAlpacaAchTransferPage,
	alpaca_asset: useQueryAlpacaAssetPage,
	alpaca_order: useQueryAlpacaOrderPage,
	alpaca_position: useQueryAlpacaPositionPage,
	alpha_vantage_company: useQueryAlphaVantageCompanyPage,
	auth_credential: useQueryAuthCredentialPage,
	forecast: useQueryForecastPage,
	funding_account: useQueryFundingAccountPage,
	invoice: useQueryInvoicePage,
	license: useQueryLicensePage,
	model: useQueryModelPage,
	order: useQueryOrderPage,
	payment_method: useQueryPaymentMethodPage,
	position: useQueryPositionPage,
	recommendation: useQueryRecommendationPage,
	stock: useQueryStockPage,
	stripe_customer: useQueryStripeCustomerPage,
	stripe_financial_connections_account:
		useQueryStripeFinancialConnectionsAccountPage,
	transaction: useQueryTransactionPage,
	user: useQueryUserPage,
} as Record<WallotCollection, PageQueryHook>;

const fallbackPageQueryHookForCollection = (() => ({
	data: { documents: [] as GeneralizedApiResource[] },
	isLoading: false,
	error: null,
})) as unknown as PageQueryHook;

/**
 * Generalized function to return the appropriate hook
 *
 * @param collectionId
 * @returns The appropriate hook for the given collection ID
 *
 * @example
 * const collectionId = '...'; // Assume a valid collection ID, for example passed as a prop
 * const hook = getPageQueryHookForCollection(collectionId);
 * const { data, isLoading, error } = hook({ firestoreQueryOptions });
 */
export const getPageQueryHookForCollection = (
	collectionId: string | null,
): PageQueryHook => {
	if (collectionId == null) {
		return fallbackPageQueryHookForCollection;
	}

	const hook = queryHookMap[collectionId as WallotCollection];
	if (!hook) {
		throw new Error(`No hook found for collection: ${collectionId}`);
	}
	return hook;
};
