/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
	BlogSiteRouteStaticId,
	BlogSiteRouteQueryParams,
} from './routeDefinitions.js';

export type GetBlogSiteRouteOptions<T extends BlogSiteRouteStaticId> = {
	includeOrigin?: boolean;
	origin: string | null | undefined;
	queryParams: BlogSiteRouteQueryParams[T];
	routeStaticId: T;
};

export const getBlogSiteRoute = <T extends BlogSiteRouteStaticId>(
	options: GetBlogSiteRouteOptions<T>,
) => {
	const { includeOrigin = false, origin } = options;
	if (options.routeStaticId === 'BLOG_SITE__/INDEX') {
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
	if (options.routeStaticId === 'BLOG_SITE__/POSTS/[SLUG]/CONTENT') {
		const queryParams =
			options.queryParams as BlogSiteRouteQueryParams['BLOG_SITE__/POSTS/[SLUG]/CONTENT'];
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
