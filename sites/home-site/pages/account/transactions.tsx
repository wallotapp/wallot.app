import * as changeCase from 'change-case';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	Page as PageComponent,
	PageStaticProps,
	PageProps,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import {
	AlpacaOrderSideEnum,
	AlpacaOrderSide,
	HomeSiteRouteQueryParams,
	RequestNewOrderParams,
	getHomeSiteRoute,
} from '@wallot/js';
import { AccountDashboardPage } from '@wallot/home-site/src/components/AccountDashboardPage';
import { useQueryAssetOrdersForLoggedInUser } from '@wallot/react/src/features/assetOrders/hooks/useQueryAssetOrdersForLoggedInUser';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import {
	GeneralizedFieldTypeEnum,
	getCurrencyUsdStringFromCents,
	getFieldSpecByFieldKey,
	Keys,
	YupHelpers,
} from 'ergonomic';
import { DateTime } from 'luxon';
import { GoPlus } from 'react-icons/go';
import { useQueryLoggedInUserStatus } from '@wallot/react/src/hooks/useQueryLoggedInUserStatus';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import { FiChevronLeft } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { defaultGeneralizedFormDataTransformationOptions } from 'ergonomic-react/src/features/data/types/GeneralizedFormDataTransformationOptions';
import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from 'ergonomic-react/src/features/data/hooks/useYupValidationResolver';
import { LiteFormFieldProps } from 'ergonomic-react/src/features/data/types/LiteFormFieldProps';
import { LiteFormFieldContainer } from 'ergonomic-react/src/features/data/components/LiteFormFieldContainer';
import { SubmitButton } from '@wallot/react/src/components/SubmitButton';
import { LiteFormFieldError } from 'ergonomic-react/src/features/data/components/LiteFormFieldError';
import { useRequestNewOrderMutation } from '@wallot/react/src/features/orders/hooks/useRequestNewOrderMutation';
import { getGeneralizedFormDataFromServerData } from 'ergonomic-react/src/features/data/utils/getGeneralizedFormDataFromServerData';
import * as yup from 'yup';
import Link from 'next/link';

