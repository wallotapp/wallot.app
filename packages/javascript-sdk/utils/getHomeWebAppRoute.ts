import {
	HomeWebAppRouteStaticId,
	HomeWebAppRouteQueryParams,
} from './routeDefinitions.js';

export type GetHomeWebAppRouteOptions<T extends HomeWebAppRouteStaticId> = {
	includeOrigin?: boolean;
	origin: string | null | undefined;
	queryParams: HomeWebAppRouteQueryParams[T];
	routeStaticId: T;
};

export const getHomeWebAppRoute = <T extends HomeWebAppRouteStaticId>(
	options: GetHomeWebAppRouteOptions<T>,
) => {
	const { includeOrigin = false, origin, routeStaticId } = options;
	if (includeOrigin && !origin) {
		console.error('Origin is required');
		return '/';
	}

	const clientToken = options.queryParams.client_token;
	const clientTokenQuery = clientToken ? `client_token=${clientToken}` : '';
	const queries = [clientTokenQuery].filter(Boolean);

	if (
		routeStaticId === 'HOME_WEB_APP__/ASSETS' ||
		routeStaticId === 'HOME_WEB_APP__/INDEX' ||
		routeStaticId === 'HOME_WEB_APP__/GET_STARTED'
	) {
		const path = `${
			routeStaticId === 'HOME_WEB_APP__/ASSETS'
				? '/assets'
				: routeStaticId === 'HOME_WEB_APP__/INDEX'
				? '/'
				: '/get-started'
		}${queries.length ? `?${queries.join('&')}` : ''}`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}

	if (
		routeStaticId === 'HOME_WEB_APP__/ORDERS/[ORDER_ID]/ASSETS' ||
		routeStaticId === 'HOME_WEB_APP__/ORDERS/[ORDER_ID]/CART' ||
		routeStaticId === 'HOME_WEB_APP__/ORDERS/[ORDER_ID]/CHECKOUT'
	) {
		const orderRouteQueryParams = options.queryParams as
			| HomeWebAppRouteQueryParams['HOME_WEB_APP__/ORDERS/[ORDER_ID]/ASSETS']
			| HomeWebAppRouteQueryParams['HOME_WEB_APP__/ORDERS/[ORDER_ID]/CART']
			| HomeWebAppRouteQueryParams['HOME_WEB_APP__/ORDERS/[ORDER_ID]/CHECKOUT'];
		const orderId = orderRouteQueryParams.order_id;
		if (!orderId) {
			console.error('order_id is required');
			return '/';
		}
		const path = `/orders/${orderId}${
			routeStaticId === 'HOME_WEB_APP__/ORDERS/[ORDER_ID]/ASSETS'
				? '/assets'
				: routeStaticId === 'HOME_WEB_APP__/ORDERS/[ORDER_ID]/CART'
				? '/cart'
				: '/checkout'
		}${queries.length ? `?${queries.join('&')}` : ''}`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}

	throw new Error('Invalid routeStaticId');
};
