import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	Page as PageComponent,
	PageStaticProps,
	PageProps,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { Skeleton } from 'ergonomic-react/src/components/ui/skeleton';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import {
	getHomeSiteRoute,
	HomeSiteRouteQueryParams,
	getSsoSiteRoute,
	AssetOrder,
	Recommendation,
	assetOrdersApi,
} from '@wallot/js';
import {
	useQueryAssetOrderPage,
	useUpdateAssetOrderMutation,
} from '@wallot/react/src/features/assetOrders';
import { useQueryRecommendationPage } from '@wallot/react/src/features/recommendations';
import { AuthenticatedPageHeader } from '@wallot/react/src/components/AuthenticatedPageHeader';
import { PageActionHeader } from '@wallot/react/src/components/PageActionHeader';
import { Fragment } from 'react';
import {
	getCurrencyUsdStringFromCents,
	getFieldSpecByFieldKey,
} from 'ergonomic';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { FiShoppingCart } from 'react-icons/fi';
import { useAuthenticatedRouteRedirect } from 'ergonomic-react/src/features/authentication/hooks/useAuthenticatedRouteRedirect';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import * as yup from 'yup';
import { LiteFormFieldError } from 'ergonomic-react/src/features/data/components/LiteFormFieldError';
import { useYupValidationResolver } from 'ergonomic-react/src/features/data/hooks/useYupValidationResolver';
import { defaultGeneralizedFormDataTransformationOptions } from 'ergonomic-react/src/features/data/types/GeneralizedFormDataTransformationOptions';
import { useForm } from 'react-hook-form';
import { getGeneralizedFormDataFromServerData } from 'ergonomic-react/src/features/data/utils/getGeneralizedFormDataFromServerData';
import { UsdField } from 'ergonomic-react/src/features/data/components/fields/UsdField';
import { AsyncLink } from 'ergonomic-react/src/components/custom-ui/async-link';

