/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
	ResearchSiteRouteStaticId,
	ResearchSiteRouteQueryParams,
} from './routeDefinitions.js';

export type GetResearchSiteRouteOptions<T extends ResearchSiteRouteStaticId> = {
	includeOrigin?: boolean;
	origin: string | null | undefined;
	queryParams: ResearchSiteRouteQueryParams[T];
	routeStaticId: T;
};

export const getResearchSiteRoute = <T extends ResearchSiteRouteStaticId>(
	options: GetResearchSiteRouteOptions<T>,
) => {
	const { includeOrigin = false, origin } = options;
	if (options.routeStaticId === 'RESEARCH_SITE__/INDEX') {
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
		options.routeStaticId ===
		'RESEARCH_SITE__/APPLICATIONS/[APPLICATION_ID]/ACCEPTANCE_LETTER'
	) {
		const queryParams =
			options.queryParams as ResearchSiteRouteQueryParams['RESEARCH_SITE__/APPLICATIONS/[APPLICATION_ID]/ACCEPTANCE_LETTER'];
		const { application_id, client_verification } = queryParams;
		const path = `/applications/${application_id}/acceptance-letter?client_verification=${client_verification}`;
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
