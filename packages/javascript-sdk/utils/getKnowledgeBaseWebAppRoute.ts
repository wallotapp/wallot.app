import {
	KnowledgeBaseWebAppRouteStaticId,
	KnowledgeBaseWebAppRouteQueryParams,
} from './routeDefinitions.js';

export type GetKnowledgeBaseWebAppRouteOptions<
	T extends KnowledgeBaseWebAppRouteStaticId,
> = {
	includeOrigin?: boolean;
	origin: string | null | undefined;
	queryParams: KnowledgeBaseWebAppRouteQueryParams[T];
	routeStaticId: T;
};

export const getKnowledgeBaseWebAppRoute = <
	T extends KnowledgeBaseWebAppRouteStaticId,
>(
	options: GetKnowledgeBaseWebAppRouteOptions<T>,
) => {
	const { includeOrigin = false, origin } = options;
	if (options.routeStaticId === 'KNOWLEDGE_BASE_WEB_APP__/INDEX') {
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
		options.routeStaticId === 'KNOWLEDGE_BASE_WEB_APP__/POSTS/[SLUG]/CONTENT'
	) {
		const queryParams =
			options.queryParams as KnowledgeBaseWebAppRouteQueryParams['KNOWLEDGE_BASE_WEB_APP__/POSTS/[SLUG]/CONTENT'];
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
