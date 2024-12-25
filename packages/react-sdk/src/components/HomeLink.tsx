import Link from 'next/link';
import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { SITE_ORIGIN } from 'ergonomic-react/src/config/originConfig';
import { getHomeWebAppRoute } from '@wallot/js';
import { useRouteStateContext } from 'ergonomic-react/src/hooks/useRouteStateContext';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';

export const HomeLink: React.FC<BaseComponent> = ({ className = '' }) => {
	const {
		routeState: { currentRouteStaticId },
	} = useRouteStateContext();
	const siteOriginByTarget = useSiteOriginByTarget();
	const homeWebAppOrigin = siteOriginByTarget['HOME_WEB_APP'];
	const homeHref = getHomeWebAppRoute({
		includeOrigin: SITE_ORIGIN !== homeWebAppOrigin,
		origin: homeWebAppOrigin,
		queryParams: {},
		routeStaticId: 'HOME_WEB_APP__/INDEX',
	});
	const homeTarget = SITE_ORIGIN !== homeWebAppOrigin ? '_blank' : '';
	return (
		<Link className={className} href={homeHref} target={homeTarget}>
			<p className={cn('font-light text-sm', currentRouteStaticId === 'HOME_WEB_APP__/INDEX' && 'underline underline-offset-4')}>Home</p>
		</Link>
	);
};
