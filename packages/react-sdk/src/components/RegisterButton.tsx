import Link from 'next/link';
import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { SITE_ORIGIN } from 'ergonomic-react/src/config/originConfig';
import { getSsoWebAppRoute } from '@wallot/js';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';

export const RegisterButton: React.FC<BaseComponent> = ({ className = '' }) => {
	const siteOriginByTarget = useSiteOriginByTarget();
	const ssoWebAppOrigin = siteOriginByTarget['SSO_WEB_APP'];
	const registerHref = getSsoWebAppRoute({
		includeOrigin: SITE_ORIGIN !== ssoWebAppOrigin,
		origin: ssoWebAppOrigin,
		queryParams: {},
		routeStaticId: 'SSO_WEB_APP__/REGISTER',
	});
	return (
		<Link className={className} href={registerHref} target='_blank'>
			<button className={cn('bg-brand space-x-2 flex items-center rounded-sm px-4 py-1.5')}>
				<p className='text-xs text-white font-light'>Create a free account</p>
			</button>
		</Link>
	);
};