const Page: NextPage<PageStaticProps> = (props) => {
	// ==== State ==== //
	const [mode, setMode] = useState<'transactions' | 'new_transaction'>(
		'transactions',
	);

	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// Toaster
	const { toast } = useToast();

	// Asset orders
	const {
		assetOrdersForLoggedInUser,
		refetch: refetchAssetOrdersForLoggedInUser,
	} = useQueryAssetOrdersForLoggedInUser();

	// Status
	const { isUserWithAlpacaEquity } = useQueryLoggedInUserStatus();

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

	const newTransferFormProperties = {
		symbol: yup.string().required().min(1).label('Stock Symbol').meta({
			label_message_user_text: 'e.g. AAPL or TSLA',
			type: GeneralizedFieldTypeEnum.obj.short_text,
		}),
		amount: YupHelpers.usd().required(),
		side: AlpacaOrderSideEnum.getDefinedSchema()
			.default('' as AlpacaOrderSide)
			.required(),
	} as const;
	const newTransferFormSchema = yup.object(newTransferFormProperties);
	const newTransferFormFieldSpecByFieldKey = getFieldSpecByFieldKey(
		newTransferFormSchema,
		Keys(newTransferFormProperties),
	);
	const resolver = useYupValidationResolver(newTransferFormSchema, {
		...defaultGeneralizedFormDataTransformationOptions,
		currencyFieldKeys: ['amount'],
	});
	const { control, formState, handleSubmit, reset, setError, watch } =
		useForm<RequestNewOrderParams>({
			defaultValues: newTransferFormSchema.getDefault(),
			resolver,
			shouldUnregister: false,
		});
	const liveData = watch();
	const isNewTransferFormReady =
		String(liveData.amount).length > 0 && String(liveData.amount) !== '$0.00';

	// Mutation
	const { mutate: requestNewOrder, isLoading: isRequestNewOrderRunning } =
		useRequestNewOrderMutation({
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
				// Refetch transactions
				await refetchAssetOrdersForLoggedInUser();

				// Show success toast
				toast({
					title: 'Success',
					description: 'Your transaction is queued for processing.',
				});

				// Switch back to bank accounts mode
				setMode('transactions');
			},
		});

	// Form
	const formStatus =
		formState.isSubmitting || isRequestNewOrderRunning ? 'running' : 'idle';
	const isFormSubmitting = formStatus === 'running';
	const fields: LiteFormFieldProps<RequestNewOrderParams>[] = [
		{
			fieldKey: 'symbol' as const,
		},
		{
			fieldKey: 'amount' as const,
		},
		{
			fieldKey: 'side' as const,
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
	const onSubmit = (data: RequestNewOrderParams) => {
		console.log('Requesting new order with following data:', data);
		toast({
			title: 'Requesting your order',
			description: 'This may take a few moments...',
		});
		requestNewOrder(data);
	};
	const isSubmitButtonDisabled = !isNewTransferFormReady || isFormSubmitting;

	// ==== Effects ==== //
	const [hasInitializedDefaultValues, setHasInitializedDefaultValues] =
		useState(false);
	useEffect(() => {
		if (hasInitializedDefaultValues) return;

		const initialValues = getGeneralizedFormDataFromServerData(
			newTransferFormSchema.getDefault(),
			{
				...defaultGeneralizedFormDataTransformationOptions,
				currencyFieldKeys: ['amount'],
			},
		);
		reset(initialValues);
		setHasInitializedDefaultValues(true);
	}, [hasInitializedDefaultValues]);

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<AccountDashboardPage className={cn('lg:max-w-2xl')}>
				<div className={cn(mode === 'transactions' ? 'block' : 'hidden')}>
					<div
						className={cn(
							'lg:flex lg:items-center lg:justify-between lg:space-x-20',
						)}
					>
						<div>
							<div>
								<p className='font-semibold text-2xl'>Transactions</p>
							</div>
						</div>
						<div className='mt-4 lg:mt-0 flex items-center space-x-5'>
							{[{ ctaText: 'New Order' }].map(({ ctaText }) => {
								if (isUserWithAlpacaEquity) {
									return (
										<div key={ctaText}>
											<button
												className={cn(
													'bg-slate-50 px-4 py-1.5 rounded-md border border-slate-300 hover:bg-slate-100',
													'flex items-center space-x-1',
													'text-center',
												)}
												onClick={() => {
													setMode('new_transaction');
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
														'Error - your account must be funded to trade.',
													description:
														'If you have recently made a deposit, please wait a few minutes and try again.',
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
							Below are all of the buy and sell orders you have made to date.
						</p>
					</div>
					<div className='mt-3 border-b border-gray-200 py-1'>
						<div className='grid grid-cols-4 gap-4'>
							{['Order', 'Shares', 'Avg Entry Price', 'Side'].map((header) => {
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
						{assetOrdersForLoggedInUser.map(
							({
								alpaca_order_filled_at,
								alpaca_order_filled_avg_price: avg_entry_price,
								alpaca_order_filled_qty: qty,
								alpaca_order_side: side,
								alpaca_order_symbol: symbol,
							}) => {
								const date =
									alpaca_order_filled_at == null
										? 'Pending'
										: DateTime.fromISO(alpaca_order_filled_at).toLocaleString(
												DateTime.DATE_SHORT,
										  );
								const avgEntryPriceCents =
									avg_entry_price == null
										? 0
										: parseFloat(avg_entry_price) * 100;
								const avgEntryPriceUsdString = avgEntryPriceCents
									? getCurrencyUsdStringFromCents(avgEntryPriceCents)
									: 'Pending';
								const orderName = `${symbol} - ${date}`;
								return (
									<div key={orderName} className={cn('grid grid-cols-4 gap-4')}>
										{[
											orderName,
											qty || 'Pending',
											avgEntryPriceUsdString,
											changeCase.capitalCase(side || 'Pending'),
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
				<div className={cn(mode === 'new_transaction' ? 'block' : 'hidden')}>
					<div className={cn('flex flex-col space-y-5')}>
						<div>
							<button
								onClick={() => setMode('transactions')}
								className={cn(
									'flex items-center space-x-0.5 cursor-pointer text-brand-dark',
									'',
								)}
							>
								<div>
									<FiChevronLeft />
								</div>
								<div>
									<p className='text-sm font-semibold'>Back to Transactions</p>
								</div>
							</button>
						</div>
						<div>
							<p className='font-semibold text-2xl'>New Order</p>
						</div>
					</div>
					<div className='mt-4 lg:mt-1'>
						<p className='font-light text-base text-gray-600'>
							Enter the stock symbol, amount (in USD) and transaction type for
							your order. We'll use your{' '}
							<Link
								href={getHomeSiteRoute({
									includeOrigin: false,
									origin: null,
									queryParams: {},
									routeStaticId: 'HOME_SITE__/ACCOUNT/BANKING',
								})}
							>
								<span className='underline'>default bank account</span>
							</Link>{' '}
							to process the order.
						</p>
					</div>
					<div className='mt-4 lg:max-w-lg'>
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
									text='Place Order'
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
const ROUTE_STATIC_ID = 'HOME_SITE__/ACCOUNT/TRANSACTIONS' as const;

// Route Query Params Type
type RouteQueryParams = HomeSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

export const getStaticProps: GetStaticProps<PageStaticProps> = () => {
	// Route Static Props
	const ROUTE_STATIC_PROPS: PageStaticProps = {
		routeStaticId: ROUTE_STATIC_ID,
		title: 'Transactions',
	};
	return Promise.resolve({
		props: ROUTE_STATIC_PROPS,
	});
};