const AssetOrderCard: React.FC<{
	assetOrder: AssetOrder;
	mode: 'edit' | 'view';
	recommendation: Recommendation;
	refetchAssetOrderPage: () => Promise<unknown>;
}> = ({
	assetOrder: {
		_id: assetOrderId,
		alpaca_order_qty,
		alpaca_order_side,
		alpaca_order_symbol,
		amount,
	},
	mode,
	recommendation: { best_investments = [] },
	refetchAssetOrderPage,
}) => {
	// Toaster
	const { toast } = useToast();

	// Form Resolver
	const amountFormSchema = yup.object({
		amount: assetOrdersApi.properties.amount,
	});
	const amountFieldSpecByFieldKey = getFieldSpecByFieldKey(amountFormSchema, [
		'amount',
	]);
	const resolver = useYupValidationResolver(amountFormSchema, {
		...defaultGeneralizedFormDataTransformationOptions,
		currencyFieldKeys: ['amount'],
	});
	const { control, formState, handleSubmit, reset, setError, watch } = useForm<{
		amount: number;
	}>({
		resolver,
		shouldUnregister: false,
	});
	const liveData = watch();
	const isAmountInputComplete = String(liveData.amount).length > 0;

	// Mutation
	const { mutate: updateAssetOrder, isLoading: isUpdateAssetOrderRunning } =
		useUpdateAssetOrderMutation({
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
				// Refetch the user
				await refetchAssetOrderPage();

				// Show success toast
				toast({
					title: 'Success',
					description: 'Saved your purchase updates...',
				});
			},
		});

	const onSubmit = (data: { amount: number }) => {
		console.log('Updating asset order with following data:', data);
		toast({
			title: 'Saving your purchase information',
			description: 'This may take a few moments...',
		});
		updateAssetOrder({ _id: assetOrderId, ...data });
	};

	const isViewMode = mode === 'view';
	const isUpdateAmountFormSubmitting =
		formState.isSubmitting || isUpdateAssetOrderRunning;
	const isSaveAmountButtonDisabled =
		isUpdateAmountFormSubmitting || !isAmountInputComplete;

	const investmentRecommendationForAsset = best_investments.find(
		({ symbol }) => symbol === alpaca_order_symbol,
	);
	if (!investmentRecommendationForAsset) {
		return null;
	}
	const { rationale } = investmentRecommendationForAsset;
	const amountUsdString = getCurrencyUsdStringFromCents(amount);

	const [hasInitializedDefaultValues, setHasInitializedDefaultValues] =
		useState(false);
	useEffect(() => {
		if (hasInitializedDefaultValues) return;

		const initialValues = getGeneralizedFormDataFromServerData(
			{ amount },
			{
				...defaultGeneralizedFormDataTransformationOptions,
				currencyFieldKeys: ['amount'],
			},
		);
		reset(initialValues);
		setHasInitializedDefaultValues(true);
	}, [hasInitializedDefaultValues, amount]);

	return (
		<div
			className={cn(
				'bg-white border border-gray-200 rounded-md shadow-md p-6 h-full',
			)}
		>
			<div className={cn('flex justify-between')}>
				<div>
					<p className={cn('text-2xl font-semibold')}>{alpaca_order_symbol}</p>
					<p className={cn('text-lg font-light')}>{alpaca_order_qty} shares</p>
				</div>
				<div>
					<div className={cn(isViewMode ? 'block' : 'hidden')}>
						<p className={cn('text-2xl font-medium')}>{amountUsdString}</p>
						<p className={cn('text-lg font-light')}>
							{alpaca_order_side} order
						</p>
					</div>
					<div className={cn(isViewMode ? 'hidden' : 'block')}>
						<form onSubmit={handleSubmit(onSubmit) as () => void}>
							<p className='font-semibold text-xs text-right'>
								Amount (USD)
								<span className='text-amber-900'>*</span>
							</p>
							<UsdField
								control={control}
								fieldKey='amount'
								fieldSpec={amountFieldSpecByFieldKey.amount}
								isSubmitting={isUpdateAmountFormSubmitting}
								operation='update'
								setError={(message) => setError('amount', { message })}
								className='border border-amber-900 h-8 rounded-md text-xs px-2 w-full'
							/>
							{Boolean(formState.errors['amount']?.message) && (
								<div className='mt-4'>
									<LiteFormFieldError
										fieldErrorMessage={
											formState.errors['amount']?.message ?? ''
										}
									/>
								</div>
							)}
							<div className={cn('mt-2 items-center flex justify-end space-x-2')}>
								<button
									className={cn(
										'w-fit text-center py-1.5 px-4 rounded-md border bg-red-800',
									)}
									type='button'
									disabled={isDeleteAssetOrderButtonDisabled}
								>
									<div>
										{isDeleteAssetOrderRunning ? (
											<>
												<div className='flex items-center justify-center min-w-8'>
													<div
														className={cn(
															'w-4 h-4 border-2 border-gray-200 rounded-full animate-spin',
															'border-t-white border-r-white border-b-white',
														)}
													></div>
												</div>
											</>
										) : (
											<p
												className={cn(
													'font-normal text-xs',
													isDeleteAssetOrderButtonDisabled
														? 'text-slate-300'
														: 'text-white',
												)}
											>
												Delete
											</p>
										)}
									</div>
								</button>
								<button
									className={cn(
										'w-fit text-center py-1.5 px-6 rounded-md border',
										isAmountInputComplete ? 'bg-black' : 'bg-slate-500',
									)}
									type='submit'
									disabled={isSaveAmountButtonDisabled}
								>
									<div>
										{isUpdateAmountFormSubmitting ? (
											<>
												<div className='flex items-center justify-center min-w-8'>
													<div
														className={cn(
															'w-4 h-4 border-2 border-gray-200 rounded-full animate-spin',
															'border-t-brand border-r-brand border-b-brand',
														)}
													></div>
												</div>
											</>
										) : (
											<p
												className={cn(
													'font-normal text-xs',
													isSaveAmountButtonDisabled
														? 'text-slate-300'
														: 'text-white',
												)}
											>
												Save
											</p>
										)}
									</div>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div className={cn('mt-5')}>
				<div>
					<p className={cn('text-xs font-semibold')}>Investment thesis</p>
				</div>
				<div className='mt-0.5'>
					<p className={cn('text-sm font-extralight')}>{rationale}</p>
				</div>
			</div>
		</div>
	);
};

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_SITE__/ORDERS/[ORDER_ID]/ASSETS' as const;

// Route Static Props
const ROUTE_STATIC_PROPS: PageStaticProps = {
	routeStaticId: ROUTE_STATIC_ID,
	title: 'Assets',
};

