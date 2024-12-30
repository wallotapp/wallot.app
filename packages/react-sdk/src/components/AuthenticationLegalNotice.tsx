import { getHomeSiteRoute } from '@wallot/js';
import Link from 'next/link';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';

export function AuthenticationLegalNotice() {
	const siteOriginByTarget = useSiteOriginByTarget();
	return (
		<div className='text-center mt-5 mx-auto'>
			<p className='text-gray-400 text-sm'>
				By clicking continue, you agree to our{' '}
				<Link
					href={getHomeSiteRoute({
						includeOrigin: true,
						origin: siteOriginByTarget.HOME_SITE,
						queryParams: {},
						routeStaticId: 'HOME_SITE__/TERMS',
					})}
					rel='noopener noreferrer'
					target='_blank'
				>
					<span className='underline'>Terms of Service</span>
				</Link>{' '}
				and{' '}
				<Link
					href={getHomeSiteRoute({
						includeOrigin: true,
						origin: siteOriginByTarget.HOME_SITE,
						queryParams: {},
						routeStaticId: 'HOME_SITE__/PRIVACY',
					})}
					rel='noopener noreferrer'
					target='_blank'
				>
					<span className='underline'>Privacy Policy</span>
				</Link>
			</p>
		</div>
	);
}
