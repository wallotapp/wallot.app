/* eslint-disable @typescript-eslint/restrict-template-expressions */
import {
	ReferralsSiteRouteStaticId,
	ReferralsSiteRouteQueryParams,
} from './routeDefinitions.js';

export type GetReferralsSiteRouteOptions<T extends ReferralsSiteRouteStaticId> =
	{
		includeOrigin?: boolean;
		origin: string | null | undefined;
		queryParams: ReferralsSiteRouteQueryParams[T];
		routeStaticId: T;
	};

export const getReferralsSiteRoute = <T extends ReferralsSiteRouteStaticId>(
	options: GetReferralsSiteRouteOptions<T>,
) => {
	const { includeOrigin = false, origin } = options;
	if (options.routeStaticId === 'REFERRALS_SITE__/INDEX') {
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
	if (options.routeStaticId === 'REFERRALS_SITE__/POSTS/[SLUG]/CONTENT') {
		const queryParams =
			options.queryParams as ReferralsSiteRouteQueryParams['REFERRALS_SITE__/POSTS/[SLUG]/CONTENT'];
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
