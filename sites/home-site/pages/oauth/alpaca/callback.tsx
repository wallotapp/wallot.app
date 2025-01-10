import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import {
	PageStaticProps,
	PageProps,
	Page as PageComponent,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import {
	getHomeSiteRoute,
	getSsoSiteRoute,
	HomeSiteRouteQueryParams,
} from '@wallot/js';
import { SuspensePage } from '@wallot/react/src/components/SuspensePage';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { useAuthenticatedRouteRedirect } from 'ergonomic-react/src/features/authentication/hooks/useAuthenticatedRouteRedirect';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import { useCreateAlpacaAccessTokenMutation } from '@wallot/react/src/features/users/hooks/useCreateAlpacaAccessTokenMutation';

const Page: NextPage<PageStaticProps> = (props) => {
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

	// Toaster
	const { toast } = useToast();

	// Auth
	const { user } = useContext(AuthContext);
	const userId = user?.uid ?? null;
	const isUserLoading = user === null;

	// Mutation
	const {
		mutate: createAlpacaAccessToken,
		// isLoading: isCreateAlpacaAccessTokenRunning,
	} = useCreateAlpacaAccessTokenMutation({
		onError: ({ error: { message } }) => {
			// Show the error message
			toast({
				title: 'Error',
				description: message,
			});
		},
		onSuccess: async ({ redirect_uri: redirectUri }) => {
			// Show success toast
			toast({
				title: 'Success',
				description: 'Your Alpaca account has been connected!',
			});

			// Redirect to next page
			await router.push(redirectUri);
		},
	});

	// ==== Constants ==== //

	// Router Query
	const query: RouteQueryParams = router?.query ?? {};

	// Router Query Param Values
	const { code } = query;

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
		if (code == null || typeof code !== 'string' || code.length === 0) return;
		if (isUserLoading) return;

		const redirectUri = getHomeSiteRoute({
			includeOrigin: true,
			origin: siteOriginByTarget.HOME_SITE,
			queryParams: {},
			routeStaticId: 'HOME_SITE__/OAUTH/ALPACA/CALLBACK',
		});
		createAlpacaAccessToken({ code, redirect_uri: redirectUri });
	}, [code, createAlpacaAccessToken, routerReady, userId, isUserLoading]);

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
const ROUTE_STATIC_ID = 'HOME_SITE__/OAUTH/ALPACA/CALLBACK' as const;

// Route Query Params Type
type RouteQueryParams = HomeSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

export const getStaticProps: GetStaticProps<PageStaticProps> = () => {
	// Route Static Props
	const ROUTE_STATIC_PROPS: PageStaticProps = {
		routeStaticId: ROUTE_STATIC_ID,
		title: 'Connecting your Alpaca account',
	};
	return Promise.resolve({
		props: ROUTE_STATIC_PROPS,
	});
};
