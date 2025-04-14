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
import { GoDash, GoPlus } from 'react-icons/go';

type Program = 'Summer Program' | 'Research Fellowship';
const faqs = [
	{
		question: 'What is SHARP?',
		answer:
			'A competitive Summer Honors Academic Research Program for recent graduates to conduct faculty‑mentored research in Tampa.',
	},
	{
		question: 'What is the Wallot Research Fellowship?',
		answer:
			'A 1-2 semester research fellowship offering hands‑on academic research experience and professional development.',
	},
	{
		question: 'What are the program dates?',
		answer:
			'SHARP runs June 2–August 1, 2025; the Fall Fellowship runs September 1–December 12, 2025. Dates for the Spring will be released in the coming weeks.',
	},
	{
		question: 'Where will I live?',
		answer:
			"Both programs house students in the North Tampa area near USF's main campus.",
	},
	{
		question: 'What is the housing layout?',
		answer:
			'2‑bedroom, 2‑bath apartments with full kitchen, washer/dryer, dishwasher, living area, and outdoor patio.',
	},
	{
		question: 'How much does the program cost?',
		answer:
			'The program is fully funded for students. There are no tuition or housing fees associated with the program.',
	},
	{
		question: 'Will I work with a faculty mentor?',
		answer:
			'Yes, each participant is paired with a faculty advisor who provides one‑on‑one guidance and regular feedback.',
	},
	{
		question: 'What is the time commitment?',
		answer:
			'SHARP is full‑time for two months; the Research Fellowship can either be completed part-time (e.g. while taking other college classes in Tampa) or full-time for one semester.',
	},
	{
		question: 'What outcomes can I expect?',
		answer:
			'A completed research project, presentation experience, enhanced skills, and a strong academic network.',
	},
	{
		question: 'How does this prepare me for graduate school or careers?',
		answer:
			'The programs simulate graduate‑level research, build professional competencies, and provide credentials valued by employers and admissions committees.',
	},
];
const firstQuestion = faqs[0]?.question ?? null;

