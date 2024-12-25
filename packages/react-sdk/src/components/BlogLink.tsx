import Link from 'next/link';
import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { SITE_ORIGIN } from 'ergonomic-react/src/config/originConfig';
import { getBlogSiteRoute } from '@wallot/js';
import { useRouteStateContext } from 'ergonomic-react/src/hooks/useRouteStateContext';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';

export const BlogLink: React.FC<BaseComponent> = ({ className = '' }) => {
	const {
		routeState: { currentRouteStaticId },
	} = useRouteStateContext();
	const siteOriginByTarget = useSiteOriginByTarget();
	const blogSiteOrigin = siteOriginByTarget['BLOG_SITE'];
	const blogHref = getBlogSiteRoute({
		includeOrigin: SITE_ORIGIN !== blogSiteOrigin,
		origin: blogSiteOrigin,
		queryParams: {},
		routeStaticId: 'BLOG_SITE__/INDEX',
	});
	return (
		<Link className={className} href={blogHref} target='_blank'>
			<p
				className={cn(
					'font-light text-sm',
					currentRouteStaticId?.startsWith('BLOG_SITE') &&
						'underline underline-offset-4',
				)}
			>
				Blog
			</p>
		</Link>
	);
};
