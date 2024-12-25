import { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { GeneralizedError } from 'ergonomic';
import { WallotResourceName } from '@wallot/js';

import { useUpdateAchTransferMutation } from '@wallot/react/src/features/achTransfers';
import { useUpdateAssetMutation } from '@wallot/react/src/features/assets';
import { useUpdateAssetOrderMutation } from '@wallot/react/src/features/assetOrders';
import { useUpdateAssetPriceMutation } from '@wallot/react/src/features/assetPrices';
import { useUpdateBankAccountMutation } from '@wallot/react/src/features/bankAccounts';
import { useUpdateIdentityVerificationDocumentMutation } from '@wallot/react/src/features/identityVerificationDocuments';
import { useUpdateInvoiceMutation } from '@wallot/react/src/features/invoices';
import { useUpdateLicenseMutation } from '@wallot/react/src/features/licenses';
import { useUpdateModelMutation } from '@wallot/react/src/features/models';
import { useUpdateModelFamilyMutation } from '@wallot/react/src/features/modelFamilies';
import { useUpdateNewsReportMutation } from '@wallot/react/src/features/newsReports';
import { useUpdateOpenAiModelMutation } from '@wallot/react/src/features/openAiModels';
import { useUpdateOpenAiModelFamilyMutation } from '@wallot/react/src/features/openAiModelFamilies';
import { useUpdateOrderMutation } from '@wallot/react/src/features/orders';
import { useUpdateParameterMutation } from '@wallot/react/src/features/parameters';
import { useUpdatePositionMutation } from '@wallot/react/src/features/positions';
import { useUpdateRecommendationMutation } from '@wallot/react/src/features/recommendations';
import { useUpdateUserMutation } from '@wallot/react/src/features/users';

type MutationHook = (options: UseMutationOptions<unknown, GeneralizedError>) => UseMutationResult;

// Map of resource names to their respective mutations
const updateOperationMutationMap = {
	ach_transfer: useUpdateAchTransferMutation,
	asset: useUpdateAssetMutation,
	asset_order: useUpdateAssetOrderMutation,
	asset_price: useUpdateAssetPriceMutation,
	bank_account: useUpdateBankAccountMutation,
	identity_verification_document: useUpdateIdentityVerificationDocumentMutation,
	invoice: useUpdateInvoiceMutation,
	license: useUpdateLicenseMutation,
	model: useUpdateModelMutation,
	model_family: useUpdateModelFamilyMutation,
	news_report: useUpdateNewsReportMutation,
	open_ai_model: useUpdateOpenAiModelMutation,
	open_ai_model_family: useUpdateOpenAiModelFamilyMutation,
	order: useUpdateOrderMutation,
	parameter: useUpdateParameterMutation,
	position: useUpdatePositionMutation,
	recommendation: useUpdateRecommendationMutation,
	user: useUpdateUserMutation,
} as unknown as Record<WallotResourceName, MutationHook>;

/**
 * Generalized function to return the appropriate update operation mutation
 *
 * @param resourceName
 * @returns The appropriate update operation mutation for the given resource
 *
 * @example
 * const resourceName = '...'; // Assume a valid resource name, for example passed as a prop
 * const mutation = getUpdateOperationMutationForResource(resourceName);
 * const { mutate, isLoading, error } = mutation({
 * 	onSuccess: () => { ... },
 * 	onError: () => { ... },
 * 	// Other options
 * });
 */
export function getUpdateOperationMutationForResource<TResourceName extends WallotResourceName>(resourceName: TResourceName): MutationHook {
	const mutation = updateOperationMutationMap[resourceName];
	if (!mutation) {
		throw new Error(`No update operation mutation found for resource: ${resourceName}`);
	}
	return mutation;
}
