import { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { GeneralizedResponse } from 'ergonomic';
import { WallotCollection } from '@wallot/js';

import { useUpdateAuthCredentialMutation } from '@wallot/react/src/features/authCredentials';
import { useUpdateForecastMutation } from '@wallot/react/src/features/forecasts';
import { useUpdateFundingAccountMutation } from '@wallot/react/src/features/fundingAccounts';
import { useUpdateInvoiceMutation } from '@wallot/react/src/features/invoices';
import { useUpdateLicenseMutation } from '@wallot/react/src/features/licenses';
import { useUpdateModelMutation } from '@wallot/react/src/features/models';
import { useUpdateOrderMutation } from '@wallot/react/src/features/orders';
import { useUpdatePaymentMethodMutation } from '@wallot/react/src/features/paymentMethods';
import { useUpdatePositionMutation } from '@wallot/react/src/features/positions';
import { useUpdateRecommendationMutation } from '@wallot/react/src/features/recommendations';
import { useUpdateStockMutation } from '@wallot/react/src/features/stocks';
import { useUpdateSystemIncidentMutation } from '@wallot/react/src/features/systemIncidents';
import { useUpdateSystemIncidentUpdateMutation } from '@wallot/react/src/features/systemIncidentUpdates';
import { useUpdateSystemServiceMutation } from '@wallot/react/src/features/systemServices';
import { useUpdateTeamMutation } from '@wallot/react/src/features/teams';
import { useUpdateTransactionMutation } from '@wallot/react/src/features/transactions';
import { useUpdateUserMutation } from '@wallot/react/src/features/users';

type MutationHook = (
	options: UseMutationOptions<unknown, GeneralizedResponse>,
) => UseMutationResult;

// Map of collection IDs to their respective mutations
const updateOperationMutationMap = {
	auth_credential: useUpdateAuthCredentialMutation,
	forecast: useUpdateForecastMutation,
	funding_account: useUpdateFundingAccountMutation,
	invoice: useUpdateInvoiceMutation,
	license: useUpdateLicenseMutation,
	model: useUpdateModelMutation,
	order: useUpdateOrderMutation,
	payment_method: useUpdatePaymentMethodMutation,
	position: useUpdatePositionMutation,
	recommendation: useUpdateRecommendationMutation,
	stock: useUpdateStockMutation,
	system_incident: useUpdateSystemIncidentMutation,
	system_incident_update: useUpdateSystemIncidentUpdateMutation,
	system_service: useUpdateSystemServiceMutation,
	team: useUpdateTeamMutation,
	transaction: useUpdateTransactionMutation,
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
