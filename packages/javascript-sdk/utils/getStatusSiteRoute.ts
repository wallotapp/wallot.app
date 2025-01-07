/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
	StatusSiteRouteStaticId,
	StatusSiteRouteQueryParams,
} from './routeDefinitions.js';

export type GetStatusSiteRouteOptions<T extends StatusSiteRouteStaticId> = {
	includeOrigin?: boolean;
	origin: string | null | undefined;
	queryParams: StatusSiteRouteQueryParams[T];
	routeStaticId: T;
};

export const getStatusSiteRoute = <T extends StatusSiteRouteStaticId>(
	options: GetStatusSiteRouteOptions<T>,
) => {
	const { includeOrigin = false, origin } = options;
	if (options.routeStaticId === 'STATUS_SITE__/INDEX') {
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
	if (options.routeStaticId === 'STATUS_SITE__/POSTS/[SLUG]/CONTENT') {
		const queryParams =
			options.queryParams as StatusSiteRouteQueryParams['STATUS_SITE__/POSTS/[SLUG]/CONTENT'];
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
