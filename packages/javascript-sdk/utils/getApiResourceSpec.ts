import { GeneralizedApiResourceSpec } from 'ergonomic';
import { WallotResourceName } from './WallotDatabaseTypes.js';
import { achTransfersApi } from '../achTransfers/index.js';
import { alpacaAccountsApi } from '../alpacaAccounts/index.js';
import { alpacaAchRelationshipsApi } from '../alpacaAchRelationships/index.js';
import { alpacaAssetsApi } from '../alpacaAssets/index.js';
import { alpacaOrdersApi } from '../alpacaOrders/index.js';
import { alpacaPositionsApi } from '../alpacaPositions/index.js';
import { alphaVantageCompaniesApi } from '../alphaVantageCompanies/index.js';
import { assetsApi } from '../assets/index.js';
import { assetOrdersApi } from '../assetOrders/index.js';
import { assetPricesApi } from '../assetPrices/index.js';
import { authCredentialsApi } from '../authCredentials/index.js';
import { bankAccountsApi } from '../bankAccounts/index.js';
import { equityAccountsApi } from '../equityAccounts/index.js';
import { identityVerificationDocumentsApi } from '../identityVerificationDocuments/index.js';
import { invoicesApi } from '../invoices/index.js';
import { licensesApi } from '../licenses/index.js';
import { modelsApi } from '../models/index.js';
import { modelFamiliesApi } from '../modelFamilies/index.js';
import { newsReportsApi } from '../newsReports/index.js';
import { openAiModelsApi } from '../openAiModels/index.js';
import { openAiModelFamiliesApi } from '../openAiModelFamilies/index.js';
import { openAiRecommendationsApi } from '../openAiRecommendations/index.js';
import { ordersApi } from '../orders/index.js';
import { parametersApi } from '../parameters/index.js';
import { paymentMethodsApi } from '../paymentMethods/index.js';
import { positionsApi } from '../positions/index.js';
import { recommendationsApi } from '../recommendations/index.js';
import { stripeCustomersApi } from '../stripeCustomers/index.js';
import { stripeFinancialConnectionAccountsApi } from '../stripeFinancialConnectionAccounts/index.js';
import { stripeFinancialConnectionSessionsApi } from '../stripeFinancialConnectionSessions/index.js';
import { stripeInvoicesApi } from '../stripeInvoices/index.js';
import { stripePaymentMethodsApi } from '../stripePaymentMethods/index.js';
import { stripeSubscriptionsApi } from '../stripeSubscriptions/index.js';
import { usersApi } from '../users/index.js';

export const getApiResourceSpec = (
	resourceName: WallotResourceName,
): GeneralizedApiResourceSpec => {
	switch (resourceName) {
		case 'ach_transfer':
			return achTransfersApi as unknown as GeneralizedApiResourceSpec;
		case 'alpaca_account':
			return alpacaAccountsApi as unknown as GeneralizedApiResourceSpec;
		case 'alpaca_ach_relationship':
			return alpacaAchRelationshipsApi as unknown as GeneralizedApiResourceSpec;
		case 'alpaca_asset':
			return alpacaAssetsApi as unknown as GeneralizedApiResourceSpec;
		case 'alpaca_order':
			return alpacaOrdersApi as unknown as GeneralizedApiResourceSpec;
		case 'alpaca_position':
			return alpacaPositionsApi as unknown as GeneralizedApiResourceSpec;
		case 'alpha_vantage_company':
			return alphaVantageCompaniesApi as unknown as GeneralizedApiResourceSpec;
		case 'asset':
			return assetsApi as unknown as GeneralizedApiResourceSpec;
		case 'asset_order':
			return assetOrdersApi as unknown as GeneralizedApiResourceSpec;
		case 'asset_price':
			return assetPricesApi as unknown as GeneralizedApiResourceSpec;
		case 'auth_credential':
			return authCredentialsApi as unknown as GeneralizedApiResourceSpec;
		case 'bank_account':
			return bankAccountsApi as unknown as GeneralizedApiResourceSpec;
		case 'equity_account':
			return equityAccountsApi as unknown as GeneralizedApiResourceSpec;
		case 'identity_verification_document':
			return identityVerificationDocumentsApi as unknown as GeneralizedApiResourceSpec;
		case 'invoice':
			return invoicesApi as unknown as GeneralizedApiResourceSpec;
		case 'license':
			return licensesApi as unknown as GeneralizedApiResourceSpec;
		case 'model':
			return modelsApi as unknown as GeneralizedApiResourceSpec;
		case 'model_family':
			return modelFamiliesApi as unknown as GeneralizedApiResourceSpec;
		case 'news_report':
			return newsReportsApi as unknown as GeneralizedApiResourceSpec;
		case 'open_ai_model':
			return openAiModelsApi as unknown as GeneralizedApiResourceSpec;
		case 'open_ai_model_family':
			return openAiModelFamiliesApi as unknown as GeneralizedApiResourceSpec;
		case 'open_ai_recommendation':
			return openAiRecommendationsApi as unknown as GeneralizedApiResourceSpec;
		case 'order':
			return ordersApi as unknown as GeneralizedApiResourceSpec;
		case 'parameter':
			return parametersApi as unknown as GeneralizedApiResourceSpec;
		case 'payment_method':
			return paymentMethodsApi as unknown as GeneralizedApiResourceSpec;
		case 'position':
			return positionsApi as unknown as GeneralizedApiResourceSpec;
		case 'recommendation':
			return recommendationsApi as unknown as GeneralizedApiResourceSpec;
		case 'stripe_customer':
			return stripeCustomersApi as unknown as GeneralizedApiResourceSpec;
		case 'stripe_financial_connection_account':
			return stripeFinancialConnectionAccountsApi as unknown as GeneralizedApiResourceSpec;
		case 'stripe_financial_connection_session':
			return stripeFinancialConnectionSessionsApi as unknown as GeneralizedApiResourceSpec;
		case 'stripe_invoice':
			return stripeInvoicesApi as unknown as GeneralizedApiResourceSpec;
		case 'stripe_payment_method':
			return stripePaymentMethodsApi as unknown as GeneralizedApiResourceSpec;
		case 'stripe_subscription':
			return stripeSubscriptionsApi as unknown as GeneralizedApiResourceSpec;
		case 'user':
			return usersApi as unknown as GeneralizedApiResourceSpec;
		default:
			throw new Error(`Invalid resourceName: ${resourceName as string}`);
	}
};
