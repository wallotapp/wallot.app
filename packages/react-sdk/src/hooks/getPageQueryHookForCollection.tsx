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
import { useQueryModelFamilyPage } from '@wallot/react/src/features/modelFamilies';
import { useQueryOpenAiModelPage } from '@wallot/react/src/features/openAiModels';
import { useQueryOpenAiModelFamilyPage } from '@wallot/react/src/features/openAiModelFamilies';
import { useQueryOpenAiRecommendationPage } from '@wallot/react/src/features/openAiRecommendations';
import { useQueryOrderPage } from '@wallot/react/src/features/orders';
import { useQueryPaymentMethodPage } from '@wallot/react/src/features/paymentMethods';
import { useQueryPositionPage } from '@wallot/react/src/features/positions';
import { useQueryRecommendationPage } from '@wallot/react/src/features/recommendations';
import { useQueryStockPage } from '@wallot/react/src/features/stocks';
import { useQueryStripeCustomerPage } from '@wallot/react/src/features/stripeCustomers';
import { useQueryStripeFinancialConnectionAccountPage } from '@wallot/react/src/features/stripeFinancialConnectionAccounts';
import { useQueryStripeFinancialConnectionSessionPage } from '@wallot/react/src/features/stripeFinancialConnectionSessions';
import { useQueryStripeInvoicePage } from '@wallot/react/src/features/stripeInvoices';
import { useQueryStripePaymentMethodPage } from '@wallot/react/src/features/stripePaymentMethods';
import { useQueryStripeSubscriptionPage } from '@wallot/react/src/features/stripeSubscriptions';
import { useQueryUserPage } from '@wallot/react/src/features/users';
import { useQueryUserPersonaPage } from '@wallot/react/src/features/userPersonas';

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
	model_family: useQueryModelFamilyPage,
	open_ai_model: useQueryOpenAiModelPage,
	open_ai_model_family: useQueryOpenAiModelFamilyPage,
	open_ai_recommendation: useQueryOpenAiRecommendationPage,
	order: useQueryOrderPage,
	payment_method: useQueryPaymentMethodPage,
	position: useQueryPositionPage,
	recommendation: useQueryRecommendationPage,
	stock: useQueryStockPage,
	stripe_customer: useQueryStripeCustomerPage,
	stripe_financial_connection_account:
		useQueryStripeFinancialConnectionAccountPage,
	stripe_financial_connection_session:
		useQueryStripeFinancialConnectionSessionPage,
	stripe_invoice: useQueryStripeInvoicePage,
	stripe_payment_method: useQueryStripePaymentMethodPage,
	stripe_subscription: useQueryStripeSubscriptionPage,
	user: useQueryUserPage,
	user_persona: useQueryUserPersonaPage,
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
