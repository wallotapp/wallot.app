import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	PageStaticProps,
	PageProps,
	Page as PageComponent,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import {
	AdminWebAppRouteQueryParams,
	getAdminWebAppRoute,
	getApiResourceSpec,
	idPrefixByResourceName,
} from '@wallot/js';
import { GeneralizedAdminIndexPage } from 'ergonomic-react/src/features/data/components/GeneralizedAdminIndexPage';

const Page: NextPage<PageStaticProps> = (props) => {
	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// ==== Constants ==== //

	// Router Query
	const query: RouteQueryParams = router?.query ?? {};

	// Router Query Param Values
	const _ = query;
	typeof _;

	// ==== Constants ==== //

	// Runtime Route ID
	const ROUTE_RUNTIME_ID = props.routeStaticId;

	// Runtime Page Props
	const pageProps: PageProps = {
		...props,
		routeId: ROUTE_RUNTIME_ID,
	};

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<GeneralizedAdminIndexPage
				getAdminWebAppRoute={
					getAdminWebAppRoute as (options: unknown) => string
				}
				getApiResourceSpec={getApiResourceSpec}
				idPrefixByResourceName={idPrefixByResourceName}
			/>
		</PageComponent>
	);
};

export default Page;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'ADMIN_WEB_APP__/INDEX' as const;

// Route Query Params Type
type RouteQueryParams = AdminWebAppRouteQueryParams[typeof ROUTE_STATIC_ID];

export const getStaticProps: GetStaticProps<PageStaticProps> = () => {
	// Route Static Props
	const ROUTE_STATIC_PROPS: PageStaticProps = {
		routeStaticId: ROUTE_STATIC_ID,
		title: 'Welcome',
	};
	return Promise.resolve({
		props: ROUTE_STATIC_PROPS,
	});
};
