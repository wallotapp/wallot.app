import * as changeCase from 'change-case';
import { getCurrencyUsdStringFromCents } from 'ergonomic';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	Page as PageComponent,
	PageStaticProps,
	PageProps,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import {
	HomeSiteRouteQueryParams,
	isAchTransferRejectedByAlpaca,
	isAchTransferWithFundsReceivedByAlpaca,
	isBankAccountApprovedByAlpaca,
} from '@wallot/js';
import { AccountDashboardPage } from '@wallot/home-site/src/components/AccountDashboardPage';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { BankAccountsContainer } from '@wallot/react/src/features/bankAccounts/components/BankAccountsContainer';
import { GoPlus } from 'react-icons/go';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import { useQueryBankAccountsForLoggedInUser } from '@wallot/react/src/features/bankAccounts/hooks/useQueryBankAccountsForLoggedInUser';
import { useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useQueryAchTransfersForLoggedInUser } from '@wallot/react/src/features/achTransfers/hooks/useQueryAchTransfersForLoggedInUser';
import { DateTime } from 'luxon';

const Page: NextPage<PageStaticProps> = (props) => {
	// ==== State ==== //
	const [mode, setMode] = useState<'bank_accounts' | 'ach_transfers'>(
		'bank_accounts',
	);

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

	// ACH Transfers
	const { achTransfersForLoggedInUser } = useQueryAchTransfersForLoggedInUser();
	const queuedAchTransfersForLoggedInUser = achTransfersForLoggedInUser.filter(
		(achTransfer) =>
			!isAchTransferRejectedByAlpaca(achTransfer) &&
			!isAchTransferWithFundsReceivedByAlpaca(achTransfer),
	);
	const hasAtLeastOneQueuedAchTransfers =
		queuedAchTransfersForLoggedInUser.length > 0;

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
				<div className={cn(mode === 'bank_accounts' ? 'block' : 'hidden')}>
					<div className={cn('mt-8')}>
						<div>
							<div>
								<p className='font-semibold text-2xl'>Bank Accounts</p>
							</div>
						</div>
					</div>
					<div className='mt-4 lg:mt-1'>
						<p className='font-light text-base text-gray-600'>
							Connected bank accounts help you fund your Wallot account
						</p>
					</div>
					<div className='mt-4'>
						<BankAccountsContainer
							defaultInstitutionAccordionsOpen={false}
							disableConnectionCallback={false}
						/>
					</div>
					<div
						className={cn(
							'mt-8',
							'lg:flex lg:items-center lg:justify-between lg:space-x-20',
						)}
					>
						<div>
							<div>
								<p className='font-semibold text-2xl'>ACH Transfers</p>
							</div>
						</div>
						<div className='mt-4 lg:mt-0 flex items-center space-x-5'>
							{[{ ctaText: 'New ACH Transfer' }].map(({ ctaText }) => {
								return (
									<button
										className={cn(
											'bg-slate-50 px-4 py-1.5 rounded-md border border-slate-300 hover:bg-slate-100',
											'flex items-center space-x-1',
											'text-center',
										)}
										onClick={() => {
											if (!hasAtLeastOneApprovedBankAccounts) {
												toast({
													title:
														'Unable to start a new ACH transfer at this time',
													description:
														'If you have recently made a bank account connection, please wait a few minutes and try again.',
												});
											} else if (hasAtLeastOneQueuedAchTransfers) {
												toast({
													title:
														'Unable to start a new ACH transfer at this time',
													description:
														'You already have a pending ACH transfer. Please wait for the transfer to complete before starting a new one.',
												});
											} else {
												setMode('ach_transfers');
											}
										}}
									>
										<div>
											<GoPlus />
										</div>
										<div>
											<p className='font-normal text-sm'>{ctaText}</p>
										</div>
									</button>
								);
							})}
						</div>
					</div>
					<div className='mt-4 lg:mt-1'>
						<div className='mt-3 border-b border-gray-200 py-1'>
							<div className='grid grid-cols-3 gap-2'>
								{['Date', 'Details', 'Status'].map((header) => {
									return (
										<div key={header}>
											<p className='font-semibold text-base text-gray-600'>
												{header}
											</p>
										</div>
									);
								})}
							</div>
						</div>
						<div className='mt-2 flex flex-col gap-2'>
							{achTransfersForLoggedInUser.map(
								({
									_id,
									alpaca_ach_transfer_created_at,
									alpaca_ach_transfer_amount,
									alpaca_ach_transfer_direction,
									alpaca_ach_transfer_status,
								}) => {
									const date =
										alpaca_ach_transfer_created_at == null
											? 'Pending'
											: DateTime.fromISO(
													alpaca_ach_transfer_created_at,
											  ).toLocaleString(DateTime.DATE_SHORT);
									const avgEntryPriceCents =
										alpaca_ach_transfer_amount == null
											? 0
											: parseFloat(alpaca_ach_transfer_amount) * 100;
									const avgEntryPriceUsdString =
										getCurrencyUsdStringFromCents(avgEntryPriceCents);
									return (
										<div key={_id} className={cn('grid grid-cols-3 gap-2')}>
											{[
												date,
												`${avgEntryPriceUsdString} ${changeCase.capitalCase(
													alpaca_ach_transfer_direction ?? '',
												)} Transfer`,
												changeCase.capitalCase(
													alpaca_ach_transfer_status ?? '',
												),
											].map((value, valueIdx) => {
												return (
													<div key={valueIdx}>
														<p className='font-light text-sm'>{value}</p>
													</div>
												);
											})}
										</div>
									);
								},
							)}
						</div>
					</div>
				</div>
				<div className={cn(mode === 'ach_transfers' ? 'block' : 'hidden')}>
					<div className={cn('flex flex-col space-y-5')}>
						<div>
							<button
								onClick={() => setMode('bank_accounts')}
								className={cn(
									'flex items-center space-x-0.5 cursor-pointer text-brand-dark',
									'',
								)}
							>
								<div>
									<FiChevronLeft />
								</div>
								<div>
									<p className='text-sm font-semibold'>Back to Accounts</p>
								</div>
							</button>
						</div>
						<div>
							<p className='font-semibold text-2xl'>New ACH Transfer</p>
						</div>
					</div>
					<div className='mt-4 lg:mt-1'>
						<p className='font-light text-base text-gray-600'>
							Select the bank account you would like to transfer funds from and
							the details of your transfer. Transfers are typically completed
							within 1-2 business days.
						</p>
					</div>
					<div className='mt-4'></div>
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
