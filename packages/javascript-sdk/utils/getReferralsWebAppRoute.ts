/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ReferralsWebAppRouteStaticId, ReferralsWebAppRouteQueryParams } from './routeDefinitions.js';

export type GetReferralsWebAppRouteOptions<T extends ReferralsWebAppRouteStaticId> = {
	includeOrigin?: boolean;
	origin: string | null | undefined;
	queryParams: ReferralsWebAppRouteQueryParams[T];
	routeStaticId: T;
};

export const getReferralsWebAppRoute = <T extends ReferralsWebAppRouteStaticId>(options: GetReferralsWebAppRouteOptions<T>) => {
	const { includeOrigin = false, origin } = options;
	if (options.routeStaticId === 'REFERRALS_WEB_APP__/INDEX') {
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
	if (options.routeStaticId === 'REFERRALS_WEB_APP__/POSTS/[SLUG]/CONTENT') {
		const queryParams = options.queryParams as ReferralsWebAppRouteQueryParams['REFERRALS_WEB_APP__/POSTS/[SLUG]/CONTENT'];
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
