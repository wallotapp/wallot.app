import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { SITE_ORIGIN } from 'ergonomic-react/src/config/originConfig';
import { getKnowledgeBaseSiteRoute } from '@wallot/js';
import { useRouteStateContext } from 'ergonomic-react/src/hooks/useRouteStateContext';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { AsyncLink } from 'ergonomic-react/src/components/custom-ui/async-link';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';

export function KnowledgeBaseLink({ className = '' }: BaseComponent) {
	// Toaster
	const { toast } = useToast();
	const {
		routeState: { currentRouteStaticId },
	} = useRouteStateContext();
	const siteOriginByTarget = useSiteOriginByTarget();
	const knowledgeBaseSiteOrigin = siteOriginByTarget['KNOWLEDGE_BASE_SITE'];
	const knowledgeBaseHref = getKnowledgeBaseSiteRoute({
		includeOrigin: SITE_ORIGIN !== knowledgeBaseSiteOrigin,
		origin: knowledgeBaseSiteOrigin,
		queryParams: {},
		routeStaticId: 'KNOWLEDGE_BASE_SITE__/INDEX',
	});
	const knowledgeBaseTarget =
		SITE_ORIGIN !== knowledgeBaseSiteOrigin ? '_blank' : '';
	return (
		<AsyncLink
			className={className}
			href={knowledgeBaseHref}
			target={knowledgeBaseTarget}
			isReady={false}
		>
			<div
				className={cn(
					'font-light text-sm',
					currentRouteStaticId?.startsWith('KNOWLEDGE_BASE_SITE') &&
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
				Learn
			</div>
		</AsyncLink>
	);
}
