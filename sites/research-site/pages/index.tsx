import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	PageStaticProps,
	PageProps,
	Page as PageComponent,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { ResearchSiteRouteQueryParams } from '@wallot/js';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import Link from 'next/link';
import { PlatformLogo } from 'ergonomic-react/src/components/brand/PlatformLogo';

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
			<div
				className={cn(
					'flex flex-col min-h-screen min-w-screen relative bg-white',
				)}
			>
				{/* Header */}
				<div
					className={cn(
						'flex h-12 items-center justify-between px-6 fixed top-0 left-0 w-full z-10',
					)}
				>
					<div>
						<Link href='/'>
							<PlatformLogo
								height={380}
								size='md'
								srcMap={{
									dark: '/img/brand/logo-black.png',
									light: '/img/brand/logo-black.png',
								}}
								theme='light'
								width={2048}
							/>
						</Link>
					</div>
					<div>
						<Link href='mailto:research@wallot.app'>
							<div className='hover:underline'>
								<p className='font-light text-base'>Contact Us</p>
							</div>
						</Link>
					</div>
				</div>
				<div
					className={cn(
						'min-h-[95vh] w-full',
						'py-36 px-6',
						'lg:py-36 lg:px-28',
					)}
				>
					<p className='font-medium text-xl'>
						Hello, and welcome to Wallot's Research Site! 🚀
					</p>
					<p className='font-light text-sm'>
						Almost before we knew it, we had left the ground.
					</p>
				</div>
			</div>
		</PageComponent>
	);
};

export default Page;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'RESEARCH_SITE__/INDEX' as const;

// Route Query Params Type
type RouteQueryParams = ResearchSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

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
