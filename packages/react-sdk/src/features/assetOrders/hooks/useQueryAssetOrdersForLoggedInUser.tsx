import { useQueryOrdersForLoggedInUser } from '@wallot/react/src/features/orders/hooks/useQueryOrdersForLoggedInUser';
import { useQueryAssetOrderPage } from '@wallot/react/src/features/assetOrders/hooks/useQueryAssetOrderPage';

export function useQueryAssetOrdersForLoggedInUser() {
	const {
		resourcesForLoggedInUser: ordersForLoggedInUser,
		isResourcePageLoading: isOrderPageLoading,
	} = useQueryOrdersForLoggedInUser();

	const isAssetOrderPageQueryEnabled = !isOrderPageLoading;
	const orderIds = ordersForLoggedInUser.map(({ _id }) => _id);
	const assetOrderPageObserver = useQueryAssetOrderPage({
		firestoreQueryOptions: {
			whereClauses: [['order', 'in', orderIds]],
		},
		reactQueryOptions: {
			enabled: isAssetOrderPageQueryEnabled,
		},
	});
	const assetOrdersForLoggedInUser =
		assetOrderPageObserver.data?.documents ?? [];

	return {
		assetOrdersForLoggedInUser,
		isAssetOrdersForLoggedInUserError: assetOrderPageObserver.isError,
		isAssetOrdersForLoggedInUserLoading:
			isOrderPageLoading ||
			!isAssetOrderPageQueryEnabled ||
			assetOrderPageObserver.isLoading,
		isAssetOrderForLoggedInUserQueryEnabled: isAssetOrderPageQueryEnabled,
		...assetOrderPageObserver,
	};
}
