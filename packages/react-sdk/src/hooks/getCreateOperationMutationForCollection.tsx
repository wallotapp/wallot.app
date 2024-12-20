import { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { GeneralizedResponse } from 'ergonomic';
import { WallotCollection } from '@wallot/js';

import { useCreateAuthCredentialMutation } from '@wallot/react/src/features/authCredentials';
import { useCreateForecastMutation } from '@wallot/react/src/features/forecasts';
import { useCreateFundingAccountMutation } from '@wallot/react/src/features/fundingAccounts';
import { useCreateInvoiceMutation } from '@wallot/react/src/features/invoices';
import { useCreateLicenseMutation } from '@wallot/react/src/features/licenses';
import { useCreateModelMutation } from '@wallot/react/src/features/models';
import { useCreateOrderMutation } from '@wallot/react/src/features/orders';
import { useCreatePaymentMethodMutation } from '@wallot/react/src/features/paymentMethods';
import { useCreatePositionMutation } from '@wallot/react/src/features/positions';
import { useCreateRecommendationMutation } from '@wallot/react/src/features/recommendations';
import { useCreateStockMutation } from '@wallot/react/src/features/stocks';
import { useCreateSystemIncidentMutation } from '@wallot/react/src/features/systemIncidents';
import { useCreateSystemIncidentUpdateMutation } from '@wallot/react/src/features/systemIncidentUpdates';
import { useCreateSystemServiceMutation } from '@wallot/react/src/features/systemServices';
import { useCreateTeamMutation } from '@wallot/react/src/features/teams';
import { useCreateTransactionMutation } from '@wallot/react/src/features/transactions';
import { useCreateUserMutation } from '@wallot/react/src/features/users';

type MutationHook = (
	options: UseMutationOptions<unknown, GeneralizedResponse>,
) => UseMutationResult;

// Map of collection IDs to their respective mutations
const createOperationMutationMap = {
	auth_credential: useCreateAuthCredentialMutation,
	forecast: useCreateForecastMutation,
	funding_account: useCreateFundingAccountMutation,
	invoice: useCreateInvoiceMutation,
	license: useCreateLicenseMutation,
	model: useCreateModelMutation,
	order: useCreateOrderMutation,
	payment_method: useCreatePaymentMethodMutation,
	position: useCreatePositionMutation,
	recommendation: useCreateRecommendationMutation,
	stock: useCreateStockMutation,
	system_incident: useCreateSystemIncidentMutation,
	system_incident_update: useCreateSystemIncidentUpdateMutation,
	system_service: useCreateSystemServiceMutation,
	team: useCreateTeamMutation,
	transaction: useCreateTransactionMutation,
	user: useCreateUserMutation,
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
