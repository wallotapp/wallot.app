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
	const { includeOrigin = false, origin } = options;
	if (includeOrigin && !origin) {
		console.error('Origin is required');
		return '/';
	}
	if (options.routeStaticId === 'HOME_WEB_APP__/ASSETS') {
		const path = `/assets`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}
	if (options.routeStaticId === 'HOME_WEB_APP__/CONFIRM_FINANCIAL_CONNECTION') {
		const path = `/confirm-financial-connection`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}
	if (options.routeStaticId === 'HOME_WEB_APP__/INDEX') {
		const path = `/`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}
	if (options.routeStaticId === 'HOME_WEB_APP__/GET_STARTED') {
		const path = `/get-started`;
		const queryParams =
			options.queryParams as HomeWebAppRouteQueryParams['HOME_WEB_APP__/GET_STARTED'];
		const step = queryParams.step;
		const stepQuery = step ? `step=${step}` : '';
		const queries = [stepQuery].filter(Boolean);
		if (includeOrigin)
			return `${origin as string}${path}${
				queries.length ? `?${queries.join('&')}` : ''
			}`;
		return path;
	}
	if (options.routeStaticId === 'HOME_WEB_APP__/ORDERS/[ORDER_ID]/CONFIRM') {
		const queryParams =
			options.queryParams as HomeWebAppRouteQueryParams['HOME_WEB_APP__/ORDERS/[ORDER_ID]/CONFIRM'];
		const orderId = queryParams.order_id;
		if (!orderId) {
			console.error('order_id is required');
			return '/';
		}
		const path = `/orders/${orderId}/confirm`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}
	if (
		options.routeStaticId ===
		'HOME_WEB_APP__/RECOMMENDATIONS/[RECOMMENDATION_ID]/DETAILS'
	) {
		const queryParams =
			options.queryParams as HomeWebAppRouteQueryParams['HOME_WEB_APP__/RECOMMENDATIONS/[RECOMMENDATION_ID]/DETAILS'];
		const recommendationId = queryParams.recommendation_id;
		if (!recommendationId) {
			console.error('recommendation_id is required');
			return '/';
		}
		const clientToken = queryParams.client_token;
		const clientTokenQuery = clientToken ? `client_token=${clientToken}` : '';
		const queries = [clientTokenQuery].filter(Boolean);
		const path = `/recommendations/${recommendationId}/details${
			queries.length ? `?${queries.join('&')}` : ''
		}`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}
	throw new Error('Invalid routeStaticId');
};
