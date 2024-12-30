import { Order } from '@wallot/js';
import { useQueryResourcesForLoggedInUser } from '@wallot/react/src/hooks/useQueryResourcesForLoggedInUser';

export const useQueryOrdersForLoggedInUser =
	useQueryResourcesForLoggedInUser<Order>('order');
