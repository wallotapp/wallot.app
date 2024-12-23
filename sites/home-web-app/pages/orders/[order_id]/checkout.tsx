import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	Page as PageComponent,
	PageStaticProps,
	PageProps,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { getHomeWebAppRoute, HomeWebAppRouteQueryParams } from '@wallot/js';
import { useQueryAssetOrderPage } from '@wallot/react/src/features/assetOrders';
import { AuthenticatedPageHeader } from '@wallot/react/src/components/AuthenticatedPageHeader';
import { PageActionHeader } from '@wallot/react/src/components/PageActionHeader';
import { getCurrencyUsdStringFromCents, getEnum } from 'ergonomic';
import Link from 'next/link';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { Separator } from 'ergonomic-react/src/components/ui/separator';
import {
	Dialog,
	DialogContent,
	DialogTrigger,
} from 'ergonomic-react/src/components/ui/dialog';
import { GoCircle, GoCheckCircle } from 'react-icons/go';

const BillingInformationSectionEnum = getEnum([
	'Contact Details',
	'Tax Details',
	'Disclosures',
]);
type BillingInformationSection = keyof typeof BillingInformationSectionEnum.obj;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_WEB_APP__/ORDERS/[ORDER_ID]/CHECKOUT' as const;

// Route Static Props
const ROUTE_STATIC_PROPS: PageStaticProps = {
	routeStaticId: ROUTE_STATIC_ID,
	title: 'Checkout',
};

// Route Query Params Type
type RouteQueryParams = HomeWebAppRouteQueryParams[typeof ROUTE_STATIC_ID];

