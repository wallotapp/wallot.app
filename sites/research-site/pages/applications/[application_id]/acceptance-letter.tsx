import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	Page as PageComponent,
	PageStaticProps,
	PageProps,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { ResearchSiteRouteQueryParams } from '@wallot/js';

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID =
	'RESEARCH_SITE__/APPLICATIONS/[APPLICATION_ID]/ACCEPTANCE_LETTER' as const;

// Route Static Props
const ROUTE_STATIC_PROPS: PageStaticProps = {
	routeStaticId: ROUTE_STATIC_ID,
	title: 'Acceptance Letter',
};

// Route Query Params Type
type RouteQueryParams = ResearchSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

const Page: NextPage = () => {
	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// ==== Constants ==== //

	// Router Query
	const query = (router?.query as RouteQueryParams) ?? {};

	// Router Query Param Values
	const { application_id, client_verification } = query;

	// Runtime Route ID
	const ROUTE_RUNTIME_ID = ROUTE_STATIC_ID.replace(
		'[APPLICATION_ID]',
		application_id || '',
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
				Hello, and welcome to a dynamic route in Wallot's Research Site! 🚀
			</p>
			<p className='font-light text-sm'>
				The application_id for this page is: {application_id}
			</p>
			<p className='font-light text-sm'>
				The client_verification for this page is: {client_verification}
			</p>
		</PageComponent>
	);
};

export default Page;
