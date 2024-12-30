import * as yup from 'yup';
import * as changeCase from 'change-case';
import {
	getCurrencyUsdStringFromCents,
	getEnum,
	getFieldSpecByFieldKey,
	YupHelpers,
} from 'ergonomic';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	Page as PageComponent,
	PageStaticProps,
	PageProps,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import {
	AlpacaAchTransferDirection,
	AlpacaAchTransferDirectionEnum,
	HomeSiteRouteQueryParams,
	isAchTransferRejectedByAlpaca,
	isAchTransferWithFundsReceivedByAlpaca,
	isBankAccountApprovedByAlpaca,
	RequestNewAchTransferParams,
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
import { defaultGeneralizedFormDataTransformationOptions } from 'ergonomic-react/src/features/data/types/GeneralizedFormDataTransformationOptions';
import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from 'ergonomic-react/src/features/data/hooks/useYupValidationResolver';
import { LiteFormFieldProps } from 'ergonomic-react/src/features/data/types/LiteFormFieldProps';
import { LiteFormFieldContainer } from 'ergonomic-react/src/features/data/components/LiteFormFieldContainer';
import { SubmitButton } from '@wallot/react/src/components/SubmitButton';
import { LiteFormFieldError } from 'ergonomic-react/src/features/data/components/LiteFormFieldError';
import { useRequestNewAchTransferMutation } from '@wallot/react/src/features/achTransfers/hooks/useRequestNewAchTransferMutation';

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
	const {
		achTransfersForLoggedInUser,
		refetch: refetchAchTransfersForLoggedInUser,
	} = useQueryAchTransfersForLoggedInUser();
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

	// Add a new transfer form
	const approvedBankAccountIds = approvedBankAccountsForLoggedInUser.map(
		({ _id }) => _id,
	);
	const approvedBankAccountNameById =
		approvedBankAccountsForLoggedInUser.reduce(
			(acc, { _id, last_4, account_type }) => {
				if (last_4 == null) {
					return acc;
				}

				acc[_id] = `${account_type} account ending in ${last_4}`.trim();
				return acc;
			},
			{} as Record<string, string>,
		);
	const ApprovedBankAccountIdEnum = getEnum(approvedBankAccountIds);
	const newTransferFormProperties = {
		amount: YupHelpers.usd().required(),
		bank_account: ApprovedBankAccountIdEnum.getDefinedSchema()
			.default(approvedBankAccountIds[0])
			.required()
			.meta({ label_by_enum_option: approvedBankAccountNameById })
			.label('Bank Account'),
		direction: AlpacaAchTransferDirectionEnum.getDefinedSchema()
			.default('' as AlpacaAchTransferDirection)
			.required(),
	} as const;
	const newTransferFormSchema = yup.object(newTransferFormProperties);
	const newTransferFormFieldSpecByFieldKey = getFieldSpecByFieldKey(
		newTransferFormSchema,
		['bank_account', 'amount', 'direction'],
	);
	const resolver = useYupValidationResolver(newTransferFormSchema, {
		...defaultGeneralizedFormDataTransformationOptions,
		currencyFieldKeys: ['amount'],
	});
	const { control, formState, handleSubmit, reset, setError, watch } =
		useForm<RequestNewAchTransferParams>({
			defaultValues: newTransferFormSchema.getDefault(),
			resolver,
			shouldUnregister: false,
		});
	const liveData = watch();
	const isNewTransferFormReady =
		String(liveData.amount).length > 0 &&
		String(liveData.amount) !== '$0.00' &&
		liveData.bank_account != null &&
		liveData.bank_account.length > 0;

	// Mutation
	const {
		mutate: requestNewAchTransfer,
		isLoading: isRequestNewAchTransferRunning,
	} = useRequestNewAchTransferMutation({
		onError: ({ error: { message } }) => {
			// Show the error message
			toast({
				title: 'Error',
				description: message,
			});
			setError('root', {
				type: 'manual',
				message: 'An error occurred. Please try again.',
			});

			// Reset form
			reset();
		},
		onSuccess: async () => {
			// Refetch ACH transfers
			await refetchAchTransfersForLoggedInUser();

			// Show success toast
			toast({
				title: 'Success',
				description: 'Your transfer is queued for processing.',
			});

			// Switch back to bank accounts mode
			setMode('bank_accounts');
		},
	});

	// Form
	const formStatus =
		formState.isSubmitting || isRequestNewAchTransferRunning
			? 'running'
			: 'idle';
	const isFormSubmitting = formStatus === 'running';
	const fields: LiteFormFieldProps<RequestNewAchTransferParams>[] = [
		{
			fieldKey: 'bank_account' as const,
		},
		{
			fieldKey: 'amount' as const,
		},
	].map(({ fieldKey }) => ({
		control,
		fieldErrors: formState.errors,
		fieldKey,
		fieldSpec: newTransferFormFieldSpecByFieldKey[fieldKey],
		hideRequiredIndicator: true,
		initialFormData: newTransferFormSchema.getDefault(),
		isSubmitting: isFormSubmitting,
		operation: 'create',
		renderTooltipContent: undefined,
		setError: (message) => setError(fieldKey, { message }),
	}));

	// Form Submit Handler
	const onSubmit = (data: RequestNewAchTransferParams) => {
		console.log('Requesting new transfer with following data:', data);
		toast({
			title: 'Requesting your transfer',
			description: 'This may take a few moments...',
		});
		requestNewAchTransfer(data);
	};
	const isSubmitButtonDisabled = !isNewTransferFormReady || isFormSubmitting;

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
					<div className='mt-4'>
						<form onSubmit={handleSubmit(onSubmit) as () => void}>
							<div>
								{fields.map((fieldProps) => (
									<LiteFormFieldContainer
										key={fieldProps.fieldKey}
										{...fieldProps}
									/>
								))}
							</div>
							<div className='mt-4 text-right w-full'>
								<SubmitButton
									className='w-full'
									isDisabled={isSubmitButtonDisabled}
									isSubmitting={isFormSubmitting}
								/>
							</div>
							{Boolean(formState.errors['root']?.message) && (
								<div className='mt-4'>
									<LiteFormFieldError
										fieldErrorMessage={formState.errors['root']?.message ?? ''}
									/>
								</div>
							)}
						</form>
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
