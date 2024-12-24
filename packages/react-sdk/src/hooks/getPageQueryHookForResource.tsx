import { GeneralizedApiResource, GeneralizedError } from 'ergonomic';
import { UseQueryResult } from '@tanstack/react-query';
import { GeneralizedFirestoreCollectionPage } from 'ergonomic-react/src/features/data/utils/generalizedFirestoreCollectionPageQuery';
import { GeneralizedUseQueryPageProps } from 'ergonomic-react/src/lib/tanstackQuery';
import { WallotResourceName } from '@wallot/js';

import { useQueryAchTransferPage } from '@wallot/react/src/features/achTransfers';
import { useQueryAssetPage } from '@wallot/react/src/features/assets';
import { useQueryAssetOrderPage } from '@wallot/react/src/features/assetOrders';
import { useQueryAssetPricePage } from '@wallot/react/src/features/assetPrices';
import { useQueryBankAccountPage } from '@wallot/react/src/features/bankAccounts';
import { useQueryIdentityVerificationDocumentPage } from '@wallot/react/src/features/identityVerificationDocuments';
import { useQueryInvoicePage } from '@wallot/react/src/features/invoices';
import { useQueryLicensePage } from '@wallot/react/src/features/licenses';
import { useQueryModelPage } from '@wallot/react/src/features/models';
import { useQueryModelFamilyPage } from '@wallot/react/src/features/modelFamilies';
import { useQueryNewsReportPage } from '@wallot/react/src/features/newsReports';
import { useQueryOpenAiModelPage } from '@wallot/react/src/features/openAiModels';
import { useQueryOpenAiModelFamilyPage } from '@wallot/react/src/features/openAiModelFamilies';
import { useQueryOrderPage } from '@wallot/react/src/features/orders';
import { useQueryParameterPage } from '@wallot/react/src/features/parameters';
import { useQueryPositionPage } from '@wallot/react/src/features/positions';
import { useQueryRecommendationPage } from '@wallot/react/src/features/recommendations';
import { useQueryUserPage } from '@wallot/react/src/features/users';

type PageQueryHook = (
	options: GeneralizedUseQueryPageProps<GeneralizedApiResource>,
) => UseQueryResult<GeneralizedFirestoreCollectionPage, GeneralizedError>;

// Map of resource names to their respective hooks
const queryHookMap = {
	ach_transfer: useQueryAchTransferPage,
	asset: useQueryAssetPage,
	asset_order: useQueryAssetOrderPage,
	asset_price: useQueryAssetPricePage,
	bank_account: useQueryBankAccountPage,
	identity_verification_document: useQueryIdentityVerificationDocumentPage,
	invoice: useQueryInvoicePage,
	license: useQueryLicensePage,
	model: useQueryModelPage,
	model_family: useQueryModelFamilyPage,
	news_report: useQueryNewsReportPage,
	open_ai_model: useQueryOpenAiModelPage,
	open_ai_model_family: useQueryOpenAiModelFamilyPage,
	order: useQueryOrderPage,
	parameter: useQueryParameterPage,
	position: useQueryPositionPage,
	recommendation: useQueryRecommendationPage,
	user: useQueryUserPage,
} as Record<WallotResourceName, PageQueryHook>;

const fallbackPageQueryHookForResource = (() => ({
	data: { documents: [] as GeneralizedApiResource[] },
	isLoading: false,
	error: null,
})) as unknown as PageQueryHook;

/**
 * Generalized function to return the appropriate hook
 *
 * @param resourceName
 * @returns The appropriate hook for the given resource
 *
 * @example
 * const resourceName = '...'; // Assume a valid resource name, for example passed as a prop
 * const hook = getPageQueryHookForResource(resourceName);
 * const { data, isLoading, error } = hook({ firestoreQueryOptions });
 */
export const getPageQueryHookForResource = (
	resourceName: string | null,
): PageQueryHook => {
	if (resourceName == null) {
		return fallbackPageQueryHookForResource;
	}

	const hook = queryHookMap[resourceName as WallotResourceName];
	if (!hook) {
		throw new Error(`No hook found for resource: ${resourceName}`);
	}
	return hook;
};
