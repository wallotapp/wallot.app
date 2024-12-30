import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
	PageStaticProps,
	PageProps,
	Page as PageComponent,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { HomeSiteRouteQueryParams, getSsoSiteRoute } from '@wallot/js';
import { SuspensePage } from '@wallot/react/src/components/SuspensePage';
import { signOut } from 'firebase/auth';
import { firebaseAuthInstance as auth } from 'ergonomic-react/src/lib/firebase';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';

const Page: NextPage<PageStaticProps> = (props) => {
	// ==== Hooks ==== //

	// Site origins
	const siteOriginByTarget = useSiteOriginByTarget();
	const ssoSiteOrigin = siteOriginByTarget.SSO_SITE;

	// Router
	const router = useRouter();

	// ==== Constants ==== //

	// Router Query
	const _: RouteQueryParams = router?.query ?? {};
	_;

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
		if (ssoSiteOrigin == null) return;

		return void (async () => {
			await signOut(auth);
			// Wait 1 second
			await new Promise((resolve) => setTimeout(resolve, 1000));
			await router.replace(
				getSsoSiteRoute({
					includeOrigin: true,
					origin: siteOriginByTarget.SSO_SITE,
					queryParams: {},
					routeStaticId: 'SSO_SITE__/LOGOUT',
				}),
			);
		})();
	}, [ssoSiteOrigin]);

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
