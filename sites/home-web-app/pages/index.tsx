import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
	PageStaticProps,
	PageProps,
	Page as PageComponent,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { HomeWebAppRouteQueryParams, getHomeWebAppRoute } from '@wallot/js';
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

	// ==== Constants ==== //

	// Runtime Route ID
	const ROUTE_RUNTIME_ID = props.routeStaticId;

	// Runtime Page Props
	const pageProps: PageProps = {
		...props,
		routeId: ROUTE_RUNTIME_ID,
	};

	// ==== Effects ==== //
	useEffect(
		() =>
			void (async () => {
				// Wait 1 second
				await new Promise((resolve) => setTimeout(resolve, 1000));
				const getStartedRoute = getHomeWebAppRoute({
					includeOrigin: false,
					origin: null,
					queryParams: { client_token },
					routeStaticId: 'HOME_WEB_APP__/GET_STARTED',
				});
				await router.replace(getStartedRoute);
			})(),
		[],
	);

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
const ROUTE_STATIC_ID = 'HOME_WEB_APP__/INDEX' as const;

// Route Query Params Type
type RouteQueryParams = HomeWebAppRouteQueryParams[typeof ROUTE_STATIC_ID];

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