const Page: NextPage = () => {
	// ==== State ==== //
	const [activeBillingInformationSection, setActiveBillingInformationSection] =
		useState<BillingInformationSection | null>(null);
	const showBillingInformationDialog = activeBillingInformationSection !== null;
	const idxOfActiveBillingInformationSection = showBillingInformationDialog
		? BillingInformationSectionEnum.arr.indexOf(activeBillingInformationSection)
		: -1;
	const isSectionComplete = (section: BillingInformationSection) => {
		const idx = BillingInformationSectionEnum.arr.indexOf(section);
		return idx < idxOfActiveBillingInformationSection;
	};

	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// Site Origin by Target
	const siteOriginByTarget = useSiteOriginByTarget();

	// ==== Constants ==== //

	// Router Query
	const query = (router?.query as RouteQueryParams) ?? {};

	// Router Query Param Values
	const { order_id } = query;

	// Runtime Route ID
	const ROUTE_RUNTIME_ID = ROUTE_STATIC_ID.replace(
		'[ORDER_ID]',
		order_id || '',
	);

	// Runtime Page Props
	const pageProps: PageProps = {
		...ROUTE_STATIC_PROPS,
		routeId: ROUTE_RUNTIME_ID,
	};

	// ==== Hooks ==== //
	const { data: assetOrderPage } = useQueryAssetOrderPage({
		firestoreQueryOptions: {
			whereClauses: [['order', '==', order_id]],
		},
	});
	const assetOrders = assetOrderPage?.documents ?? [];
	const assetTotalAmount = assetOrders.reduce((acc, assetOrder) => {
		return acc + Number(assetOrder.amount);
	}, 0);
	const assetTotalAmountUsdString = getCurrencyUsdStringFromCents(
		assetTotalAmount + 2499,
	);

	// ==== Billing Information Forms ==== //
	const ContactDetailsForm = () => {
		return (
			<div className='relative'>
				<div className='h-[70vh] overflow-y-auto'>
					<p className='font-semibold text-xl'>Enter your Contact Details</p>
					<p className='font-extralight text-sm'>
						This information is stored securely and used in the event that there
						are problems processing your order
					</p>
					<div className='h-24' />
				</div>
				<div className='fixed -bottom-0.5 bg-background py-4 w-full'>
					<div className='flex justify-between space-x-4'>
						<div className='flex-1'>
							<button
								className='w-full text-center bg-slate-200 py-2 rounded-md border border-slate-300'
								type='button'
							>
								<p className='font-normal text-sm'>Back</p>
							</button>
						</div>
						<div className='flex-1'>
							<button
								className='w-full text-center bg-black py-2 rounded-md border'
								type='button'
							>
								<p className='font-normal text-sm text-white'>Continue</p>
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	};
	const TaxDetailsForm = () => {
		return <div></div>;
	};
	const DisclosuresForm = () => {
		return <div></div>;
	};

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<div className={cn('flex flex-col min-h-screen min-w-screen relative')}>
				<AuthenticatedPageHeader showHomeLink={false} />
				<PageActionHeader />
				<div
					className={cn(
						'min-h-[95vh] w-full',
						'py-48 px-6',
						'lg:py-48 lg:px-28',
					)}
				>
					<div>
						<div className={cn('lg:flex lg:justify-between lg:space-x-28')}>
							<div className='lg:w-3/5'>
								<div>
									<p className='font-semibold text-3xl'>Checkout</p>
								</div>
								<Dialog
									open={showBillingInformationDialog}
									onOpenChange={(open) => {
										if (!open) {
											setActiveBillingInformationSection(null);
										}
									}}
									defaultOpen={false}
								>
									<DialogTrigger asChild>
										<button
											className='mt-8 rounded-xl bg-white px-5 py-6 border border-slate-200 w-full text-left'
											type='button'
											onClick={() =>
												setActiveBillingInformationSection(
													BillingInformationSectionEnum.obj['Contact Details'],
												)
											}
										>
											<div>
												<p>Billing Information</p>
											</div>
										</button>
									</DialogTrigger>
									<DialogContent className='!h-[80vh] !max-h-[80vh] !w-[80vw] !max-w-[80vw]'>
										<div className='mt-4 flex space-x-10'>
											<div className=''>
												{BillingInformationSectionEnum.arr.map(
													(billingInformationSection) => {
														const isComplete = isSectionComplete(
															billingInformationSection,
														);
														return (
															<div
																key={billingInformationSection}
																className='flex space-x-2 items-center'
															>
																<div>
																	{isComplete ? (
																		<GoCheckCircle className='text-brand' />
																	) : (
																		<GoCircle className='' />
																	)}
																</div>
																<div
																	className=''
																	onClick={() =>
																		setActiveBillingInformationSection(
																			billingInformationSection,
																		)
																	}
																>
																	{billingInformationSection}
																</div>
															</div>
														);
													},
												)}
											</div>
											<div
												className={cn(
													'max-w-md absolute left-[42%] transform -translate-x-1/2',
													'',
												)}
											>
												{activeBillingInformationSection ===
													'Contact Details' && <ContactDetailsForm />}
												{activeBillingInformationSection === 'Tax Details' && (
													<TaxDetailsForm />
												)}
												{activeBillingInformationSection === 'Disclosures' && (
													<DisclosuresForm />
												)}
											</div>
										</div>
									</DialogContent>
								</Dialog>
								<div className='mt-8 rounded-xl bg-white px-5 py-6 border border-slate-200'>
									<div>
										<p>Payment</p>
									</div>
								</div>
							</div>
							<div
								className={cn(
									'bg-slate-100 mt-8 px-10 py-10 rounded-xl h-fit',
									'lg:w-2/5',
								)}
							>
								<div>
									<p className='font-semibold text-xl'>Order Summary</p>
								</div>
								<div className='mt-2.5'>
									<p className='font-medium text-base'>
										{assetOrders.length} item{assetOrders.length > 1 ? 's' : ''}
									</p>
								</div>
								<div className='mt-4'>
									<Separator />
								</div>
								<div className='mt-6 flex justify-between'>
									<div>
										<p className='font-semibold text-xl'>
											Total{' '}
											<span className='text-sm text-brand-dark'>(USD)</span>
										</p>
									</div>
									<div>
										<p className='font-medium text-xl'>
											{assetTotalAmountUsdString}
										</p>
									</div>
								</div>
								<div className='mt-6'>
									<Link
										href={getHomeWebAppRoute({
											includeOrigin: true,
											origin: siteOriginByTarget.HOME_WEB_APP,
											queryParams: { asset_id: 'todo' },
											routeStaticId:
												'HOME_WEB_APP__/ASSETS/[ASSET_ID]/CONGRATULATIONS',
										})}
									>
										<button className='w-full'>
											<div className='bg-black py-2.5 px-10 rounded-sm flex items-center justify-center space-x-2'>
												<p className='font-medium text-sm text-white dark:text-brand'>
													Complete Purchase
												</p>
											</div>
										</button>
									</Link>
								</div>
								<div className='mt-6'>
									<p className='font-normal text-sm'>
										By clicking "Complete Purchase", you agree to our{' '}
										<Link href='/terms'>
											<span className='underline'>Terms of Service</span>
										</Link>{' '}
										and{' '}
										<Link href='/privacy'>
											<span className='underline'>Privacy Policy</span>
										</Link>
										, and affirm that the billing information you provided is
										accurate and complete to the best of your knowledge. In
										addition, you agree that you are conducting trading activity
										at your own risk and that you are responsible for any losses
										that may occur.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</PageComponent>
	);
};

export default Page;
