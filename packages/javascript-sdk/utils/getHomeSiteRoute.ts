import {
	HomeSiteRouteStaticId,
	HomeSiteRouteQueryParams,
} from './routeDefinitions.js';

export type GetHomeSiteRouteOptions<T extends HomeSiteRouteStaticId> = {
	includeOrigin?: boolean;
	origin: string | null | undefined;
	queryParams: HomeSiteRouteQueryParams[T];
	routeStaticId: T;
};

export const getHomeSiteRoute = <T extends HomeSiteRouteStaticId>(
	options: GetHomeSiteRouteOptions<T>,
) => {
	const { includeOrigin = false, origin, routeStaticId } = options;
	if (includeOrigin && !origin) {
		console.error('Origin is required');
		return '/';
	}

	const path = {
		'HOME_SITE__/ACCOUNT/OVERVIEW': '/account/overview',
		'HOME_SITE__/INDEX': '/',
		'HOME_SITE__/GET_STARTED': '/get-started',
		'HOME_SITE__/ORDERS/[ORDER_ID]/ASSETS': '/assets',
		'HOME_SITE__/ORDERS/[ORDER_ID]/CART': '/cart',
		'HOME_SITE__/ORDERS/[ORDER_ID]/CHECKOUT': '/checkout',
		'HOME_SITE__/ORDERS/[ORDER_ID]/CONGRATULATIONS': '/congratulations',
		'HOME_SITE__/ORDERS/[ORDER_ID]/TRACK': '/track',
	}[routeStaticId];

	const clientToken = options.queryParams.client_token;
	const clientTokenQuery = clientToken ? `client_token=${clientToken}` : '';
	const queries = [clientTokenQuery].filter(Boolean);
	if (
		routeStaticId === 'HOME_SITE__/ACCOUNT/OVERVIEW' ||
		routeStaticId === 'HOME_SITE__/INDEX' ||
		routeStaticId === 'HOME_SITE__/GET_STARTED'
	) {
		const query = queries.length ? `?${queries.join('&')}` : '';
		const fullPath = `${path}${query}`;
		if (includeOrigin) return `${origin as string}${fullPath}`;
		return fullPath;
	}

	if (
		routeStaticId === 'HOME_SITE__/ORDERS/[ORDER_ID]/ASSETS' ||
		routeStaticId === 'HOME_SITE__/ORDERS/[ORDER_ID]/CART' ||
		routeStaticId === 'HOME_SITE__/ORDERS/[ORDER_ID]/CHECKOUT' ||
		routeStaticId === 'HOME_SITE__/ORDERS/[ORDER_ID]/CONGRATULATIONS' ||
		routeStaticId === 'HOME_SITE__/ORDERS/[ORDER_ID]/TRACK'
	) {
		const orderRouteQueryParams = options.queryParams as
			| HomeSiteRouteQueryParams['HOME_SITE__/ORDERS/[ORDER_ID]/ASSETS']
			| HomeSiteRouteQueryParams['HOME_SITE__/ORDERS/[ORDER_ID]/CART']
			| HomeSiteRouteQueryParams['HOME_SITE__/ORDERS/[ORDER_ID]/CHECKOUT']
			| HomeSiteRouteQueryParams['HOME_SITE__/ORDERS/[ORDER_ID]/CONGRATULATIONS']
			| HomeSiteRouteQueryParams['HOME_SITE__/ORDERS/[ORDER_ID]/TRACK'];
		const orderId = orderRouteQueryParams.order_id;
		if (!orderId) {
			console.error('order_id is required');
			return '/';
		}
		const query = queries.length ? `?${queries.join('&')}` : '';
		const fullPath = `/orders/${orderId}${path}${query}`;
		if (includeOrigin) return `${origin as string}${fullPath}`;
		return fullPath;
	}

	throw new Error('Invalid routeStaticId');
};
