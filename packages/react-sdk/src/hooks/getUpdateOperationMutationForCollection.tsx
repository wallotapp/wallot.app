import { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { GeneralizedResponse } from 'ergonomic';
import { WallotCollection } from '@wallot/js';

import { useUpdateAchTransferMutation } from '@wallot/react/src/features/achTransfers';
import { useUpdateAlpacaAccountMutation } from '@wallot/react/src/features/alpacaAccounts';
import { useUpdateAlpacaAchRelationshipMutation } from '@wallot/react/src/features/alpacaAchRelationships';
import { useUpdateAlpacaAchTransferMutation } from '@wallot/react/src/features/alpacaAchTransfers';
import { useUpdateAlpacaAssetMutation } from '@wallot/react/src/features/alpacaAssets';
import { useUpdateAlpacaOrderMutation } from '@wallot/react/src/features/alpacaOrders';
import { useUpdateAlpacaPositionMutation } from '@wallot/react/src/features/alpacaPositions';
import { useUpdateAlphaVantageCompanyMutation } from '@wallot/react/src/features/alphaVantageCompanies';
import { useUpdateAlphaVantageStockPriceMutation } from '@wallot/react/src/features/alphaVantageStockPrices';
import { useUpdateAuthCredentialMutation } from '@wallot/react/src/features/authCredentials';
import { useUpdateBankAccountMutation } from '@wallot/react/src/features/bankAccounts';
import { useUpdateEquityAccountMutation } from '@wallot/react/src/features/equityAccounts';
import { useUpdateForecastMutation } from '@wallot/react/src/features/forecasts';
import { useUpdateInvoiceMutation } from '@wallot/react/src/features/invoices';
import { useUpdateLicenseMutation } from '@wallot/react/src/features/licenses';
import { useUpdateModelMutation } from '@wallot/react/src/features/models';
import { useUpdateModelFamilyMutation } from '@wallot/react/src/features/modelFamilies';
import { useUpdateNewsReportMutation } from '@wallot/react/src/features/newsReports';
import { useUpdateOpenAiModelMutation } from '@wallot/react/src/features/openAiModels';
import { useUpdateOpenAiModelFamilyMutation } from '@wallot/react/src/features/openAiModelFamilies';
import { useUpdateOpenAiRecommendationMutation } from '@wallot/react/src/features/openAiRecommendations';
import { useUpdateOrderMutation } from '@wallot/react/src/features/orders';
import { useUpdateParameterMutation } from '@wallot/react/src/features/parameters';
import { useUpdatePaymentMethodMutation } from '@wallot/react/src/features/paymentMethods';
import { useUpdatePositionMutation } from '@wallot/react/src/features/positions';
import { useUpdateRecommendationMutation } from '@wallot/react/src/features/recommendations';
import { useUpdateStockMutation } from '@wallot/react/src/features/stocks';
import { useUpdateStockOrderMutation } from '@wallot/react/src/features/stockOrders';
import { useUpdateStockPriceMutation } from '@wallot/react/src/features/stockPrices';
import { useUpdateStripeCustomerMutation } from '@wallot/react/src/features/stripeCustomers';
import { useUpdateStripeFinancialConnectionAccountMutation } from '@wallot/react/src/features/stripeFinancialConnectionAccounts';
import { useUpdateStripeFinancialConnectionSessionMutation } from '@wallot/react/src/features/stripeFinancialConnectionSessions';
import { useUpdateStripeInvoiceMutation } from '@wallot/react/src/features/stripeInvoices';
import { useUpdateStripePaymentMethodMutation } from '@wallot/react/src/features/stripePaymentMethods';
import { useUpdateStripeSubscriptionMutation } from '@wallot/react/src/features/stripeSubscriptions';
import { useUpdateUserMutation } from '@wallot/react/src/features/users';

type MutationHook = (
	options: UseMutationOptions<unknown, GeneralizedResponse>,
) => UseMutationResult;

// Map of collection IDs to their respective mutations
const updateOperationMutationMap = {
	ach_transfer: useUpdateAchTransferMutation,
	alpaca_account: useUpdateAlpacaAccountMutation,
	alpaca_ach_relationship: useUpdateAlpacaAchRelationshipMutation,
	alpaca_ach_transfer: useUpdateAlpacaAchTransferMutation,
	alpaca_asset: useUpdateAlpacaAssetMutation,
	alpaca_order: useUpdateAlpacaOrderMutation,
	alpaca_position: useUpdateAlpacaPositionMutation,
	alpha_vantage_company: useUpdateAlphaVantageCompanyMutation,
	alpha_vantage_stock_price: useUpdateAlphaVantageStockPriceMutation,
	auth_credential: useUpdateAuthCredentialMutation,
	bank_account: useUpdateBankAccountMutation,
	equity_account: useUpdateEquityAccountMutation,
	forecast: useUpdateForecastMutation,
	invoice: useUpdateInvoiceMutation,
	license: useUpdateLicenseMutation,
	model: useUpdateModelMutation,
	model_family: useUpdateModelFamilyMutation,
	news_report: useUpdateNewsReportMutation,
	open_ai_model: useUpdateOpenAiModelMutation,
	open_ai_model_family: useUpdateOpenAiModelFamilyMutation,
	open_ai_recommendation: useUpdateOpenAiRecommendationMutation,
	order: useUpdateOrderMutation,
	parameter: useUpdateParameterMutation,
	payment_method: useUpdatePaymentMethodMutation,
	position: useUpdatePositionMutation,
	recommendation: useUpdateRecommendationMutation,
	stock: useUpdateStockMutation,
	stock_order: useUpdateStockOrderMutation,
	stock_price: useUpdateStockPriceMutation,
	stripe_customer: useUpdateStripeCustomerMutation,
	stripe_financial_connection_account:
		useUpdateStripeFinancialConnectionAccountMutation,
	stripe_financial_connection_session:
		useUpdateStripeFinancialConnectionSessionMutation,
	stripe_invoice: useUpdateStripeInvoiceMutation,
	stripe_payment_method: useUpdateStripePaymentMethodMutation,
	stripe_subscription: useUpdateStripeSubscriptionMutation,
	user: useUpdateUserMutation,
} as unknown as Record<WallotCollection, MutationHook>;

/**
 * Generalized function to return the appropriate update operation mutation
 *
 * @param collectionId
 * @returns The appropriate update operation mutation for the given collection ID
 *
 * @example
 * const collectionId = '...'; // Assume a valid collection ID, for example passed as a prop
 * const mutation = getUpdateOperationMutationForCollection(collectionId);
 * const { mutate, isLoading, error } = mutation({
 * 	onSuccess: () => { ... },
 * 	onError: () => { ... },
 * 	// Other options
 * });
 */
export function getUpdateOperationMutationForCollection<
	TCollection extends WallotCollection,
>(collectionId: TCollection): MutationHook {
	const mutation = updateOperationMutationMap[collectionId];
	if (!mutation) {
		throw new Error(
			`No update operation mutation found for collection: ${collectionId}`,
		);
	}
	return mutation;
}
