import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	PageStaticProps,
	PageProps,
	Page as PageComponent,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { getHomeSiteRoute, HomeSiteRouteQueryParams } from '@wallot/js';
import { Fragment } from 'react';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import Link from 'next/link';
import { LogoButton } from '@wallot/react/src/components/LogoButton';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';

const Page: NextPage<PageProps> = (props) => {
	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// Site Origin
	const siteOriginByTarget = useSiteOriginByTarget();

	// ==== Constants ==== //
	const homeSiteOrigin = siteOriginByTarget['HOME_SITE'];
	const applicationUrl = getHomeSiteRoute({
		includeOrigin: true,
		origin: homeSiteOrigin,
		queryParams: {},
		routeStaticId: 'HOME_SITE__/SCHOLARSHIPS',
	});

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
			<Fragment>
				<div className='p-6'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-2'>
							<LogoButton />
						</div>
						<Link
							className='hidden lg:block'
							href={applicationUrl}
							target='_blank'
						>
							<div
								className={cn(
									'bg-black hover:bg-brand-dark',
									'font-medium inline-block px-6 py-1.5 rounded text-white',
									'transition-colors',
								)}
							>
								Apply
							</div>
						</Link>
					</div>
					<div className='h-56' />
					<p className='text-5xl font-normal mb-1'>
						Florida Visionary Scholarship
					</p>
					<p className='text-xl text-gray-500 font-extralight'>
						$5,000 Merit Scholarships for Graduating Seniors from Florida
					</p>
					<Link
						className='block lg:hidden mt-4'
						href={applicationUrl}
						target='_blank'
					>
						<div
							className={cn(
								'bg-black hover:bg-green-500 hover:border-green-600',
								'font-medium inline-block px-6 py-1.5 rounded text-white',
								'transition-colors',
							)}
						>
							Apply
						</div>
					</Link>
				</div>
				<hr className='my-4' />
				<div className='grid grid-cols-4 gap-8 p-6'>
					<div
						className={cn(
							'flex flex-col space-y-5 col-span-3',
							'lg:col-span-1',
						)}
					>
						{[
							{
								subtitle: 'February 20, 2025',
								title: 'Priority Deadline',
							},
							{
								subtitle: 'March 23, 2025',
								title: 'Final Deadline',
							},
							{
								subtitle: 'Wallot, Tampa-based AI Company',
								title: 'Sponsored by',
							},
						].map(({ subtitle, title }) => {
							return (
								<div key={title}>
									<p
										className={cn(
											'text-xs text-gray-500 uppercase font-medium',
										)}
									>
										{title}
									</p>
									<p className={cn('text-base text-gray-700 font-normal')}>
										{subtitle}
										<span className={cn('font-extralight text-sm')}>
											{title.includes('Deadline') ? ' at 11:59 PM EST' : ''}
										</span>
									</p>
								</div>
							);
						})}
					</div>
					<div className='col-span-3'>
						<div className='mb-6 font-extralight flex flex-col space-y-3'>
							<p className={cn('text-2xl text-gray-800 font-semibold')}>
								Heading 1
							</p>
							<p>
								<span className={cn('font-medium text-gray-800')}>
									It has survived not only five centuries, but also the leap
									into electronic typesetting.
								</span>{' '}
								<span className='font-extralight italic'>
									It was popularised in the 1960s with the release of Letraset
								</span>
							</p>
							<p className={cn('text-2xl text-gray-800 font-semibold')}>
								Heading 2
							</p>
							{[1, 2, 3, 4].map(() => (
								<p>
									What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
									printing and typesetting industry. Lorem Ipsum has been the
									industry's standard dummy text ever since the 1500s, when an
									unknown printer took a galley of type and scrambled it to make
									a type specimen book. It has survived not only five centuries,
									but also the leap into electronic typesetting, remaining
									essentially unchanged. It was popularised in the 1960s with
									the release of Letraset sheets containing Lorem Ipsum
									passages, and more recently with desktop publishing software
									like Aldus PageMaker including versions of Lorem Ipsum
								</p>
							))}
							<p>
								It has survived not only five centuries, but also the leap into
								electronic typesetting, remaining essentially unchanged.{' '}
								<span className={cn('font-bold text-gray-800')}>
									Lorem Ipsum is simply dummy text of the printing and
									typesetting industry
								</span>
							</p>
							<p>Your future of your higher education journey starts here.</p>
						</div>
						<div className='mb-6 lg:w-1/2'>
							<p className={cn('text-2xl text-gray-800 font-semibold')}>FAQ</p>
							{[
								{
									question: 'Question 1',
									answer:
										"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
								},
								{
									question: 'Question 2',
									answer: '',
									answersPrefix:
										'Lorem Ipsum is simply dummy text of the printing and typesetting industry:',
									answers: [
										"Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
										'An unknown printer took a galley of type and scrambled it to make a type specimen book',
										'It was popularised in the 1960s with the release of Letraset',
									],
								},
							].map(
								({ question, answer, answers = [], answersPrefix = '' }) => {
									return (
										<div key={question} className='mb-2'>
											<p className={cn('font-medium italic')}>{question}</p>
											{answers.length === 0 && (
												<p className={cn('font-extralight')}>{answer}</p>
											)}
											{answers.length > 0 && (
												<div className={cn('font-extralight')}>
													<span className={cn('font-normal text-gray-800')}>
														{answersPrefix}
													</span>
													<ol
														className={cn(
															'list-decimal list-inside font-extralight',
														)}
													>
														{answers.map((answer) => (
															<li key={answer} className='text-sm'>
																{answer}
															</li>
														))}
													</ol>
												</div>
											)}
										</div>
									);
								},
							)}
						</div>
						<div className='mb-6 font-extralight'>
							<p className={cn('text-2xl text-gray-800 font-semibold')}>
								Apply
							</p>
							<p>
								The application form for the scholarship can be found{' '}
								<Link href={applicationUrl} target='_blank'>
									<span
										className='font-medium underline decoration-dotted underline-offset-2 hover:underline hover:cursor-pointer'
										tabIndex={0}
									>
										here
									</span>
								</Link>
								.
							</p>
						</div>
					</div>
				</div>
				<div className='p-6'>
					<p>© 2025 Wallot</p>
				</div>
			</Fragment>
		</PageComponent>
	);
};

export default Page;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_SITE__/SCHOLARSHIPS' as const;

// Route Query Params Type
type RouteQueryParams = HomeSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

export const getStaticProps: GetStaticProps<PageStaticProps> = () => {
	// Route Static Props
	const ROUTE_STATIC_PROPS: PageStaticProps = {
		routeStaticId: ROUTE_STATIC_ID,
		title: 'Florida Visionary Scholarship',
	};
	return Promise.resolve({
		props: ROUTE_STATIC_PROPS,
	});
};
