import { Order } from '@wallot/js';
import { useQueryResourcesForLoggedInUser } from '@wallot/react/src/hooks/useQueryResourcesForLoggedInUser';

export function useQueryOrdersForLoggedInUser() {
	return useQueryResourcesForLoggedInUser<Order>('order')();
}
