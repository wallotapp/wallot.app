import { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { GeneralizedError } from 'ergonomic';
import { WallotResourceName } from '@wallot/js';

import { useCreateAchTransferMutation } from '@wallot/react/src/features/achTransfers';
import { useCreateAssetMutation } from '@wallot/react/src/features/assets';
import { useCreateAssetOrderMutation } from '@wallot/react/src/features/assetOrders';
import { useCreateAssetPriceMutation } from '@wallot/react/src/features/assetPrices';
import { useCreateBankAccountMutation } from '@wallot/react/src/features/bankAccounts';
import { useCreateIdentityVerificationDocumentMutation } from '@wallot/react/src/features/identityVerificationDocuments';
import { useCreateInvoiceMutation } from '@wallot/react/src/features/invoices';
import { useCreateLicenseMutation } from '@wallot/react/src/features/licenses';
import { useCreateModelMutation } from '@wallot/react/src/features/models';
import { useCreateModelFamilyMutation } from '@wallot/react/src/features/modelFamilies';
import { useCreateNewsReportMutation } from '@wallot/react/src/features/newsReports';
import { useCreateOpenAiModelMutation } from '@wallot/react/src/features/openAiModels';
import { useCreateOpenAiModelFamilyMutation } from '@wallot/react/src/features/openAiModelFamilies';
import { useCreateOrderMutation } from '@wallot/react/src/features/orders';
import { useCreateParameterMutation } from '@wallot/react/src/features/parameters';
import { useCreatePositionMutation } from '@wallot/react/src/features/positions';
import { useCreateRecommendationMutation } from '@wallot/react/src/features/recommendations';
import { useCreateScholarshipApplicationMutation } from '@wallot/react/src/features/scholarshipApplications';
import { useCreateUserMutation } from '@wallot/react/src/features/users';

type MutationHook = (
	options: UseMutationOptions<unknown, GeneralizedError>,
) => UseMutationResult;

// Map of resource names to their respective mutations
const createOperationMutationMap = {
	ach_transfer: useCreateAchTransferMutation,
	asset: useCreateAssetMutation,
	asset_order: useCreateAssetOrderMutation,
	asset_price: useCreateAssetPriceMutation,
	bank_account: useCreateBankAccountMutation,
	identity_verification_document: useCreateIdentityVerificationDocumentMutation,
	invoice: useCreateInvoiceMutation,
	license: useCreateLicenseMutation,
	model: useCreateModelMutation,
	model_family: useCreateModelFamilyMutation,
	news_report: useCreateNewsReportMutation,
	open_ai_model: useCreateOpenAiModelMutation,
	open_ai_model_family: useCreateOpenAiModelFamilyMutation,
	order: useCreateOrderMutation,
	parameter: useCreateParameterMutation,
	position: useCreatePositionMutation,
	recommendation: useCreateRecommendationMutation,
	scholarship_application: useCreateScholarshipApplicationMutation,
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
