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
	const { includeOrigin = false, origin, routeStaticId } = options;
	if (includeOrigin && !origin) {
		console.error('Origin is required');
		return '/';
	}

	if (routeStaticId === 'KNOWLEDGE_BASE_SITE__/INDEX') {
		const path = `/`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}

	if (routeStaticId === 'KNOWLEDGE_BASE_SITE__/[TOPIC]/[SLUG]') {
		const queryParams =
			options.queryParams as KnowledgeBaseSiteRouteQueryParams['KNOWLEDGE_BASE_SITE__/[TOPIC]/[SLUG]'];
		const topic = queryParams.topic;
		const slug = queryParams.slug;
		const path = `/${topic}/${slug}`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}
	throw new Error('Invalid routeStaticId');
};
