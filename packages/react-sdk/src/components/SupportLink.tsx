import Link from 'next/link';
import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { SITE_ORIGIN } from 'ergonomic-react/src/config/originConfig';
import { getSupportWebAppRoute } from '@wallot/js';
import { useRouteStateContext } from 'ergonomic-react/src/hooks/useRouteStateContext';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';

export const SupportLink: React.FC<BaseComponent> = ({ className = '' }) => {
	const {
		routeState: { currentRouteStaticId },
	} = useRouteStateContext();
	const siteOriginByTarget = useSiteOriginByTarget();
	const supportWebAppOrigin = siteOriginByTarget['SUPPORT_WEB_APP'];
	const supportHref = getSupportWebAppRoute({
		includeOrigin: SITE_ORIGIN !== supportWebAppOrigin,
		origin: supportWebAppOrigin,
		queryParams: {},
		routeStaticId: 'SUPPORT_WEB_APP__/INDEX',
	});
	return (
		<Link className={className} href={supportHref} target='_blank'>
			<p className={cn('font-light text-sm', currentRouteStaticId?.startsWith('SUPPORT_WEB_APP') && 'underline underline-offset-4')}>Support</p>
		</Link>
	);
};
