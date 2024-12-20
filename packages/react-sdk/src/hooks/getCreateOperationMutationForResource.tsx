import { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { GeneralizedError } from 'ergonomic';
import { WallotResourceName } from '@wallot/js';

import { useCreateAchTransferMutation } from '@wallot/react/src/features/achTransfers';
import { useCreateAlpacaAccountMutation } from '@wallot/react/src/features/alpacaAccounts';
import { useCreateAlpacaAchRelationshipMutation } from '@wallot/react/src/features/alpacaAchRelationships';
import { useCreateAlpacaAssetMutation } from '@wallot/react/src/features/alpacaAssets';
import { useCreateAlpacaPositionMutation } from '@wallot/react/src/features/alpacaPositions';
import { useCreateAlphaVantageCompanyMutation } from '@wallot/react/src/features/alphaVantageCompanies';
import { useCreateAssetMutation } from '@wallot/react/src/features/assets';
import { useCreateAssetOrderMutation } from '@wallot/react/src/features/assetOrders';
import { useCreateAssetPriceMutation } from '@wallot/react/src/features/assetPrices';
import { useCreateAuthCredentialMutation } from '@wallot/react/src/features/authCredentials';
import { useCreateBankAccountMutation } from '@wallot/react/src/features/bankAccounts';
import { useCreateEquityAccountMutation } from '@wallot/react/src/features/equityAccounts';
import { useCreateIdentityVerificationDocumentMutation } from '@wallot/react/src/features/identityVerificationDocuments';
import { useCreateInvoiceMutation } from '@wallot/react/src/features/invoices';
import { useCreateLicenseMutation } from '@wallot/react/src/features/licenses';
import { useCreateModelMutation } from '@wallot/react/src/features/models';
import { useCreateModelFamilyMutation } from '@wallot/react/src/features/modelFamilies';
import { useCreateNewsReportMutation } from '@wallot/react/src/features/newsReports';
import { useCreateOpenAiModelMutation } from '@wallot/react/src/features/openAiModels';
import { useCreateOpenAiModelFamilyMutation } from '@wallot/react/src/features/openAiModelFamilies';
import { useCreateOpenAiRecommendationMutation } from '@wallot/react/src/features/openAiRecommendations';
import { useCreateOrderMutation } from '@wallot/react/src/features/orders';
import { useCreateParameterMutation } from '@wallot/react/src/features/parameters';
import { useCreatePaymentMethodMutation } from '@wallot/react/src/features/paymentMethods';
import { useCreatePositionMutation } from '@wallot/react/src/features/positions';
import { useCreateRecommendationMutation } from '@wallot/react/src/features/recommendations';
import { useCreateStripeFinancialConnectionAccountMutation } from '@wallot/react/src/features/stripeFinancialConnectionAccounts';
import { useCreateStripeFinancialConnectionSessionMutation } from '@wallot/react/src/features/stripeFinancialConnectionSessions';
import { useCreateStripeInvoiceMutation } from '@wallot/react/src/features/stripeInvoices';
import { useCreateStripePaymentMethodMutation } from '@wallot/react/src/features/stripePaymentMethods';
import { useCreateStripeSubscriptionMutation } from '@wallot/react/src/features/stripeSubscriptions';
import { useCreateUserMutation } from '@wallot/react/src/features/users';

type MutationHook = (
	options: UseMutationOptions<unknown, GeneralizedError>,
) => UseMutationResult;

// Map of resource names to their respective mutations
const createOperationMutationMap = {
	ach_transfer: useCreateAchTransferMutation,
	alpaca_account: useCreateAlpacaAccountMutation,
	alpaca_ach_relationship: useCreateAlpacaAchRelationshipMutation,
	alpaca_asset: useCreateAlpacaAssetMutation,
	alpaca_position: useCreateAlpacaPositionMutation,
	alpha_vantage_company: useCreateAlphaVantageCompanyMutation,
	asset: useCreateAssetMutation,
	asset_order: useCreateAssetOrderMutation,
	asset_price: useCreateAssetPriceMutation,
	auth_credential: useCreateAuthCredentialMutation,
	bank_account: useCreateBankAccountMutation,
	equity_account: useCreateEquityAccountMutation,
	identity_verification_document: useCreateIdentityVerificationDocumentMutation,
	invoice: useCreateInvoiceMutation,
	license: useCreateLicenseMutation,
	model: useCreateModelMutation,
	model_family: useCreateModelFamilyMutation,
	news_report: useCreateNewsReportMutation,
	open_ai_model: useCreateOpenAiModelMutation,
	open_ai_model_family: useCreateOpenAiModelFamilyMutation,
	open_ai_recommendation: useCreateOpenAiRecommendationMutation,
	order: useCreateOrderMutation,
	parameter: useCreateParameterMutation,
	payment_method: useCreatePaymentMethodMutation,
	position: useCreatePositionMutation,
	recommendation: useCreateRecommendationMutation,
	stripe_financial_connection_account:
		useCreateStripeFinancialConnectionAccountMutation,
	stripe_financial_connection_session:
		useCreateStripeFinancialConnectionSessionMutation,
	stripe_invoice: useCreateStripeInvoiceMutation,
	stripe_payment_method: useCreateStripePaymentMethodMutation,
	stripe_subscription: useCreateStripeSubscriptionMutation,
	user: useCreateUserMutation,
} as unknown as Record<WallotResourceName, MutationHook>;

/**
 * Generalized function to return the appropriate create operation mutation
 *
 * @param resourceName
 * @returns The appropriate create operation mutation for the given resource
 *
 * @example
 * const resourceName = '...'; // Assume a valid resource name, for example passed as a prop
 * const mutation = getCreateOperationMutationForResource(resourceName);
 * const { mutate, isLoading, error } = mutation({
 * 	onSuccess: () => { ... },
 * 	onError: () => { ... },
 * 	// Other options
 * });
 */
export function getCreateOperationMutationForResource<
	TResourceName extends WallotResourceName,
>(resourceName: TResourceName): MutationHook {
	const mutation = createOperationMutationMap[resourceName];
	if (!mutation) {
		throw new Error(
			`No create operation mutation found for resource: ${resourceName}`,
		);
	}
	return mutation;
}
