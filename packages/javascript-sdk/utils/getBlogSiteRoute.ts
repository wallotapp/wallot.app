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
	const { includeOrigin = false, origin, routeStaticId } = options;
	if (includeOrigin && !origin) {
		console.error('Origin is required');
		return '/';
	}

	if (routeStaticId === 'BLOG_SITE__/INDEX') {
		const path = '/';
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}

	if (options.routeStaticId === 'BLOG_SITE__/ARTICLE/[SLUG]') {
		const queryParams =
			options.queryParams as BlogSiteRouteQueryParams['BLOG_SITE__/ARTICLE/[SLUG]'];
		const slug = queryParams.slug;
		const path = `/article/${slug}`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}

	throw new Error('Invalid routeStaticId');
};
