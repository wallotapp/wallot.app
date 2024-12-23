import Link from 'next/link';
import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { SITE_ORIGIN } from 'ergonomic-react/src/config/originConfig';
import { getSsoWebAppRoute } from '@wallot/js';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';

export const LoginLink: React.FC<BaseComponent> = ({ className = '' }) => {
	const siteOriginByTarget = useSiteOriginByTarget();
	const ssoWebAppOrigin = siteOriginByTarget['SSO_WEB_APP'];
	const loginHref = getSsoWebAppRoute({
		includeOrigin: SITE_ORIGIN !== ssoWebAppOrigin,
		origin: ssoWebAppOrigin,
		queryParams: {},
		routeStaticId: 'SSO_WEB_APP__/LOGIN',
	});
	return (
		<Link className={className} href={loginHref} target='_blank'>
			<p className='font-light text-sm'>Login</p>
		</Link>
	);
};
