import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Page as PageComponent, PageStaticProps, PageProps } from 'ergonomic-react/src/components/nextjs-pages/Page';
import { BlogWebAppRouteQueryParams } from '@wallot/js';

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'BLOG_WEB_APP__/POSTS/[SLUG]/CONTENT' as const;

// Route Static Props
const ROUTE_STATIC_PROPS: PageStaticProps = {
	routeStaticId: ROUTE_STATIC_ID,
	title: 'Content',
};

// Route Query Params Type
type RouteQueryParams = BlogWebAppRouteQueryParams[typeof ROUTE_STATIC_ID];

const Page: NextPage = () => {
	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// ==== Constants ==== //

	// Router Query
	const query = (router?.query as RouteQueryParams) ?? {};

	// Router Query Param Values
	const { slug } = query;

	// Runtime Route ID
	const ROUTE_RUNTIME_ID = ROUTE_STATIC_ID.replace('[SLUG]', slug || '');

	// Runtime Page Props
	const pageProps: PageProps = {
		...ROUTE_STATIC_PROPS,
		routeId: ROUTE_RUNTIME_ID,
	};

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<p className='font-medium text-xl'>Hello, and welcome to a dynamic route in Wallot's Blog Web App! 🚀</p>
			<p className='font-light text-sm'>The slug for this page is: {slug}</p>
		</PageComponent>
	);
};

export default Page;
