import { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { GeneralizedResponse } from 'ergonomic';
import { WallotCollection } from '@wallot/js';

import { useCreateAchTransferMutation } from '@wallot/react/src/features/achTransfers';
import { useCreateAlpacaAccountMutation } from '@wallot/react/src/features/alpacaAccounts';
import { useCreateAlpacaAchRelationshipMutation } from '@wallot/react/src/features/alpacaAchRelationships';
import { useCreateAlpacaAchTransferMutation } from '@wallot/react/src/features/alpacaAchTransfers';
import { useCreateAlpacaAssetMutation } from '@wallot/react/src/features/alpacaAssets';
import { useCreateAlpacaOrderMutation } from '@wallot/react/src/features/alpacaOrders';
import { useCreateAlpacaPositionMutation } from '@wallot/react/src/features/alpacaPositions';
import { useCreateAlphaVantageCompanyMutation } from '@wallot/react/src/features/alphaVantageCompanies';
import { useCreateAuthCredentialMutation } from '@wallot/react/src/features/authCredentials';
import { useCreateBankAccountMutation } from '@wallot/react/src/features/bankAccounts';
import { useCreateEquityAccountMutation } from '@wallot/react/src/features/equityAccounts';
import { useCreateForecastMutation } from '@wallot/react/src/features/forecasts';
import { useCreateInvoiceMutation } from '@wallot/react/src/features/invoices';
import { useCreateLicenseMutation } from '@wallot/react/src/features/licenses';
import { useCreateModelMutation } from '@wallot/react/src/features/models';
import { useCreateModelFamilyMutation } from '@wallot/react/src/features/modelFamilies';
import { useCreateNewsReportMutation } from '@wallot/react/src/features/newsReports';
import { useCreateOpenAiModelMutation } from '@wallot/react/src/features/openAiModels';
import { useCreateOpenAiModelFamilyMutation } from '@wallot/react/src/features/openAiModelFamilies';
import { useCreateOpenAiRecommendationMutation } from '@wallot/react/src/features/openAiRecommendations';
import { useCreateOrderMutation } from '@wallot/react/src/features/orders';
import { useCreatePaymentMethodMutation } from '@wallot/react/src/features/paymentMethods';
import { useCreatePositionMutation } from '@wallot/react/src/features/positions';
import { useCreateRecommendationMutation } from '@wallot/react/src/features/recommendations';
import { useCreateStockMutation } from '@wallot/react/src/features/stocks';
import { useCreateStockOrderMutation } from '@wallot/react/src/features/stockOrders';
import { useCreateStockPriceMutation } from '@wallot/react/src/features/stockPrices';
import { useCreateStripeCustomerMutation } from '@wallot/react/src/features/stripeCustomers';
import { useCreateStripeFinancialConnectionAccountMutation } from '@wallot/react/src/features/stripeFinancialConnectionAccounts';
import { useCreateStripeFinancialConnectionSessionMutation } from '@wallot/react/src/features/stripeFinancialConnectionSessions';
import { useCreateStripeInvoiceMutation } from '@wallot/react/src/features/stripeInvoices';
import { useCreateStripePaymentMethodMutation } from '@wallot/react/src/features/stripePaymentMethods';
import { useCreateStripeSubscriptionMutation } from '@wallot/react/src/features/stripeSubscriptions';
import { useCreateUserMutation } from '@wallot/react/src/features/users';
import { useCreateUserPersonaMutation } from '@wallot/react/src/features/userPersonas';

type MutationHook = (
	options: UseMutationOptions<unknown, GeneralizedResponse>,
) => UseMutationResult;

// Map of collection IDs to their respective mutations
const createOperationMutationMap = {
	ach_transfer: useCreateAchTransferMutation,
	alpaca_account: useCreateAlpacaAccountMutation,
	alpaca_ach_relationship: useCreateAlpacaAchRelationshipMutation,
	alpaca_ach_transfer: useCreateAlpacaAchTransferMutation,
	alpaca_asset: useCreateAlpacaAssetMutation,
	alpaca_order: useCreateAlpacaOrderMutation,
	alpaca_position: useCreateAlpacaPositionMutation,
	alpha_vantage_company: useCreateAlphaVantageCompanyMutation,
	auth_credential: useCreateAuthCredentialMutation,
	bank_account: useCreateBankAccountMutation,
	equity_account: useCreateEquityAccountMutation,
	forecast: useCreateForecastMutation,
	invoice: useCreateInvoiceMutation,
	license: useCreateLicenseMutation,
	model: useCreateModelMutation,
	model_family: useCreateModelFamilyMutation,
	news_report: useCreateNewsReportMutation,
	open_ai_model: useCreateOpenAiModelMutation,
	open_ai_model_family: useCreateOpenAiModelFamilyMutation,
	open_ai_recommendation: useCreateOpenAiRecommendationMutation,
	order: useCreateOrderMutation,
	payment_method: useCreatePaymentMethodMutation,
	position: useCreatePositionMutation,
	recommendation: useCreateRecommendationMutation,
	stock: useCreateStockMutation,
	stock_order: useCreateStockOrderMutation,
	stock_price: useCreateStockPriceMutation,
	stripe_customer: useCreateStripeCustomerMutation,
	stripe_financial_connection_account:
		useCreateStripeFinancialConnectionAccountMutation,
	stripe_financial_connection_session:
		useCreateStripeFinancialConnectionSessionMutation,
	stripe_invoice: useCreateStripeInvoiceMutation,
	stripe_payment_method: useCreateStripePaymentMethodMutation,
	stripe_subscription: useCreateStripeSubscriptionMutation,
	user: useCreateUserMutation,
	user_persona: useCreateUserPersonaMutation,
} as unknown as Record<WallotCollection, MutationHook>;

/**
 * Generalized function to return the appropriate create operation mutation
 *
 * @param collectionId
 * @returns The appropriate create operation mutation for the given collection ID
 *
 * @example
 * const collectionId = '...'; // Assume a valid collection ID, for example passed as a prop
 * const mutation = getCreateOperationMutationForCollection(collectionId);
 * const { mutate, isLoading, error } = mutation({
 * 	onSuccess: () => { ... },
 * 	onError: () => { ... },
 * 	// Other options
 * });
 */
export function getCreateOperationMutationForCollection<
	TCollection extends WallotCollection,
>(collectionId: TCollection): MutationHook {
	const mutation = createOperationMutationMap[collectionId];
	if (!mutation) {
		throw new Error(
			`No create operation mutation found for collection: ${collectionId}`,
		);
	}
	return mutation;
}
