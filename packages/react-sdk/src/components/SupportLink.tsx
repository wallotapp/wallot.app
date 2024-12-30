import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { SITE_ORIGIN } from 'ergonomic-react/src/config/originConfig';
import { getSupportSiteRoute } from '@wallot/js';
import { useRouteStateContext } from 'ergonomic-react/src/hooks/useRouteStateContext';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { AsyncLink } from 'ergonomic-react/src/components/custom-ui/async-link';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';

export function SupportLink({ className = '' }: BaseComponent) {
	// Toaster
	const { toast } = useToast();
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
		<AsyncLink
			className={className}
			href={supportHref}
			target='_blank'
			isReady={false}
		>
			<div
				className={cn(
					'font-light text-sm',
					currentRouteStaticId?.startsWith('SUPPORT_SITE') &&
						'underline underline-offset-4',
					'cursor-pointer',
				)}
				onClick={() => {
					toast({
						title: 'Coming Soon',
						description: "This feature isn't available yet. Stay tuned!",
					});
				}}
			>
				Support
			</div>
		</AsyncLink>
	);
}
