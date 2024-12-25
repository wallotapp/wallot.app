/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
	SsoSiteRouteStaticId,
	SsoSiteRouteQueryParams,
} from './routeDefinitions.js';

export type GetSsoSiteRouteOptions<T extends SsoSiteRouteStaticId> = {
	includeOrigin?: boolean;
	origin: string | null | undefined;
	queryParams: SsoSiteRouteQueryParams[T];
	routeStaticId: T;
};

export const getSsoSiteRoute = <T extends SsoSiteRouteStaticId>(
	options: GetSsoSiteRouteOptions<T>,
) => {
	const { includeOrigin = false, origin, routeStaticId } = options;
	if (includeOrigin && !origin) {
		console.error('Origin is required');
		return '/';
	}
	if (routeStaticId === 'SSO_SITE__/INDEX') {
		const queryParams =
			options.queryParams as SsoSiteRouteQueryParams['SSO_SITE__/INDEX'];
		const dest = queryParams.dest;
		const destQuery = dest ? `dest=${encodeURIComponent(dest)}` : '';
		const queries = [destQuery].filter(Boolean);
		const path = `/${queries.length ? `?${queries.join('&')}` : ''}`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}
	if (routeStaticId === 'SSO_SITE__/LOGIN') {
		const queryParams =
			options.queryParams as SsoSiteRouteQueryParams['SSO_SITE__/LOGIN'];
		const dest = queryParams.dest;
		const destQuery = dest ? `dest=${encodeURIComponent(dest)}` : '';
		const queries = [destQuery].filter(Boolean);
		const path = `/login${queries.length ? `?${queries.join('&')}` : ''}`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}
	if (routeStaticId === 'SSO_SITE__/LOGOUT') {
		const path = '/logout';
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}
	if (routeStaticId === 'SSO_SITE__/REGISTER') {
		const queryParams =
			options.queryParams as SsoSiteRouteQueryParams['SSO_SITE__/REGISTER'];
		const dest = queryParams.dest;
		const destQuery = dest ? `dest=${encodeURIComponent(dest)}` : '';
		const queries = [destQuery].filter(Boolean);
		const path = `/register${queries.length ? `?${queries.join('&')}` : ''}`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}
	throw new Error('Invalid routeStaticId');
};
