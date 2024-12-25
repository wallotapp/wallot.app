/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { SupportWebAppRouteStaticId, SupportWebAppRouteQueryParams } from './routeDefinitions.js';

export type GetSupportWebAppRouteOptions<T extends SupportWebAppRouteStaticId> = {
	includeOrigin?: boolean;
	origin: string | null | undefined;
	queryParams: SupportWebAppRouteQueryParams[T];
	routeStaticId: T;
};

export const getSupportWebAppRoute = <T extends SupportWebAppRouteStaticId>(options: GetSupportWebAppRouteOptions<T>) => {
	const { includeOrigin = false, origin } = options;
	if (options.routeStaticId === 'SUPPORT_WEB_APP__/INDEX') {
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
	if (options.routeStaticId === 'SUPPORT_WEB_APP__/POSTS/[SLUG]/CONTENT') {
		const queryParams = options.queryParams as SupportWebAppRouteQueryParams['SUPPORT_WEB_APP__/POSTS/[SLUG]/CONTENT'];
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
