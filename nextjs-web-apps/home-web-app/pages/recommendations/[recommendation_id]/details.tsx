import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	Page as PageComponent,
	PageStaticProps,
	PageProps,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { HomeWebAppRouteQueryParams } from '@wallot/js/utils/routeDefinitions';

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID =
	'HOME_WEB_APP__/RECOMMENDATIONS/[RECOMMENDATION_ID]/DETAILS' as const;

// Route Static Props
const ROUTE_STATIC_PROPS: PageStaticProps = {
	routeStaticId: ROUTE_STATIC_ID,
	title: 'Recommendation',
};

// Route Query Params Type
type RouteQueryParams = HomeWebAppRouteQueryParams[typeof ROUTE_STATIC_ID];

const Page: NextPage = () => {
	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// ==== Constants ==== //

	// Router Query
	const query = (router?.query as RouteQueryParams) ?? {};

	// Router Query Param Values
	const { client_token, recommendation_id } = query;

	// Runtime Route ID
	const ROUTE_RUNTIME_ID = ROUTE_STATIC_ID.replace(
		'[ORDER_ID]',
		recommendation_id || '',
	);

	// Runtime Page Props
	const pageProps: PageProps = {
		...ROUTE_STATIC_PROPS,
		routeId: ROUTE_RUNTIME_ID,
	};

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<p className='font-medium text-xl'>
				Hello, and welcome to a dynamic route in Wallot's Blog Web App! 🚀
			</p>
			<p className='font-light text-sm'>
				The client_token for this page is: {client_token}
			</p>
			<p className='font-light text-sm'>
				The recommendation_id for this page is: {recommendation_id}
			</p>
		</PageComponent>
	);
};

export default Page;
