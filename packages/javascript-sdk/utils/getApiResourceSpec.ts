import { GeneralizedApiResourceSpec } from 'ergonomic';
import { WallotResourceName } from './WallotDatabaseTypes.js';
import { achTransfersApi } from '../achTransfers/index.js';
import { assetsApi } from '../assets/index.js';
import { assetOrdersApi } from '../assetOrders/index.js';
import { assetPricesApi } from '../assetPrices/index.js';
import { bankAccountsApi } from '../bankAccounts/index.js';
import { identityVerificationDocumentsApi } from '../identityVerificationDocuments/index.js';
import { invoicesApi } from '../invoices/index.js';
import { licensesApi } from '../licenses/index.js';
import { modelsApi } from '../models/index.js';
import { modelFamiliesApi } from '../modelFamilies/index.js';
import { newsReportsApi } from '../newsReports/index.js';
import { openAiModelsApi } from '../openAiModels/index.js';
import { openAiModelFamiliesApi } from '../openAiModelFamilies/index.js';
import { ordersApi } from '../orders/index.js';
import { parametersApi } from '../parameters/index.js';
import { positionsApi } from '../positions/index.js';
import { recommendationsApi } from '../recommendations/index.js';
import { usersApi } from '../users/index.js';

export const getApiResourceSpec = (
	resourceName: WallotResourceName,
): GeneralizedApiResourceSpec => {
	switch (resourceName) {
		case 'ach_transfer':
			return achTransfersApi as unknown as GeneralizedApiResourceSpec;
		case 'asset':
			return assetsApi as unknown as GeneralizedApiResourceSpec;
		case 'asset_order':
			return assetOrdersApi as unknown as GeneralizedApiResourceSpec;
		case 'asset_price':
			return assetPricesApi as unknown as GeneralizedApiResourceSpec;
		case 'bank_account':
			return bankAccountsApi as unknown as GeneralizedApiResourceSpec;
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
		case 'order':
			return ordersApi as unknown as GeneralizedApiResourceSpec;
		case 'parameter':
			return parametersApi as unknown as GeneralizedApiResourceSpec;
		case 'position':
			return positionsApi as unknown as GeneralizedApiResourceSpec;
		case 'recommendation':
			return recommendationsApi as unknown as GeneralizedApiResourceSpec;
		case 'user':
			return usersApi as unknown as GeneralizedApiResourceSpec;
		default:
			throw new Error(`Invalid resourceName: ${resourceName as string}`);
	}
};
