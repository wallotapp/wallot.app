import Link from 'next/link';
import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { SITE_ORIGIN } from 'ergonomic-react/src/config/originConfig';
import { getSupportSiteRoute } from '@wallot/js';
import { useRouteStateContext } from 'ergonomic-react/src/hooks/useRouteStateContext';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';

export const SupportLink: React.FC<BaseComponent> = ({ className = '' }) => {
	const {
		routeState: { currentRouteStaticId },
	} = useRouteStateContext();
	const siteOriginByTarget = useSiteOriginByTarget();
	const supportSiteOrigin = siteOriginByTarget['SUPPORT_SITE'];
	const supportHref = getSupportSiteRoute({
		includeOrigin: SITE_ORIGIN !== supportSiteOrigin,
		origin: supportSiteOrigin,
		queryParams: {},
		routeStaticId: 'SUPPORT_SITE__/INDEX',
	});
	return (
		<Link className={className} href={supportHref} target='_blank'>
			<p
				className={cn(
					'font-light text-sm',
					currentRouteStaticId?.startsWith('SUPPORT_SITE') &&
						'underline underline-offset-4',
				)}
			>
				Support
			</p>
		</Link>
	);
};
