import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	Page as PageComponent,
	PageStaticProps,
	PageProps,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import {
	HomeSiteRouteQueryParams,
	isBankAccountApprovedByAlpaca,
} from '@wallot/js';
import { AccountDashboardPage } from '@wallot/home-site/src/components/AccountDashboardPage';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { BankAccountsContainer } from '@wallot/react/src/features/bankAccounts/components/BankAccountsContainer';
import { GoPlus } from 'react-icons/go';
import { ScheduleCallDialog } from '@wallot/home-site/src/components/ScheduleCallDialog';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import { useQueryBankAccountsForLoggedInUser } from '@wallot/react/src/features/bankAccounts/hooks/useQueryBankAccountsForLoggedInUser';

const Page: NextPage<PageStaticProps> = (props) => {
	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// Toaster
	const { toast } = useToast();

	// Bank Accounts
	const { resourcesForLoggedInUser: bankAccountsForLoggedInUser } =
		useQueryBankAccountsForLoggedInUser();
	const approvedBankAccountsForLoggedInUser =
		bankAccountsForLoggedInUser.filter(isBankAccountApprovedByAlpaca);
	const hasAtLeastOneApprovedBankAccounts =
		approvedBankAccountsForLoggedInUser.length > 0;

	// ==== Constants ==== //

	// Router Query
	const _: RouteQueryParams = router?.query ?? {};
	_;

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
			<AccountDashboardPage className={cn('lg:max-w-3xl')}>
				<div>
					<div
						className={cn(
							'lg:flex lg:items-center lg:justify-between lg:space-x-20',
						)}
					>
						<div>
							<div>
								<p className='font-semibold text-2xl'>Bank Accounts</p>
							</div>
						</div>
						<div className='mt-4 lg:mt-0 flex items-center space-x-5'>
							{[{ ctaText: 'ACH Transfer' }].map(({ ctaText }) => {
								if (hasAtLeastOneApprovedBankAccounts) {
									return (
										<div key={ctaText}>
											<ScheduleCallDialog
												TriggerComponent={
													<button
														className={cn(
															'bg-slate-50 px-4 py-1.5 rounded-md border border-slate-300 hover:bg-slate-100',
															'flex items-center space-x-1',
															'text-center',
														)}
													>
														<div>
															<GoPlus />
														</div>
														<div>
															<p className='font-normal text-sm'>{ctaText}</p>
														</div>
													</button>
												}
											/>
										</div>
									);
								}

								return (
									<div key={ctaText}>
										<button
											className={cn(
												'bg-slate-50 px-4 py-1.5 rounded-md border border-slate-300 hover:bg-slate-100',
												'flex items-center space-x-1',
												'text-center',
											)}
											onClick={() => {
												toast({
													title:
														'Unable to start a new ACH transfer at this time',
													description:
														'If you have recently made a bank account connection, please wait a few minutes and try again.',
												});
											}}
										>
											<div>
												<GoPlus />
											</div>
											<div>
												<p className='font-normal text-sm'>{ctaText}</p>
											</div>
										</button>
									</div>
								);
							})}
						</div>
					</div>
					<div className='mt-4 lg:mt-1'>
						<p className='font-light text-base text-gray-600'>
							Connected bank accounts help you fund your Wallot account
						</p>
					</div>
					<div className='mt-4'>
						<BankAccountsContainer disableConnectionCallback={false} />
					</div>
				</div>
			</AccountDashboardPage>
		</PageComponent>
	);
};

export default Page;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_SITE__/ACCOUNT/BANKING' as const;

// Route Query Params Type
type RouteQueryParams = HomeSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

export const getStaticProps: GetStaticProps<PageStaticProps> = () => {
	// Route Static Props
	const ROUTE_STATIC_PROPS: PageStaticProps = {
		routeStaticId: ROUTE_STATIC_ID,
		title: 'Bank Accounts',
	};
	return Promise.resolve({
		props: ROUTE_STATIC_PROPS,
	});
};
