/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
	SupportSiteRouteStaticId,
	SupportSiteRouteQueryParams,
} from './routeDefinitions.js';

export type GetSupportSiteRouteOptions<T extends SupportSiteRouteStaticId> =
	{
		includeOrigin?: boolean;
		origin: string | null | undefined;
		queryParams: SupportSiteRouteQueryParams[T];
		routeStaticId: T;
	};

export const getSupportSiteRoute = <T extends SupportSiteRouteStaticId>(
	options: GetSupportSiteRouteOptions<T>,
) => {
	const { includeOrigin = false, origin } = options;
	if (options.routeStaticId === 'SUPPORT_SITE__/INDEX') {
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
	if (options.routeStaticId === 'SUPPORT_SITE__/POSTS/[SLUG]/CONTENT') {
		const queryParams =
			options.queryParams as SupportSiteRouteQueryParams['SUPPORT_SITE__/POSTS/[SLUG]/CONTENT'];
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
