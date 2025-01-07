import Link from 'next/link';
import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { SITE_ORIGIN } from 'ergonomic-react/src/config/originConfig';
import { getSsoSiteRoute } from '@wallot/js';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';

export function RegisterButton({ className = '' }: BaseComponent) {
	const siteOriginByTarget = useSiteOriginByTarget();
	const ssoSiteOrigin = siteOriginByTarget['SSO_SITE'];
	const registerHref = getSsoSiteRoute({
		includeOrigin: SITE_ORIGIN !== ssoSiteOrigin,
		origin: ssoSiteOrigin,
		queryParams: {},
		routeStaticId: 'SSO_SITE__/REGISTER',
	});
	return (
		<Link className={className} href={registerHref} target='_blank'>
			<button
				className={cn(
					'bg-brand space-x-2 flex items-center rounded-sm px-4 py-1.5',
				)}
			>
				<p className='text-xs text-white font-light'>Create a free account</p>
			</button>
		</Link>
	);
}
