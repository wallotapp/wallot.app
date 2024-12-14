import { GeneralizedApiResourceSpec } from 'ergonomic';
import { WallotCollection } from './WallotDatabaseTypes.js';
import { authCredentialsApi } from '../authCredentials/index.js';
import { forecastsApi } from '../forecasts/index.js';
import { fundingAccountsApi } from '../fundingAccounts/index.js';
import { invoicesApi } from '../invoices/index.js';
import { licensesApi } from '../licenses/index.js';
import { modelsApi } from '../models/index.js';
import { ordersApi } from '../orders/index.js';
import { paymentMethodsApi } from '../paymentMethods/index.js';
import { positionsApi } from '../positions/index.js';
import { recommendationsApi } from '../recommendations/index.js';
import { stocksApi } from '../stocks/index.js';
import { systemIncidentsApi } from '../systemIncidents/index.js';
import { systemIncidentUpdatesApi } from '../systemIncidentUpdates/index.js';
import { systemServicesApi } from '../systemServices/index.js';
import { transactionsApi } from '../transactions/index.js';
import { usersApi } from '../users/index.js';

export const getApiResourceSpec = (
	collectionId: WallotCollection,
): GeneralizedApiResourceSpec => {
	switch (collectionId) {
		case 'auth_credential':
			return authCredentialsApi as unknown as GeneralizedApiResourceSpec;
		case 'forecast':
			return forecastsApi as unknown as GeneralizedApiResourceSpec;
		case 'funding_account':
			return fundingAccountsApi as unknown as GeneralizedApiResourceSpec;
		case 'invoice':
			return invoicesApi as unknown as GeneralizedApiResourceSpec;
		case 'license':
			return licensesApi as unknown as GeneralizedApiResourceSpec;
		case 'model':
			return modelsApi as unknown as GeneralizedApiResourceSpec;
		case 'order':
			return ordersApi as unknown as GeneralizedApiResourceSpec;
		case 'payment_method':
			return paymentMethodsApi as unknown as GeneralizedApiResourceSpec;
		case 'position':
			return positionsApi as unknown as GeneralizedApiResourceSpec;
		case 'recommendation':
			return recommendationsApi as unknown as GeneralizedApiResourceSpec;
		case 'stock':
			return stocksApi as unknown as GeneralizedApiResourceSpec;
		case 'system_incident':
			return systemIncidentsApi as unknown as GeneralizedApiResourceSpec;
		case 'system_incident_update':
			return systemIncidentUpdatesApi as unknown as GeneralizedApiResourceSpec;
		case 'system_service':
			return systemServicesApi as unknown as GeneralizedApiResourceSpec;
		case 'transaction':
			return transactionsApi as unknown as GeneralizedApiResourceSpec;
		case 'user':
			return usersApi as unknown as GeneralizedApiResourceSpec;
		default:
			throw new Error(`Invalid collectionId: ${collectionId as string}`);
	}
};
