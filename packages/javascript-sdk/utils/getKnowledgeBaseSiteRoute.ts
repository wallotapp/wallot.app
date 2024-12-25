/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
	KnowledgeBaseSiteRouteStaticId,
	KnowledgeBaseSiteRouteQueryParams,
} from './routeDefinitions.js';

export type GetKnowledgeBaseSiteRouteOptions<
	T extends KnowledgeBaseSiteRouteStaticId,
> = {
	includeOrigin?: boolean;
	origin: string | null | undefined;
	queryParams: KnowledgeBaseSiteRouteQueryParams[T];
	routeStaticId: T;
};

export const getKnowledgeBaseSiteRoute = <
	T extends KnowledgeBaseSiteRouteStaticId,
>(
	options: GetKnowledgeBaseSiteRouteOptions<T>,
) => {
	const { includeOrigin = false, origin } = options;
	if (options.routeStaticId === 'KNOWLEDGE_BASE_SITE__/INDEX') {
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
	if (
		options.routeStaticId === 'KNOWLEDGE_BASE_SITE__/POSTS/[SLUG]/CONTENT'
	) {
		const queryParams =
			options.queryParams as KnowledgeBaseSiteRouteQueryParams['KNOWLEDGE_BASE_SITE__/POSTS/[SLUG]/CONTENT'];
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
