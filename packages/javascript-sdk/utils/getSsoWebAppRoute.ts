/* eslint-disable @typescript-eslint/restrict-template-expressions */
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
	const { includeOrigin = false, origin, routeStaticId } = options;
	if (includeOrigin && !origin) {
		console.error('Origin is required');
		return '/';
	}
	if (routeStaticId === 'SSO_WEB_APP__/INDEX') {
		const path = '/';
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}
	if (routeStaticId === 'SSO_WEB_APP__/LOGIN') {
		const queryParams =
			options.queryParams as SsoWebAppRouteQueryParams['SSO_WEB_APP__/LOGIN'];
		const dest = queryParams.dest;
		const destQuery = dest ? `dest=${encodeURIComponent(dest)}` : '';
		const queries = [destQuery].filter(Boolean);
		const path = `/login${queries.length ? `?${queries.join('&')}` : ''}`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}
	if (routeStaticId === 'SSO_WEB_APP__/LOGOUT') {
		const path = '/logout';
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}
	if (routeStaticId === 'SSO_WEB_APP__/REGISTER') {
		const path = '/register';
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}
	throw new Error('Invalid routeStaticId');
};
