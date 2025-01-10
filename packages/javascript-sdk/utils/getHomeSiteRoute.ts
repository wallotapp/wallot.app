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
		'HOME_SITE__/ACCOUNT/BANKING': '/account/banking',
		'HOME_SITE__/ACCOUNT/OVERVIEW': '/account/overview',
		'HOME_SITE__/ACCOUNT/PLANS': '/account/plans',
		'HOME_SITE__/ACCOUNT/POSITIONS': '/account/positions',
		'HOME_SITE__/ACCOUNT/SETTINGS': '/account/settings',
		'HOME_SITE__/ACCOUNT/STATEMENTS': '/account/statements',
		'HOME_SITE__/ACCOUNT/TRANSACTIONS': '/account/transactions',
		'HOME_SITE__/INDEX': '/',
		'HOME_SITE__/GET_STARTED': '/get-started',
		'HOME_SITE__/OAUTH/CALLBACK': '/oauth/callback',
		'HOME_SITE__/ORDERS/[ORDER_ID]/ASSETS': '/assets',
		'HOME_SITE__/ORDERS/[ORDER_ID]/CART': '/cart',
		'HOME_SITE__/ORDERS/[ORDER_ID]/CHECKOUT': '/checkout',
		'HOME_SITE__/ORDERS/[ORDER_ID]/CONGRATULATIONS': '/congratulations',
		'HOME_SITE__/ORDERS/[ORDER_ID]/TRACK': '/track',
		'HOME_SITE__/TERMS': '/terms',
		'HOME_SITE__/PRIVACY': '/privacy',
	}[routeStaticId];

	if (routeStaticId === 'HOME_SITE__/OAUTH/CALLBACK') {
		const queryParams =
			options.queryParams as HomeSiteRouteQueryParams['HOME_SITE__/OAUTH/CALLBACK'];
		const code = queryParams.code;
		const codeQuery = code ? `code=${code}` : '';
		const queries = [codeQuery].filter(Boolean);
		const query = queries.length ? `?${queries.join('&')}` : '';
		const fullPath = `${path}${query}`;
		if (includeOrigin) return `${origin as string}${fullPath}`;
		return fullPath;
	}

	const queryParams = options.queryParams as Exclude<
		HomeSiteRouteQueryParams[T],
		HomeSiteRouteQueryParams['HOME_SITE__/OAUTH/CALLBACK']
	>;
	const clientToken = queryParams.client_token;
	const clientTokenQuery = clientToken ? `client_token=${clientToken}` : '';
	const queries = [clientTokenQuery].filter(Boolean);
	if (
		routeStaticId === 'HOME_SITE__/ACCOUNT/BANKING' ||
		routeStaticId === 'HOME_SITE__/ACCOUNT/OVERVIEW' ||
		routeStaticId === 'HOME_SITE__/ACCOUNT/PLANS' ||
		routeStaticId === 'HOME_SITE__/ACCOUNT/POSITIONS' ||
		routeStaticId === 'HOME_SITE__/ACCOUNT/SETTINGS' ||
		routeStaticId === 'HOME_SITE__/ACCOUNT/STATEMENTS' ||
		routeStaticId === 'HOME_SITE__/ACCOUNT/TRANSACTIONS' ||
		routeStaticId === 'HOME_SITE__/INDEX' ||
		routeStaticId === 'HOME_SITE__/GET_STARTED' ||
		routeStaticId === 'HOME_SITE__/TERMS' ||
		routeStaticId === 'HOME_SITE__/PRIVACY'
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
