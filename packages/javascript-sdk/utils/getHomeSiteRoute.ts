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

	const clientToken = options.queryParams.client_token;
	const clientTokenQuery = clientToken ? `client_token=${clientToken}` : '';
	const queries = [clientTokenQuery].filter(Boolean);

	if (routeStaticId === 'HOME_SITE__/ASSETS/[ASSET_ID]/TRACK') {
		const assetRouteQueryParams =
			options.queryParams as HomeSiteRouteQueryParams['HOME_SITE__/ASSETS/[ASSET_ID]/TRACK'];
		const assetId = assetRouteQueryParams.asset_id;
		if (!assetId) {
			console.error('asset_id is required');
			return '/';
		}
		const path = `/assets/${assetId}/track${
			queries.length ? `?${queries.join('&')}` : ''
		}`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}

	if (
		routeStaticId === 'HOME_SITE__/INDEX' ||
		routeStaticId === 'HOME_SITE__/GET_STARTED'
	) {
		const path = `${
			routeStaticId === 'HOME_SITE__/INDEX' ? '/' : '/get-started'
		}${queries.length ? `?${queries.join('&')}` : ''}`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}

	if (
		routeStaticId === 'HOME_SITE__/ORDERS/[ORDER_ID]/ASSETS' ||
		routeStaticId === 'HOME_SITE__/ORDERS/[ORDER_ID]/CART' ||
		routeStaticId === 'HOME_SITE__/ORDERS/[ORDER_ID]/CHECKOUT' ||
		routeStaticId === 'HOME_SITE__/ORDERS/[ORDER_ID]/CONGRATULATIONS'
	) {
		const orderRouteQueryParams = options.queryParams as
			| HomeSiteRouteQueryParams['HOME_SITE__/ORDERS/[ORDER_ID]/ASSETS']
			| HomeSiteRouteQueryParams['HOME_SITE__/ORDERS/[ORDER_ID]/CART']
			| HomeSiteRouteQueryParams['HOME_SITE__/ORDERS/[ORDER_ID]/CHECKOUT']
			| HomeSiteRouteQueryParams['HOME_SITE__/ORDERS/[ORDER_ID]/CONGRATULATIONS'];
		const orderId = orderRouteQueryParams.order_id;
		if (!orderId) {
			console.error('order_id is required');
			return '/';
		}
		const path = `/orders/${orderId}${
			routeStaticId === 'HOME_SITE__/ORDERS/[ORDER_ID]/ASSETS'
				? '/assets'
				: routeStaticId === 'HOME_SITE__/ORDERS/[ORDER_ID]/CART'
				? '/cart'
				: routeStaticId === 'HOME_SITE__/ORDERS/[ORDER_ID]/CHECKOUT'
				? '/checkout'
				: '/congratulations'
		}${queries.length ? `?${queries.join('&')}` : ''}`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}

	throw new Error('Invalid routeStaticId');
};
