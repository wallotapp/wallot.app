import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
	PageStaticProps,
	PageProps,
	Page as PageComponent,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { HomeSiteRouteQueryParams, getHomeSiteRoute } from '@wallot/js';
import { SuspensePage } from '@wallot/react/src/components/SuspensePage';

const Page: NextPage<PageStaticProps> = (props) => {
	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// ==== Constants ==== //

	// Router Query
	const query: RouteQueryParams = router?.query ?? {};

	// Router Query Param Values
	const { client_token } = query;

	// Router Ready State
	const routerReady = router.isReady;

	// ==== Constants ==== //

	// Runtime Route ID
	const ROUTE_RUNTIME_ID = props.routeStaticId;

	// Runtime Page Props
	const pageProps: PageProps = {
		...props,
		routeId: ROUTE_RUNTIME_ID,
	};

	// ==== Effects ==== //
	useEffect(() => {
		if (!routerReady) return;

		return void (async () => {
			// Wait 1 second
			await new Promise((resolve) => setTimeout(resolve, 1000));
			const getStartedRoute = getHomeSiteRoute({
				includeOrigin: false,
				origin: null,
				queryParams: { client_token },
				routeStaticId: 'HOME_SITE__/ACCOUNT/OVERVIEW',
			});
			await router.replace(getStartedRoute);
		})();
	}, [client_token, routerReady]);

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<SuspensePage />
		</PageComponent>
	);
};

export default Page;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_SITE__/INDEX' as const;

// Route Query Params Type
type RouteQueryParams = HomeSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

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
