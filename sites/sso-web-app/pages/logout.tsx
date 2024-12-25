import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PageStaticProps, PageProps, Page as PageComponent } from 'ergonomic-react/src/components/nextjs-pages/Page';
import { signOut } from 'firebase/auth';
import { firebaseAuthInstance as auth } from 'ergonomic-react/src/lib/firebase';
import { SuspensePage } from '@wallot/react/src/components/SuspensePage';
import { getSsoWebAppRoute, SsoWebAppRouteQueryParams } from '@wallot/js';

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

	// ==== Effects ==== //
	useEffect(
		() =>
			void (async () => {
				await signOut(auth);
				// Wait 1 second
				await new Promise((resolve) => setTimeout(resolve, 1000));
				await router.replace(
					getSsoWebAppRoute({
						includeOrigin: false,
						origin: null,
						queryParams: {},
						routeStaticId: 'SSO_WEB_APP__/LOGIN',
					}),
				);
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
const ROUTE_STATIC_ID = 'SSO_WEB_APP__/INDEX' as const;

// Route Query Params Type
type RouteQueryParams = SsoWebAppRouteQueryParams[typeof ROUTE_STATIC_ID];

export const getStaticProps: GetStaticProps<PageStaticProps> = () => {
	// Route Static Props
	const ROUTE_STATIC_PROPS: PageStaticProps = {
		routeStaticId: ROUTE_STATIC_ID,
		title: 'Log out',
	};
	return Promise.resolve({
		props: ROUTE_STATIC_PROPS,
	});
};