const Page: NextPage<PageStaticProps> = (props) => {
	// ==== State ==== //
	const [program, setProgram] = useState<Program>('Summer Program');
	const [openQuestion, setOpenQuestion] = useState(firstQuestion);

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
						'flex h-12 items-center justify-between px-6 fixed top-0 left-0 w-full z-10 !bg-white',
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
						<Link href='mailto:research@wallot.app' target='_blank'>
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
							<p className='font-light text-sm leading-relaxed'>
								Explore areas of academic curiosity through structured inquiry,
								guided faculty mentorship, and dedicated support from a
								collaborative academic community.
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
							{program === 'Summer Program' && (
								<p className='font-light text-sm text-gray-700 leading-relaxed'>
									<span className='font-semibold'>
										SHARP (Summer Honors Academic Research Program)
									</span>{' '}
									is Wallot's flagship research opportunity for graduating
									seniors. Spend up to eight weeks during the Summer immersed in
									an intensive research project with the goal of drafting a
									manuscript for publication in a scholarly journal.
								</p>
							)}
							{program === 'Research Fellowship' && (
								<p className='font-light text-sm text-gray-700 leading-relaxed'>
									The{' '}
									<span className='font-semibold'>
										Wallot Research Fellowship
									</span>{' '}
									is our second flagship research opportunity for students who
									wish to conduct deep research in their field of interest.
									Students accepted to the Research Fellowship spend 1-2
									semesters during their first year of college completing an
									extended capstone project.
								</p>
							)}
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
								Wallot Research Programs provide students a unique opportunity
								to jumpstart their academic and professional careers.
							</p>
						</div>
						<div>
							<p className='font-light text-xs'>
								Kamar Mack, Lead Engineer at Wallot
							</p>
						</div>
					</div>
					{/* Sidekick Picture */}
					<div className={cn('mt-20', 'lg:max-w-4xl lg:mx-auto')}>
						<Image
							src='/img/photos/research-team.jpg'
							alt='Research Team'
							className='rounded-lg'
							layout='responsive'
							height={1920}
							width={1080}
							priority
						/>
					</div>
					{/* Who We're Looking For */}
					<div
						className={cn(
							'mt-20',
							'flex flex-col space-y-3.5',
							'lg:max-w-lg lg:mx-auto',
						)}
					>
						<div>
							<p className='font-normal text-2xl'>Who we're looking for</p>
						</div>
						<div>
							<p className='font-light text-sm text-gray-700 leading-relaxed'>
								Publishing research is an incredibly rigorous undertaking. The
								process of constructing a manuscript, performing analyses on
								large datasets and completing multiple rounds of peer-review is
								not for everyone. As a result, the primary characteristic that
								we look for in candidates is a strong{' '}
								<span className='font-semibold'>commitment</span> to academic
								excellence.
							</p>
						</div>
						<div>
							<p className='font-light text-sm text-gray-700 leading-relaxed'>
								Our research programs are designed for students across all areas
								of study who genuinely wish to gain valuable research experience
								in order to strengthen their resume/portfolio and fulfill their
								innate intellectual curiosity.
							</p>
						</div>
					</div>
					{/* Tampa Picture */}
					<div
						className={cn(
							'mt-20 flex',
							'flex-col space-y-6',
							'lg:flex-row lg:items-center lg:justify-center',
							'lg:max-w-4xl lg:mx-auto lg:space-x-20 lg:space-y-0',
						)}
					>
						<TampaCopy className={cn('hidden', 'lg:block lg:flex-[3_3_0%]')} />
						<div className='flex-[5_5_0%]'>
							<Image
								src='/img/photos/tampa.jpg'
								alt='Tampa'
								className='rounded-lg'
								layout='responsive'
								height={1920}
								width={1920}
								priority
							/>
						</div>
						<TampaCopy className='block lg:hidden' />
					</div>
					{/* FAQ */}
					<div className={cn('mt-28', 'text-center')}>
						<p className='font-normal text-2xl'>FAQ</p>
					</div>
					<div
						className={cn(
							'mt-8',
							'flex flex-col space-y-1.5',
							'lg:max-w-lg lg:mx-auto',
						)}
					>
						{faqs.map(({ answer, question }) => {
							const open = openQuestion === question;

							return (
								<div className='border-b border-b-gray-200 py-4'>
									<button
										className='flex items-center justify-between w-full'
										onClick={() =>
											setOpenQuestion((prev) =>
												prev === question ? null : question,
											)
										}
									>
										<div>
											<p className='font-normal text-base'>{question}</p>
										</div>
										<div>{open ? <GoDash /> : <GoPlus />}</div>
									</button>
									<div className={cn('mt-2.5', { hidden: !open })}>
										<p className='font-light text-xs text-gray-700 leading-relaxed'>
											{answer}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
				{/* Footer */}
				<div className='p-6 bg-black text-gray-400 flex items-center justify-between'>
					<div>
						<p className={cn('font-extralight p-2 text-white text-sm')}>
							© 2025 Wallot
						</p>
					</div>
					<div>
						<Link
							className=''
							href='mailto:research@wallot.app'
							target='_blank'
						>
							<div className={cn('font-extralight p-2 text-white text-sm')}>
								Contact Us
							</div>
						</Link>
					</div>
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
		title: 'Explore our Research Programs',
	};
	return Promise.resolve({
		props: ROUTE_STATIC_PROPS,
	});
};

function TampaCopy({ className = '' }) {
	return (
		<div className={className}>
			<div>
				<p className='font-light text-sm text-gray-700 leading-relaxed'>
					Wallot research programs are all based in the beautiful and vibrant
					Tampa area. Come see why Tampa is considered to be one of the top
					places in the country to live, learn and work.
				</p>
			</div>
			<div className='mt-4'>
				<p className='font-normal text-base'>Tampa, Florida</p>
			</div>
			<div>
				<p className='font-light text-sm text-gray-700'>
					Your home for the Research Program
				</p>
			</div>
		</div>
	);
}
