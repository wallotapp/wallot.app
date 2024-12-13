import {
	BlogWebAppRouteStaticId,
	BlogWebAppRouteQueryParams,
} from './routeDefinitions.js';

export type GetBlogWebAppRouteOptions<T extends BlogWebAppRouteStaticId> = {
	includeOrigin?: boolean;
	origin: string | null | undefined;
	queryParams: BlogWebAppRouteQueryParams[T];
	routeStaticId: T;
};

export const getBlogWebAppRoute = <T extends BlogWebAppRouteStaticId>(
	options: GetBlogWebAppRouteOptions<T>,
) => {
	const { includeOrigin = false, origin } = options;
	if (options.routeStaticId === 'BLOG_WEB_APP__/INDEX') {
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
	if (options.routeStaticId === 'BLOG_WEB_APP__/POSTS/[SLUG]/CONTENT') {
		const queryParams =
			options.queryParams as BlogWebAppRouteQueryParams['BLOG_WEB_APP__/POSTS/[SLUG]/CONTENT'];
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
