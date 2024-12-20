import { GeneralizedApiResource, GeneralizedError } from 'ergonomic';
import { UseQueryResult } from '@tanstack/react-query';
import { GeneralizedFirestoreCollectionPage } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreCollectionPageQuery';
import { GeneralizedUseQueryPageProps } from 'ergonomic-react/src/lib/tanstackQuery';
import { WallotResourceName } from '@wallot/js';

import { useQueryAchTransferPage } from '@wallot/react/src/features/achTransfers';
import { useQueryAlpacaAccountPage } from '@wallot/react/src/features/alpacaAccounts';
import { useQueryAlpacaAchRelationshipPage } from '@wallot/react/src/features/alpacaAchRelationships';
import { useQueryAlpacaAchTransferPage } from '@wallot/react/src/features/alpacaAchTransfers';
import { useQueryAlpacaAssetPage } from '@wallot/react/src/features/alpacaAssets';
import { useQueryAlpacaOrderPage } from '@wallot/react/src/features/alpacaOrders';
import { useQueryAlpacaPositionPage } from '@wallot/react/src/features/alpacaPositions';
import { useQueryAlphaVantageCompanyPage } from '@wallot/react/src/features/alphaVantageCompanies';
import { useQueryAlphaVantageStockPricePage } from '@wallot/react/src/features/alphaVantageStockPrices';
import { useQueryAssetPage } from '@wallot/react/src/features/assets';
import { useQueryAssetOrderPage } from '@wallot/react/src/features/assetOrders';
import { useQueryAssetPricePage } from '@wallot/react/src/features/assetPrices';
import { useQueryAuthCredentialPage } from '@wallot/react/src/features/authCredentials';
import { useQueryBankAccountPage } from '@wallot/react/src/features/bankAccounts';
import { useQueryEquityAccountPage } from '@wallot/react/src/features/equityAccounts';
import { useQueryIdentityVerificationDocumentPage } from '@wallot/react/src/features/identityVerificationDocuments';
import { useQueryInvoicePage } from '@wallot/react/src/features/invoices';
import { useQueryLicensePage } from '@wallot/react/src/features/licenses';
import { useQueryModelPage } from '@wallot/react/src/features/models';
import { useQueryModelFamilyPage } from '@wallot/react/src/features/modelFamilies';
import { useQueryNewsReportPage } from '@wallot/react/src/features/newsReports';
import { useQueryOpenAiModelPage } from '@wallot/react/src/features/openAiModels';
import { useQueryOpenAiModelFamilyPage } from '@wallot/react/src/features/openAiModelFamilies';
import { useQueryOpenAiRecommendationPage } from '@wallot/react/src/features/openAiRecommendations';
import { useQueryOrderPage } from '@wallot/react/src/features/orders';
import { useQueryParameterPage } from '@wallot/react/src/features/parameters';
import { useQueryPaymentMethodPage } from '@wallot/react/src/features/paymentMethods';
import { useQueryPositionPage } from '@wallot/react/src/features/positions';
import { useQueryRecommendationPage } from '@wallot/react/src/features/recommendations';
import { useQueryStripeCustomerPage } from '@wallot/react/src/features/stripeCustomers';
import { useQueryStripeFinancialConnectionAccountPage } from '@wallot/react/src/features/stripeFinancialConnectionAccounts';
import { useQueryStripeFinancialConnectionSessionPage } from '@wallot/react/src/features/stripeFinancialConnectionSessions';
import { useQueryStripeInvoicePage } from '@wallot/react/src/features/stripeInvoices';
import { useQueryStripePaymentMethodPage } from '@wallot/react/src/features/stripePaymentMethods';
import { useQueryStripeSubscriptionPage } from '@wallot/react/src/features/stripeSubscriptions';
import { useQueryUserPage } from '@wallot/react/src/features/users';

type PageQueryHook = (
	options: GeneralizedUseQueryPageProps<GeneralizedApiResource>,
) => UseQueryResult<GeneralizedFirestoreCollectionPage, GeneralizedError>;

// Map of resource names to their respective hooks
const queryHookMap = {
	ach_transfer: useQueryAchTransferPage,
	alpaca_account: useQueryAlpacaAccountPage,
	alpaca_ach_relationship: useQueryAlpacaAchRelationshipPage,
	alpaca_ach_transfer: useQueryAlpacaAchTransferPage,
	alpaca_asset: useQueryAlpacaAssetPage,
	alpaca_order: useQueryAlpacaOrderPage,
	alpaca_position: useQueryAlpacaPositionPage,
	alpha_vantage_company: useQueryAlphaVantageCompanyPage,
	alpha_vantage_stock_price: useQueryAlphaVantageStockPricePage,
	asset: useQueryAssetPage,
	asset_order: useQueryAssetOrderPage,
	asset_price: useQueryAssetPricePage,
	auth_credential: useQueryAuthCredentialPage,
	bank_account: useQueryBankAccountPage,
	equity_account: useQueryEquityAccountPage,
	identity_verification_document: useQueryIdentityVerificationDocumentPage,
	invoice: useQueryInvoicePage,
	license: useQueryLicensePage,
	model: useQueryModelPage,
	model_family: useQueryModelFamilyPage,
	news_report: useQueryNewsReportPage,
	open_ai_model: useQueryOpenAiModelPage,
	open_ai_model_family: useQueryOpenAiModelFamilyPage,
	open_ai_recommendation: useQueryOpenAiRecommendationPage,
	order: useQueryOrderPage,
	parameter: useQueryParameterPage,
	payment_method: useQueryPaymentMethodPage,
	position: useQueryPositionPage,
	recommendation: useQueryRecommendationPage,
	stripe_customer: useQueryStripeCustomerPage,
	stripe_financial_connection_account:
		useQueryStripeFinancialConnectionAccountPage,
	stripe_financial_connection_session:
		useQueryStripeFinancialConnectionSessionPage,
	stripe_invoice: useQueryStripeInvoicePage,
	stripe_payment_method: useQueryStripePaymentMethodPage,
	stripe_subscription: useQueryStripeSubscriptionPage,
	user: useQueryUserPage,
} as Record<WallotResourceName, PageQueryHook>;

const fallbackPageQueryHookForResource = (() => ({
	data: { documents: [] as GeneralizedApiResource[] },
	isLoading: false,
	error: null,
})) as unknown as PageQueryHook;

/**
 * Generalized function to return the appropriate hook
 *
 * @param resourceName
 * @returns The appropriate hook for the given resource
 *
 * @example
 * const resourceName = '...'; // Assume a valid resource name, for example passed as a prop
 * const hook = getPageQueryHookForResource(resourceName);
 * const { data, isLoading, error } = hook({ firestoreQueryOptions });
 */
export const getPageQueryHookForResource = (
	resourceName: string | null,
): PageQueryHook => {
	if (resourceName == null) {
		return fallbackPageQueryHookForResource;
	}

	const hook = queryHookMap[resourceName as WallotResourceName];
	if (!hook) {
		throw new Error(`No hook found for resource: ${resourceName}`);
	}
	return hook;
};
