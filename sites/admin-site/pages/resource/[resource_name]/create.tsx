import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	PageStaticProps,
	PageProps,
	Page as PageComponent,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import {
	AdminSiteRouteQueryParams,
	getAdminSiteRoute,
	getApiResourceSpec,
	getSsoSiteRoute,
	idPrefixByResourceName,
} from '@wallot/js';
import { useAuthenticatedRouteRedirect } from 'ergonomic-react/src/features/authentication/hooks/useAuthenticatedRouteRedirect';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { GeneralizedAdminCreateOperationPage } from 'ergonomic-react/src/features/data/components/GeneralizedAdminCreateOperationPage';
import { getCreateOperationMutationForResource } from '@wallot/react/src/hooks/getCreateOperationMutationForResource';
import { getPageQueryHookForResource } from '@wallot/react/src/hooks/getPageQueryHookForResource';
import { getUpdateOperationMutationForResource } from '@wallot/react/src/hooks/getUpdateOperationMutationForResource';

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'ADMIN_SITE__/RESOURCE/[RESOURCE_NAME]/CREATE' as const;

// Route Static Props
const ROUTE_STATIC_PROPS: PageStaticProps = {
	routeStaticId: ROUTE_STATIC_ID,
	title: 'Create New',
};

// Route Query Params Type
type RouteQueryParams = AdminSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

const Page: NextPage = () => {
	// ==== Hooks ==== //

	// Site origins
	const siteOriginByTarget = useSiteOriginByTarget();

	// Auth
	useAuthenticatedRouteRedirect({
		authSiteOrigin: siteOriginByTarget.SSO_SITE,
		loginRoutePath: getSsoSiteRoute({
			includeOrigin: false,
			origin: null,
			queryParams: {},
			routeStaticId: 'SSO_SITE__/LOGIN',
		}),
		shouldPauseFirebaseAuthRedirects: false,
	});

	// Router
	const router = useRouter();

	// ==== Constants ==== //

	// Router Query
	const query: RouteQueryParams = (router?.query as RouteQueryParams) ?? {};

	// Router Query Param Values
	const { resource_name } = query;

	// ==== Constants ==== //

	// Runtime Route ID
	const ROUTE_RUNTIME_ID = ROUTE_STATIC_ID.replace(
		'[RESOURCE_NAME]',
		resource_name || '',
	);

	// Runtime Page Props
	const pageProps: PageProps = {
		...ROUTE_STATIC_PROPS,
		routeId: ROUTE_RUNTIME_ID,
	};

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<GeneralizedAdminCreateOperationPage
				getAdminSiteRoute={getAdminSiteRoute as (options: unknown) => string}
				getApiResourceSpec={getApiResourceSpec}
				getCreateOperationMutationForResource={
					getCreateOperationMutationForResource
				}
				getPageQueryHookForResource={getPageQueryHookForResource}
				getUpdateOperationMutationForResource={
					getUpdateOperationMutationForResource
				}
				idPrefixByResourceName={idPrefixByResourceName}
			/>
		</PageComponent>
	);
};

export default Page;
