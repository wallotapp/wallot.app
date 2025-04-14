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
import Image from 'next/image';
import { PlatformLogo } from 'ergonomic-react/src/components/brand/PlatformLogo';
import { useState } from 'react';

type Program = 'Summer Program' | 'Research Fellowship';

const Page: NextPage<PageStaticProps> = (props) => {
	// ==== State ==== //
	const [program, setProgram] = useState<Program>('Summer Program');

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
				{/* Navigation Menu */}
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
				{/* Main stuff */}
				<div className={cn('min-h-[95vh] w-full', 'py-36 px-4', 'lg:px-10')}>
					{/* Hero Title */}
					<div
						className={cn('flex flex-col items-center text-center space-y-4')}
					>
						<div>
							<p className='font-normal text-xs'>Welcome</p>
						</div>
						<div>
							<p className='font-normal text-5xl'>Wallot Research</p>
						</div>
						<div className='lg:max-w-2xl'>
							<p className='font-light text-sm'>
								What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
								printing and typesetting industry. Lorem Ipsum has been the
								industry's.
							</p>
						</div>
					</div>
					{/* Hero Picture */}
					<div className={cn('mt-10', 'lg:max-w-4xl lg:mx-auto')}>
						<Image
							src='/img/photos/researcher.jpg'
							alt='Researcher'
							className='rounded-lg'
							layout='responsive'
							height={1920}
							width={1080}
							priority
						/>
					</div>
					{/* Toggle Menu between SHARP and Fellowship */}
					<div
						className={cn('mt-14', 'flex space-x-4', 'lg:max-w-lg lg:mx-auto')}
					>
						{[
							{ title: 'Summer Program' as const },
							{ title: 'Research Fellowship' as const },
						].map(({ title }) => {
							const isSelected = program === title;

							return (
								<div key={title}>
									<button onClick={() => setProgram(title)}>
										<p
											className={cn('text-sm', {
												'font-semibold underline underline-offset-8':
													isSelected,
												'font-light text-gray-600': !isSelected,
											})}
										>
											{title}
										</p>
									</button>
								</div>
							);
						})}
					</div>
					{/* About the Program */}
					<div
						className={cn(
							'mt-10',
							'flex flex-col space-y-2.5',
							'lg:max-w-lg lg:mx-auto',
						)}
					>
						<div>
							<p className='font-normal text-2xl'>About the program</p>
						</div>
						<div>
							<p className='font-light text-sm'>
								What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
								printing and typesetting industry. Lorem Ipsum has been the
								industry's standard dummy text ever since the 1500s, when an
								unknown printer took a galley of type and scrambled it to make a
								type specimen book.
							</p>
						</div>
					</div>
					{/* Promo Quote */}
					<div
						className={cn(
							'mt-20',
							'flex flex-col space-y-6',
							'lg:max-w-2xl lg:mx-auto',
							'text-center',
						)}
					>
						<div>
							<p className='font-normal text-3xl'>
								What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
								printing and typesetting industry. Lorem Ipsum has been the
								industry's standard.
							</p>
						</div>
						<div>
							<p className='font-light text-xs'>
								Kamar Mack, Lead Engineer of Wallot
							</p>
						</div>
					</div>
					{/* Sidekick Picture */}
					<div className={cn('mt-20', 'lg:max-w-4xl lg:mx-auto')}>
						<Image
							src='/img/photos/researcher.jpg'
							alt='Researcher'
							className='rounded-lg'
							layout='responsive'
							height={1920}
							width={1080}
							priority
						/>
					</div>
					{/* Who We're Looking For */}
					{/* FAQ */}
					{/* Footer */}
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
