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
	if (options.routeStaticId === 'HOME_WEB_APP__/INDEX') {
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
	if (options.routeStaticId === 'HOME_WEB_APP__/POSTS/[SLUG]/CONTENT') {
		const queryParams =
			options.queryParams as HomeWebAppRouteQueryParams['HOME_WEB_APP__/POSTS/[SLUG]/CONTENT'];
		const slug = queryParams.slug;
		const path = `/posts/${slug}/content`;
		if (includeOrigin) {
			if (!origin) {
				console.error('Origin is required');
				return '/';
			}
			return `${origin}${path}`;
		}
		return path;
	}
	throw new Error('Invalid routeStaticId');
};
