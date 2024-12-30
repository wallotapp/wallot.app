import Link from 'next/link';
import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { SITE_ORIGIN } from 'ergonomic-react/src/config/originConfig';
import { getHomeSiteRoute } from '@wallot/js';
import { useRouteStateContext } from 'ergonomic-react/src/hooks/useRouteStateContext';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';

export function HomeLink({ className = '' }: BaseComponent) {
	const {
		routeState: { currentRouteStaticId },
	} = useRouteStateContext();
	const siteOriginByTarget = useSiteOriginByTarget();
	const homeSiteOrigin = siteOriginByTarget['HOME_SITE'];
	const homeHref = getHomeSiteRoute({
		includeOrigin: SITE_ORIGIN !== homeSiteOrigin,
		origin: homeSiteOrigin,
		queryParams: {},
		routeStaticId: 'HOME_SITE__/INDEX',
	});
	const homeTarget = SITE_ORIGIN !== homeSiteOrigin ? '_blank' : '';
	return (
		<Link className={className} href={homeHref} target={homeTarget}>
			<p
				className={cn(
					'font-light text-sm',
					currentRouteStaticId === 'HOME_SITE__/INDEX' &&
						'underline underline-offset-4',
				)}
			>
				Home
			</p>
		</Link>
	);
}