// Route Query Params Type
type RouteQueryParams = HomeSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

const Page: NextPage = () => {
	// ==== State ==== //
	const [assetOrderCardMode, setAssetOrderCardMode] = useState<'edit' | 'view'>(
		'view',
	);
	const isViewMode = assetOrderCardMode === 'view';
	const onToggleEditMode = () =>
		setAssetOrderCardMode((prev) => (prev === 'edit' ? 'view' : 'edit'));

	// ==== Hooks ==== //

	// Site Origin by Target
	const siteOriginByTarget = useSiteOriginByTarget();

	// Auth
	useAuthenticatedRouteRedirect({
		authSiteOrigin: siteOriginByTarget.SSO_SITE,
		loginRoutePath: getSsoSiteRoute({
			includeOrigin: false,
			origin: null,
			queryParams: {},
			routeStaticId: 'SSO_SITE__/LOGIN',
		}),
	});

	// Router
	const router = useRouter();

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
	const {
		data: assetOrderPage,
		isLoading: isAssetOrderPageLoading,
		refetch: refetchAssetOrderPage,
	} = useQueryAssetOrderPage({
		firestoreQueryOptions: {
			whereClauses: [['order', '==', order_id]],
		},
	});
	const assetOrders = assetOrderPage?.documents ?? [];
	const recommendationIds = assetOrders[0]?.recommendations;
	const firstRecommendationId = recommendationIds?.[0];
	const { data: recommendationPage, isLoading: isRecommendationPageLoading } =
		useQueryRecommendationPage({
			firestoreQueryOptions: {
				whereClauses: [['_id', '==', firstRecommendationId]],
			},
		});
	const recommendations = recommendationPage?.documents ?? [];
	const recommendation = recommendations[0];

	const isDataLoading =
		isAssetOrderPageLoading ||
		isRecommendationPageLoading ||
		recommendation == null;

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
						<div className={cn('', 'lg:flex lg:items-end lg:justify-between')}>
							<div>
								<p className='text-5xl'>
									We recommend these
									<br />
									stocks for your portfolio
								</p>
							</div>
							<div className='mt-6 lg:mt-0'>
								<div className='flex items-center space-x-4'>
									<button
										className='w-fit text-center bg-slate-50 px-4 py-1.5 rounded-md border border-slate-300'
										type='button'
										onClick={onToggleEditMode}
									>
										<p className='font-normal text-sm'>
											{isViewMode ? 'Make Changes' : 'Confirm Cart'}
										</p>
									</button>
									<AsyncLink
										href={getHomeSiteRoute({
											includeOrigin: true,
											origin: siteOriginByTarget.HOME_SITE,
											queryParams: { order_id },
											routeStaticId: 'HOME_SITE__/ORDERS/[ORDER_ID]/CART',
										})}
										isReady={isViewMode}
									>
										<div
											className={cn(
												'py-1.5 px-10 rounded-sm flex items-center space-x-2',
												isViewMode ? 'bg-black' : 'bg-gray-300',
											)}
										>
											<div>
												<FiShoppingCart className='text-white dark:text-brand text-xs' />
											</div>
											<div>
												<p className='font-medium text-sm text-white dark:text-brand'>
													Continue to Cart
												</p>
											</div>
										</div>
									</AsyncLink>
								</div>
							</div>
						</div>
						<div
							className={cn(
								'mt-10',
								'grid grid-cols-1 gap-3',
								'md:grid-cols-2',
								'lg:grid-cols-2',
								'xl:grid-cols-4',
							)}
						>
							{isDataLoading ? (
								<Fragment>
									{[1, 2, 3, 4].map((_, index) => (
										<div className=''>
											<Skeleton
												className='h-[30rem] !bg-gray-300'
												key={index}
											/>
										</div>
									))}
								</Fragment>
							) : (
								<Fragment>
									{assetOrders.map((assetOrder) => {
										return (
											<AssetOrderCard
												assetOrder={assetOrder}
												key={assetOrder._id}
												mode={assetOrderCardMode}
												recommendation={recommendation}
												refetchAssetOrderPage={refetchAssetOrderPage}
											/>
										);
									})}
								</Fragment>
							)}
						</div>
					</div>
				</div>
			</div>
		</PageComponent>
	);
};

export default Page;
