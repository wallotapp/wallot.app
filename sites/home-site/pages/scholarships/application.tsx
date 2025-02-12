import { useState } from 'react';
import * as R from 'ramda';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	PageStaticProps,
	PageProps,
	Page as PageComponent,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { HomeSiteRouteQueryParams } from '@wallot/js';
import { default as cn } from 'ergonomic-react/src/lib/cn';

const Page: NextPage<PageProps> = (props) => {
	// ==== State ==== //
	const [currentStep, setCurrentStep] = useState(0);
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
	const toggleMobileMenu = () => setMobileMenuOpen(R.not);

	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// ==== Constants ==== //

	// Router Query
	const query: RouteQueryParams = router?.query ?? {};

	// Router Query Param Values
	const _ = query;
	typeof _;
	// Runtime Route ID
	const ROUTE_RUNTIME_ID = props.routeStaticId;

	// Runtime Page Props
	const pageProps: PageProps = {
		...props,
		routeId: ROUTE_RUNTIME_ID,
	};

	// Define our steps and their fields.
	const steps = [
		{
			title: 'Step 1',
			fields: [
				{ name: 'name', type: 'text' },
				{ name: 'age', type: 'number' },
			],
		},
		{
			title: 'Step 2',
			fields: [
				{ name: 'weight', type: 'number' },
				{ name: 'height', type: 'text' },
			],
		},
		{
			title: 'Step 3',
			fields: [{ name: 'notes', type: 'textarea' }],
		},
	];
	const currentStepData = steps[currentStep];
	const isLastStep = currentStep === steps.length - 1;
	if (!currentStepData) {
		return null;
	}

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<div className='min-h-screen bg-gray-50'>
				<div className='flex flex-col md:flex-row'>
					{/* Left sidebar (visible on Tablet and Desktop) */}
					<aside className='hidden md:block md:w-1/4 lg:w-1/5 bg-white p-4 shadow'>
						<ul>
							{steps.map((step, index) => (
								<li
									key={step.title}
									className={cn('cursor-pointer p-2', {
										'font-bold text-blue-500': index === currentStep,
										'text-gray-700': index !== currentStep,
									})}
									onClick={() => setCurrentStep(index)}
								>
									{step.title}
								</li>
							))}
						</ul>
					</aside>

					{/* Main content area */}
					<main className='flex-1 p-4'>
						{/* Mobile collapsible steps menu (visible on Mobile) */}
						<div className='md:hidden mb-4'>
							<button
								className='w-full flex justify-between items-center bg-white p-2 shadow rounded'
								onClick={toggleMobileMenu}
							>
								<span className='font-bold'>{currentStepData.title}</span>
								<svg
									className={cn(
										'w-4 h-4 transform transition-transform duration-200',
										{
											'rotate-180': isMobileMenuOpen,
										},
									)}
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M19 9l-7 7-7-7'
									/>
								</svg>
							</button>
							{isMobileMenuOpen && (
								<ul className='mt-2 bg-white shadow rounded'>
									{steps.map((step, index) => (
										<li
											key={step.title}
											className={cn(
												'cursor-pointer p-2 border-b last:border-b-0',
												{
													'font-bold text-blue-500': index === currentStep,
													'text-gray-700': index !== currentStep,
												},
											)}
											onClick={() => {
												setCurrentStep(index);
												setMobileMenuOpen(false);
											}}
										>
											{step.title}
										</li>
									))}
								</ul>
							)}
						</div>

						{/* Form container */}
						<div className='bg-white p-6 shadow rounded'>
							{/* Form header */}
							<div className='flex justify-between items-center mb-4'>
								<h1 className='text-xl font-bold'>{currentStepData.title}</h1>
								<button className='text-sm text-blue-500'>Save Progress</button>
							</div>

							{/* Form fields */}
							<form>
								<div className='space-y-4'>
									{currentStepData.fields.map((field) => (
										<div key={field.name}>
											<label
												htmlFor={field.name}
												className='block mb-1 capitalize'
											>
												{field.name}
											</label>
											{field.type === 'textarea' ? (
												<textarea
													id={field.name}
													className='w-full border p-2 rounded'
												/>
											) : (
												<input
													id={field.name}
													type={field.type}
													className='w-full border p-2 rounded'
												/>
											)}
										</div>
									))}
								</div>

								{/* Navigation buttons */}
								<div className='mt-6 flex justify-between'>
									<button
										type='button'
										disabled={currentStep === 0}
										className={cn('px-4 py-2 rounded', {
											'bg-gray-200 text-gray-500 cursor-not-allowed':
												currentStep === 0,
											'bg-blue-500 text-white': currentStep > 0,
										})}
										onClick={() =>
											currentStep > 0 && setCurrentStep(currentStep - 1)
										}
									>
										Back
									</button>

									<button
										type='button'
										className={cn(
											'bg-blue-500 text-white px-4 py-2 rounded',
											isLastStep ? 'hidden' : '',
										)}
										onClick={() => setCurrentStep(currentStep + 1)}
									>
										Next
									</button>
									<button
										type='submit'
										className={cn(
											'bg-green-500 text-white px-4 py-2 rounded',
											isLastStep ? '' : 'hidden',
										)}
									>
										Submit
									</button>
								</div>
							</form>
						</div>
					</main>

					{/* Right callout cards (visible on Desktop) */}
					<aside className='hidden lg:block lg:w-1/4 bg-white p-4 shadow'>
						<div className='mb-4'>
							<h2 className='font-bold mb-2'>Callout 1</h2>
							<p className='text-gray-700 text-sm'>
								Some helpful information or tips.
							</p>
						</div>
						<div>
							<h2 className='font-bold mb-2'>Callout 2</h2>
							<p className='text-gray-700 text-sm'>
								Additional callout details go here.
							</p>
						</div>
					</aside>
				</div>
			</div>
		</PageComponent>
	);
};

export default Page;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_SITE__/SCHOLARSHIPS/APPLICATION' as const;

// Route Query Params Type
type RouteQueryParams = HomeSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

export const getStaticProps: GetStaticProps<PageStaticProps> = () => {
	// Route Static Props
	const ROUTE_STATIC_PROPS: PageStaticProps = {
		routeStaticId: ROUTE_STATIC_ID,
		title: 'Florida Visionary Scholarship Application',
	};
	return Promise.resolve({
		props: ROUTE_STATIC_PROPS,
	});
};
