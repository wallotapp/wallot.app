import Link from 'next/link';
import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { SITE_ORIGIN } from 'ergonomic-react/src/config/originConfig';
import { getSsoSiteRoute } from '@wallot/js';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';

export const LoginButton: React.FC<BaseComponent> = ({ className = '' }) => {
	const siteOriginByTarget = useSiteOriginByTarget();
	const ssoSiteOrigin = siteOriginByTarget['SSO_SITE'];
	const loginHref = getSsoSiteRoute({
		includeOrigin: SITE_ORIGIN !== ssoSiteOrigin,
		origin: ssoSiteOrigin,
		queryParams: {},
		routeStaticId: 'SSO_SITE__/LOGIN',
	});
	return (
		<Link className={className} href={loginHref} target='_blank'>
			<button>
				<p className='text-gray-500 text-sm'>Login</p>
			</button>
		</Link>
	);
};
