import {
	SsoWebAppRouteStaticId,
	SsoWebAppRouteQueryParams,
} from './routeDefinitions.js';

export type GetSsoWebAppRouteOptions<T extends SsoWebAppRouteStaticId> = {
	includeOrigin?: boolean;
	origin: string | null | undefined;
	queryParams: SsoWebAppRouteQueryParams[T];
	routeStaticId: T;
};

export const getSsoWebAppRoute = <T extends SsoWebAppRouteStaticId>(
	options: GetSsoWebAppRouteOptions<T>,
) => {
	const { includeOrigin = false, origin } = options;
	if (options.routeStaticId === 'SSO_WEB_APP__/INDEX') {
		const path = `/`;
		if (includeOrigin) {
			if (!origin) {
				console.error('Origin is required');
				return '/';
			}
			return `${origin}${path}`;
		}
		return path;
	}
	if (options.routeStaticId === 'SSO_WEB_APP__/REGISTER') {
		const queryParams =
			options.queryParams as SsoWebAppRouteQueryParams['SSO_WEB_APP__/REGISTER'];
		const dest = queryParams.dest;
		const destQuery = dest ? `dest=${encodeURIComponent(dest)}` : '';
		const queries = [destQuery].filter(Boolean);
		const path = `/register${queries.length ? `?${queries.join('&')}` : ''}`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}
	throw new Error('Invalid routeStaticId');
};
