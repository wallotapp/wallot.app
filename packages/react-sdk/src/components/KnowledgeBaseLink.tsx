import Link from 'next/link';
import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { SITE_ORIGIN } from 'ergonomic-react/src/config/originConfig';
import { getKnowledgeBaseWebAppRoute } from '@wallot/js';
import { useRouteStateContext } from 'ergonomic-react/src/hooks/useRouteStateContext';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';

export const KnowledgeBaseLink: React.FC<BaseComponent> = ({
	className = '',
}) => {
	const {
		routeState: { currentRouteStaticId },
	} = useRouteStateContext();
	const siteOriginByTarget = useSiteOriginByTarget();
	const knowledgeBaseWebAppOrigin =
		siteOriginByTarget['KNOWLEDGE_BASE_WEB_APP'];
	const knowledgeBaseHref = getKnowledgeBaseWebAppRoute({
		includeOrigin: SITE_ORIGIN !== knowledgeBaseWebAppOrigin,
		origin: knowledgeBaseWebAppOrigin,
		queryParams: {},
		routeStaticId: 'KNOWLEDGE_BASE_WEB_APP__/INDEX',
	});
	const knowledgeBaseTarget =
		SITE_ORIGIN !== knowledgeBaseWebAppOrigin ? '_blank' : '';
	return (
		<Link
			className={className}
			href={knowledgeBaseHref}
			target={knowledgeBaseTarget}
		>
			<p
				className={cn(
					'font-light text-sm',
					currentRouteStaticId?.startsWith('KNOWLEDGE_BASE_WEB_APP') &&
						'underline underline-offset-4',
				)}
			>
				Learn
			</p>
		</Link>
	);
};
