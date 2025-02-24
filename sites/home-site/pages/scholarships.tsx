import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	PageStaticProps,
	PageProps,
	Page as PageComponent,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import {
	getHomeSiteRoute,
	getSsoSiteRoute,
	HomeSiteRouteQueryParams,
	isSubmittedScholarshipApplication,
} from '@wallot/js';
import { Fragment } from 'react';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import Link from 'next/link';
import { AsyncLink } from 'ergonomic-react/src/components/custom-ui/async-link';
import { LogoButton } from '@wallot/react/src/components/LogoButton';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { useQueryScholarshipApplicationsForLoggedInUser } from '@wallot/react/src/features/scholarshipApplications/hooks/useQueryScholarshipApplicationsForLoggedInUser';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import { useContext } from 'react';
import { PiSparkleLight } from 'react-icons/pi';
import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { Separator } from 'ergonomic-react/src/components/ui/separator';
import { PlatformIcon } from 'ergonomic-react/src/components/brand/PlatformIcon';
import { OPEN_GRAPH_CONFIG } from 'ergonomic-react/src/config/openGraphConfig';
import {
	DialogHeader,
	DialogFooter,
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from 'ergonomic-react/src/components/ui/dialog';
import Image from 'next/image';

const events = [
	{
		time: 'Mar 5, 2025',
		title: 'Gainesville',
		location: 'Gainesville',
		tags: ['Virtual'],
	},
	{
		time: 'Mar 6, 2025',
		title: 'Tampa',
		location: 'Tampa',
		tags: ['In-person'],
	},
	{
		time: 'Mar 7, 2025',
		title: 'Panama City',
		location: 'Panama City',
		tags: ['Virtual'],
	},
	{
		time: 'Mar 8, 2025',
		title: 'Orlando',
		location: 'Orlando',
		tags: ['In-person'],
	},
	{
		time: 'Mar 12, 2025',
		title: 'West Palm Beach',
		location: 'West Palm Beach',
		tags: ['Virtual'],
	},
	{
		time: 'Mar 13, 2025',
		title: 'Jacksonville',
		location: 'Jacksonville',
		tags: ['Virtual'],
	},
	{
		time: 'Mar 14, 2025',
		title: 'Tampa',
		location: 'Tampa',
		tags: ['In-person'],
	},
	{
		time: 'Mar 15, 2025',
		title: 'Sarasota',
		location: 'Sarasota',
		tags: ['In-person'],
	},
	{
		time: 'Mar 19, 2025',
		title: 'Fort Lauderdale',
		location: 'Fort Lauderdale',
		tags: ['Virtual'],
	},
	{
		time: 'Mar 20, 2025',
		title: 'Tallahassee',
		location: 'Tallahassee',
		tags: ['Virtual'],
	},
	{
		time: 'Mar 21, 2025',
		title: 'Cape Coral',
		location: 'Cape Coral',
		tags: ['In-person'],
	},
	{
		time: 'Mar 22, 2025',
		title: 'Lakeland',
		location: 'Lakeland',
		tags: ['In-person'],
	},
	{
		time: 'Mar 26, 2025',
		title: 'Miami',
		location: 'Miami',
		tags: ['Virtual'],
	},
	{
		time: 'Mar 27, 2025',
		title: 'Pensacola',
		location: 'Pensacola',
		tags: ['Virtual'],
	},
	{
		time: 'Mar 28, 2025',
		title: 'Orlando',
		location: 'Orlando',
		tags: ['In-person'],
	},
	{
		time: 'Mar 29, 2025',
		title: 'Tampa',
		location: 'Tampa',
		tags: ['In-person'],
	},
].map((event, eventIdx) => ({
	...event,
	imageSrc: `/img/banners/${(eventIdx + 1) % 4}.jpg`,
}));
const firstEvent = events[0]!;
const { time, title, location, tags, imageSrc } = firstEvent;

const Page: NextPage<PageProps> = (props) => {
	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// Site Origin
	const siteOriginByTarget = useSiteOriginByTarget();
	const homeSiteOrigin = siteOriginByTarget['HOME_SITE'];
	const ssoSiteOrigin = siteOriginByTarget['SSO_SITE'];

	// ==== Constants ==== //

	// Router Query
	const query: RouteQueryParams = router?.query ?? {};

	// Router Query Param Values
	const _ = query;
	typeof _;

	// Auth status
	const { user } = useContext(AuthContext);
	const isUserSignedIn = user?.uid != null;

	// Application status
	const {
		resourcesForLoggedInUser: scholarshipApplicationsForLoggedInUser,
		isResourcePageLoading: isScholarshipApplicationPageLoading,
	} = useQueryScholarshipApplicationsForLoggedInUser();
	const scholarshipApplicationForLoggedInUser =
		scholarshipApplicationsForLoggedInUser[0] ?? null;
	const isScholarshipApplicationForLoggedInUserSubmitted =
		scholarshipApplicationForLoggedInUser != null &&
		isSubmittedScholarshipApplication(scholarshipApplicationForLoggedInUser);

	// ==== Constants ==== //

	// Home URL (current page)
	const homeUrl = getHomeSiteRoute({
		includeOrigin: false,
		origin: null,
		queryParams: {},
		routeStaticId: 'HOME_SITE__/SCHOLARSHIPS',
	});

	// Application URL
	const loggedInApplicationUrl = getHomeSiteRoute({
		includeOrigin: true,
		origin: homeSiteOrigin,
		queryParams: {},
		routeStaticId: 'HOME_SITE__/SCHOLARSHIPS/APPLICATION',
	});
	const guestApplicationUrl = getSsoSiteRoute({
		includeOrigin: true,
		origin: ssoSiteOrigin,
		queryParams: {
			dest: loggedInApplicationUrl,
		},
		routeStaticId: 'SSO_SITE__/REGISTER',
	});
	const applicationUrl = isUserSignedIn
		? loggedInApplicationUrl
		: guestApplicationUrl;
	const isApplicationUrlReady = isUserSignedIn
		? !isScholarshipApplicationPageLoading
		: true;

	// Runtime Route ID
	const ROUTE_RUNTIME_ID = props.routeStaticId;

	// Runtime Page Props
	const pageProps: PageProps = {
		...props,
		routeId: ROUTE_RUNTIME_ID,
		thumbnailData: {
			thumbnail: '/img/brand/og-image-scholarship.png',
			thumbnailAlt: 'Wallot Scholarship',
			thumbnailHeight: 538,
			thumbnailType: 'image/png',
			thumbnailWidth: '1024',
		},
	};

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<Fragment>
				<div className='pt-6 px-6 bg-black'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-2'>
							<div>
								<LogoButton homeHref={homeUrl} theme='dark' />
							</div>
						</div>
						<div className={cn('hidden lg:block')}>
							<AttendOpenHouseButton />
						</div>
					</div>
					<div className='h-36' />
					<p className='text-5xl font-normal text-gray-100 text-center'>
						Florida Visionary Scholarship
					</p>
					<p className='text-xl text-gray-400 font-extralight text-center mt-1.5'>
						$5,000 Merit Scholarships for Graduating Seniors from Florida
					</p>
					<div className='mt-10 lg:mt-5 text-center'>
						<AsyncLink
							className=''
							href={applicationUrl}
							target='_blank'
							isReady={isApplicationUrlReady}
						>
							{isApplicationUrlReady ? (
								<div
									className={cn(
										'bg-gray-100 hover:bg-brand-dark',
										'font-medium inline-block px-6 py-1.5 rounded text-black hover:text-white',
										'transition-colors',
									)}
								>
									{scholarshipApplicationForLoggedInUser == null
										? 'Start'
										: isScholarshipApplicationForLoggedInUserSubmitted
										? 'View'
										: 'Continue'}{' '}
									Application
								</div>
							) : (
								<>
									<div className='flex items-center justify-center space-x-2 min-w-16'>
										<div
											className={cn(
												'w-4 h-4 border-2 border-gray-200 rounded-full animate-spin',
												'border-t-brand border-r-brand border-b-brand',
											)}
										></div>
									</div>
								</>
							)}
						</AsyncLink>
					</div>
					<div className={cn('block lg:hidden')}>
						<div className='my-8 flex flex-col items-center'>
							<Separator className='!bg-gray-400 !w-16' />
						</div>
						<div className='flex flex-col items-center'>
							<AttendOpenHouseButton className='mx-auto' />
						</div>
					</div>
					<div className='h-24 lg:h-36' />
				</div>
				<div className='grid grid-cols-4 gap-8 pb-6 pt-10 px-6'>
					<div
						className={cn(
							'flex flex-col space-y-5 col-span-3',
							'lg:col-span-1',
						)}
					>
						{[
							{
								subtitle: 'February 28, 2025',
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
								A Commitment to Florida's Future
							</p>
							<p>
								<span className={cn('font-medium text-gray-800')}>
									Wallot is excited to announce that we are currently accepting
									applications for our inaugural Florida Visionary Scholarship
									Program.
								</span>{' '}
								<span className='font-extralight italic'>
									This program celebrates the inspirational academic, athletic,
									and extracurricular achievement of Florida students by
									awarding each recipient a yearly merit scholarship toward
									their college's cost of attendance.
								</span>
							</p>
							<p>
								All graduating Seniors from the state of Florida who are
								matriculating to an accredited 2-year or 4-year college this
								Fall are eligible to apply.
							</p>
							<p className={cn('text-2xl text-gray-800 font-semibold')}>
								Scholarship Awards
							</p>
							<p>
								<span className='font-medium text-sm underline'>
									Academic Achievement Award
								</span>
								<br />
								This scholarship honors students with outstanding academic
								records and commitment to learning. Recipients excel
								consistently and engage in rigorous coursework and innovative
								research.{' '}
								<span className='italic'>
									Applicant's GPA must be in the{' '}
									<span className='font-medium'>top 15%</span> of his/her class
									to apply.
								</span>
							</p>
							<p>
								<span className='font-medium text-sm underline'>
									Outstanding Student-Athlete Award
								</span>
								<br />
								This award honors students who excel academically and
								athletically. Recipients balance competitive spirit with
								scholastic diligence and demonstrate leadership under pressure.
								<span className='italic'>
									Applicants must have at minimum{' '}
									<span className='font-medium'>two years</span> of varsity
									athletic experience to apply.
								</span>
							</p>
							<p>
								<span className='font-medium text-sm underline'>
									Community Leadership Award
								</span>
								<br />
								This scholarship celebrates individuals who positively impact
								their communities through service and leadership. Applicants
								must show meaningful involvement and proactive civic engagement.
							</p>
							<p>
								<span className='font-medium text-sm underline'>
									Entrepreneurial Excellence Award
								</span>
								<br />
								This award honors students who drive innovation and turn ideas
								into impact. Candidates must show a forward-thinking mindset and
								seize opportunities for growth.
							</p>
							<p>The future of your higher education journey starts here.</p>
						</div>
						<div className='mb-6 lg:w-1/2'>
							<p className={cn('text-2xl text-gray-800 font-semibold')}>FAQ</p>
							{[
								{
									question: 'Can I apply for more than one scholarship?',
									answer:
										'Yes, we recommend that you apply to any of the scholarships that you believe you are a good fit for. However, students can only be awarded at most one scholarship.',
								},
								{
									question:
										"The college that I'm attending is not in Florida. Can I still apply?",
									answer:
										'Yes, all graduating Seniors from Florida high schools are eligible to apply for the scholarship, regardless of the location of the college you plan to attend.',
								},
								{
									question: 'Which expenses may the scholarship be used for?',
									answer:
										'The scholarship may be used for any expenses related to college cost of attendance, including tuition, room and board, books, and other fees.',
								},
								{
									question: 'When is the deadline to apply?',
									answer: '',
									answersPrefix:
										'The following are the most important dates for the scholarship:',
									answers: [
										'The priority application window is open until 11:59pm EST on February 28th.',
										'Late applications will be accepted until our interview process ends March 23rd.',
									],
								},
								{
									question: 'When will I know if I have been selected?',
									answer: 'Final decisions will be delivered in mid-April.',
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
				<div className='p-6 bg-black text-gray-400 flex items-center justify-between'>
					<div>
						<p className={cn('font-extralight p-2 text-white text-sm')}>
							© 2025 Wallot
						</p>
					</div>
					<div>
						<Link
							className=''
							href='mailto:scholarships@wallot.app'
							target='_blank'
						>
							<div className={cn('font-extralight p-2 text-white text-sm')}>
								Contact Us
							</div>
						</Link>
					</div>
				</div>
			</Fragment>
		</PageComponent>
	);
};

function AttendOpenHouseButton({ className = '' }: BaseComponent) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div className={className}>
					<div className='p-[1.5px] bg-gradient-to-r from-brand-dark via-pink-600 to-red-800 animate-gradient-rotate bg-[length:200%_200%] rounded w-fit cursor-pointer'>
						<div className='bg-black rounded flex items-center space-x-1 py-2 px-4 w-fit'>
							<div>
								<PiSparkleLight className='text-white text-sm' />
							</div>
							<div>
								<p className={cn('font-extralight text-white text-sm')}>
									Attend our Next Open House
								</p>
							</div>
						</div>
					</div>
				</div>
			</DialogTrigger>
			<DialogContent className=''>
				<div className={cn('flex items-center justify-center space-x-3')}>
					<div>
						<Icon size='lg' />
					</div>
				</div>
				<DialogHeader className='mt-2'>
					<DialogTitle className='!text-center'>
						We hope to see you at our next Open House!
					</DialogTitle>
					<DialogDescription className='!text-center'>
						The Florida Visionary Scholarship program committee is hosting
						informal open house events both in-person and virtually to help
						applicants learn more about the scholarship and get to know our
						team. Spaces at each event are limited, so RSVP asap!
					</DialogDescription>
				</DialogHeader>
				<div className={cn('flex space-x-3 overflow-x-auto')}>
					<div
						className={cn(
							'relative rounded-lg shadow-md bg-white border border-gray-200 mb-5 w-full',
						)}
					>
						<div className='h-20 w-full relative'>
							<Image
								alt={`Event Banner`}
								className='rounded-t-lg'
								priority
								layout='fill' // makes the image fill the parent container
								objectFit='cover' // crops the image to fill the container without stretching
								src={imageSrc}
							/>
						</div>
						<div className='p-5'>
							<div className=''>
								<p className='text-gray-400 text-sm'>{time}</p>
							</div>
							<div className='mt-2'>
								<p className='font-semibold text-gray-900 text-2xl'>{title}</p>
							</div>
							<div className='mt-2'>
								<p className='text-gray-500 text-sm'>{location}</p>
							</div>
							<div className='mt-2'>
								{tags.map((tag) => {
									return (
										<span
											className='bg-gray-100 border border-gray-200 font-light inline-block m-1 px-2 py-1 rounded text-gray-500 text-sm'
											key={tag}
										>
											{tag}
										</span>
									);
								})}
							</div>
						</div>
					</div>
				</div>
				<Separator className='my-4' />
				<DialogFooter className=''>
					<div className={cn('mt-1', 'lg:max-w-2xl')}>
						<p className='font-semibold text-xs'>Scheduling Conflicts</p>
						<p className='font-light text-[0.55rem]'>
							While we have several open houses scheduled, we understand that
							some students may have scheduling conflicts on account of prior
							obligations. If you are unable to attend any of the scheduled open
							houses, please email us at scholarships@wallot.app with your
							availability and a member of our team will do our best schedule a
							time to meet with you.
						</p>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

function Icon({ size }: { size: 'md' | 'sm' | 'lg' | 'xl' | '2xl' | '3xl' }) {
	return (
		<div className='flex items-center justify-center'>
			{OPEN_GRAPH_CONFIG.siteBrandIconDarkMode &&
				OPEN_GRAPH_CONFIG.siteBrandIconLightMode && (
					<PlatformIcon
						height={380}
						size={size}
						srcMap={{
							dark: OPEN_GRAPH_CONFIG.siteBrandIconDarkMode,
							light: OPEN_GRAPH_CONFIG.siteBrandIconLightMode,
						}}
						width={2048}
					/>
				)}
			{!(
				OPEN_GRAPH_CONFIG.siteBrandIconDarkMode &&
				OPEN_GRAPH_CONFIG.siteBrandIconLightMode
			) && (
				<div>
					<p className={cn('text-2xl font-bold', 'lg:text-3xl')}>
						{OPEN_GRAPH_CONFIG.siteName}
					</p>
				</div>
			)}
		</div>
	);
}

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
