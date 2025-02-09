import {
	SupportSiteRouteStaticId,
	SupportSiteRouteQueryParams,
} from './routeDefinitions.js';

export type GetSupportSiteRouteOptions<T extends SupportSiteRouteStaticId> = {
	includeOrigin?: boolean;
	origin: string | null | undefined;
	queryParams: SupportSiteRouteQueryParams[T];
	routeStaticId: T;
};

export const getSupportSiteRoute = <T extends SupportSiteRouteStaticId>(
	options: GetSupportSiteRouteOptions<T>,
) => {
	const { includeOrigin = false, origin, routeStaticId } = options;
	if (includeOrigin && !origin) {
		console.error('Origin is required');
		return '/';
	}

	if (routeStaticId === 'SUPPORT_SITE__/INDEX') {
		const path = `/`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}

	if (routeStaticId === 'SUPPORT_SITE__/HELP/[TOPIC]/[SLUG]') {
		const queryParams =
			options.queryParams as SupportSiteRouteQueryParams['SUPPORT_SITE__/HELP/[TOPIC]/[SLUG]'];
		const topic = queryParams.topic;
		const slug = queryParams.slug;
		const path = `/help/${topic}/${slug}`;
		if (includeOrigin) return `${origin as string}${path}`;
		return path;
	}
	throw new Error('Invalid routeStaticId');
};
