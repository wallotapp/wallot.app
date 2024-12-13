import {
	AdminWebAppRouteStaticId,
	AdminWebAppRouteQueryParams,
} from './routeDefinitions.js';

export type GetAdminWebAppRouteOptions<T extends AdminWebAppRouteStaticId> = {
	includeOrigin?: boolean;
	origin: string | null | undefined;
	queryParams: AdminWebAppRouteQueryParams[T];
	routeStaticId: T;
};

export const getAdminWebAppRoute = <T extends AdminWebAppRouteStaticId>(
	options: GetAdminWebAppRouteOptions<T>,
) => {
	const { includeOrigin = false, origin } = options;
	if (options.routeStaticId === 'ADMIN_WEB_APP__/INDEX') {
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
	if (options.routeStaticId === 'ADMIN_WEB_APP__/POSTS/[SLUG]/CONTENT') {
		const queryParams =
			options.queryParams as AdminWebAppRouteQueryParams['ADMIN_WEB_APP__/POSTS/[SLUG]/CONTENT'];
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
