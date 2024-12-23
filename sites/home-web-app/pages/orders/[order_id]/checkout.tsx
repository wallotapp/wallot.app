import * as R from 'ramda';
import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	Page as PageComponent,
	PageStaticProps,
	PageProps,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import {
	KycFormDataParams,
	kycFormDataSchema,
	kycFormDataSchemaFieldSpecByFieldKey,
	getHomeWebAppRoute,
	HomeWebAppRouteQueryParams,
} from '@wallot/js';
import { useQueryAssetOrderPage } from '@wallot/react/src/features/assetOrders';
import { AuthenticatedPageHeader } from '@wallot/react/src/components/AuthenticatedPageHeader';
import { PageActionHeader } from '@wallot/react/src/components/PageActionHeader';
import {
	getCurrencyUsdStringFromCents,
	getEnum,
	UsaStateCode,
	UsaStateCodeEnum,
} from 'ergonomic';
import Link from 'next/link';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { Separator } from 'ergonomic-react/src/components/ui/separator';
import { useYupValidationResolver } from 'ergonomic-react/src/features/data/hooks/useYupValidationResolver';
import { defaultGeneralizedFormDataTransformationOptions } from 'ergonomic-react/src/features/data/types/GeneralizedFormDataTransformationOptions';
import { useForm } from 'react-hook-form';
import {
	useQueryCurrentUser,
	useUpdateUserMutation,
} from '@wallot/react/src/features/users';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import { LiteFormFieldProps } from 'ergonomic-react/src/features/data/types/LiteFormFieldProps';
import { LiteFormFieldContainer } from 'ergonomic-react/src/features/data/components/LiteFormFieldContainer';
import { LiteFormFieldError } from 'ergonomic-react/src/features/data/components/LiteFormFieldError';
import { useQueryCurrentAuthCredential } from '@wallot/react/src/features/authCredentials';
import { FiChevronDown } from 'react-icons/fi';
import { GoCheckCircle } from 'react-icons/go';

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

	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// Toaster
	const { toast } = useToast();

	// Site Origin by Target
	const siteOriginByTarget = useSiteOriginByTarget();

	// Form Resolver
	const resolver = useYupValidationResolver(
		kycFormDataSchema,
		defaultGeneralizedFormDataTransformationOptions,
	);

	// Current User
	const { currentUser, isUserPageLoading } = useQueryCurrentUser();

	// Current Auth Credential
	const { currentAuthCredential, isAuthCredentialPageLoading } =
		useQueryCurrentAuthCredential();

	// Form
	const initialFormData = kycFormDataSchema.getDefault() as KycFormDataParams;
	const { control, formState, handleSubmit, reset, setError, watch } =
		useForm<KycFormDataParams>({
			resolver,
			shouldUnregister: false,
		});

	// Mutation
	const { mutate: updateUser, isLoading: isUpdateUserRunning } =
		useUpdateUserMutation({
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
				// Show success toast
				toast({
					title: 'Success',
					description: 'Saved your contact details...',
				});

				// Move to the tax section
				setActiveBillingInformationSection('Tax Details');
			},
		});

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

	// Form
	const formStatus =
		formState.isSubmitting || isUpdateUserRunning ? 'running' : 'idle';
	const isFormSubmitting = formStatus === 'running';
	const contactFields: LiteFormFieldProps<KycFormDataParams>[] = [
		{ fieldKey: 'email_address' as const },
		{ fieldKey: 'phone_number' as const },
		{ fieldKey: 'street_address_line_1' as const },
		{ fieldKey: 'street_address_line_2' as const },
		{ fieldKey: 'city' as const },
		{ fieldKey: 'state' as const },
		{ fieldKey: 'postal_code' as const },
	].map(({ fieldKey }) => ({
		control,
		fieldErrors: formState.errors,
		fieldKey,
		fieldSpec: kycFormDataSchemaFieldSpecByFieldKey[fieldKey],
		hideRequiredIndicator: true,
		initialFormData,
		isSubmitting: isFormSubmitting,
		operation: 'update',
		renderTooltipContent: undefined,
		setError: (message) => setError(fieldKey, { message }),
	}));
	const taxFields: LiteFormFieldProps<KycFormDataParams>[] = [
		{ fieldKey: 'given_name' as const },
		{ fieldKey: 'family_name' as const },
		{ fieldKey: 'date_of_birth' as const },
		{ fieldKey: 'tax_id_type' as const },
		{ fieldKey: 'tax_id' as const },
	].map(({ fieldKey }) => ({
		control,
		fieldErrors: formState.errors,
		fieldKey,
		fieldSpec: kycFormDataSchemaFieldSpecByFieldKey[fieldKey],
		hideRequiredIndicator: true,
		initialFormData,
		isSubmitting: isFormSubmitting,
		operation: 'update',
		renderTooltipContent: undefined,
		setError: (message) => setError(fieldKey, { message }),
	}));
	const disclosureFields: LiteFormFieldProps<KycFormDataParams>[] = [
		{ fieldKey: 'is_control_person' as const },
		{ fieldKey: 'is_affiliated_exchange_or_finra' as const },
		{ fieldKey: 'is_politically_exposed' as const },
		{ fieldKey: 'immediate_family_exposed' as const },
	].map(({ fieldKey }) => ({
		control,
		fieldErrors: formState.errors,
		fieldKey,
		fieldSpec: kycFormDataSchemaFieldSpecByFieldKey[fieldKey],
		hideRequiredIndicator: true,
		initialFormData,
		isSubmitting: isFormSubmitting,
		operation: 'update',
		renderTooltipContent: undefined,
		setError: (message) => setError(fieldKey, { message }),
	}));
	const formTitle =
		activeBillingInformationSection === 'Contact Details'
			? 'Enter your Contact Details'
			: activeBillingInformationSection === 'Tax Details'
			? 'Enter your Tax Details'
			: activeBillingInformationSection === 'Disclosures'
			? 'Enter your Disclosures'
			: '';
	const formSubtitle =
		activeBillingInformationSection === 'Contact Details'
			? 'We will use this information in the event that there are problems processing your order'
			: activeBillingInformationSection === 'Tax Details'
			? 'This information is stored securely and used for tax reporting purposes'
			: activeBillingInformationSection === 'Disclosures'
			? 'Please answer the following questions to the best of your knowledge'
			: '';
	const liveData = watch();
	const isContactDetailsSectionComplete =
		liveData.email_address &&
		liveData.phone_number &&
		liveData.street_address_line_1 &&
		liveData.city &&
		liveData.state &&
		liveData.postal_code;
	const isTaxDetailsSectionComplete =
		liveData.given_name &&
		liveData.family_name &&
		liveData.date_of_birth &&
		liveData.tax_id_type &&
		liveData.tax_id;
	const isBillingInformationSectionComplete =
		isContactDetailsSectionComplete && isTaxDetailsSectionComplete;
	const isContinueButtonDisabled =
		isFormSubmitting ||
		(activeBillingInformationSection === 'Contact Details'
			? !isContactDetailsSectionComplete
			: activeBillingInformationSection === 'Tax Details'
			? !isTaxDetailsSectionComplete
			: false);

	// ==== Functions ==== //

	// Form Submit Handler
	const onSubmit = (data: KycFormDataParams) => {
		if (currentUser == null) {
			toast({
				title: 'Error',
				description: 'Try logging in again',
			});
			return;
		}

		console.log('Activating user with following data:', data);
		toast({
			title: 'Saving your preferences',
			description: 'This may take a few moments.',
		});
		updateUser({
			_id: currentUser._id,
			alpaca_account_contact: {
				...R.pick(
					['email_address', 'phone_number', 'city', 'postal_code'] as const,
					data,
				),
				state: data.state as UsaStateCode,
				street_address: [
					data.street_address_line_1,
					data.street_address_line_2,
				].filter(Boolean as unknown as (x: string) => x is string),
			},
			alpaca_account_disclosures: R.pick(
				[
					'immediate_family_exposed',
					'is_affiliated_exchange_or_finra',
					'is_affiliated_exchange_or_iiroc',
					'is_control_person',
					'is_politically_exposed',
				] as const,
				data,
			),
			alpaca_account_identity: R.pick(
				[
					'country_of_birth',
					'country_of_citizenship',
					'country_of_tax_residence',
					'date_of_birth',
					'family_name',
					'given_name',
					'tax_id',
					'tax_id_type',
				] as const,
				data,
			),
		});
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

	// ==== Effects ==== //
	const [hasInitializedDefaultValues, setHasInitializedDefaultValues] =
		useState(false);
	useEffect(() => {
		if (hasInitializedDefaultValues) return;
		if (isAuthCredentialPageLoading) return;
		if (isUserPageLoading) return;
		const { emails = [] } = currentAuthCredential ?? {};
		const fallbackEmail = emails[0];
		const defaultValues: KycFormDataParams = {
			city: currentUser?.alpaca_account_contact?.city ?? initialFormData.city,
			email_address:
				currentUser?.alpaca_account_contact?.email_address ??
				fallbackEmail ??
				initialFormData.email_address,
			phone_number:
				currentUser?.alpaca_account_contact?.phone_number ??
				initialFormData.phone_number,
			postal_code:
				currentUser?.alpaca_account_contact?.postal_code ??
				initialFormData.postal_code,
			state: UsaStateCodeEnum.isMember(
				currentUser?.alpaca_account_contact?.state,
			)
				? currentUser?.alpaca_account_contact?.state
				: initialFormData.state,
			street_address_line_1:
				currentUser?.alpaca_account_contact?.street_address?.[0] ??
				initialFormData.street_address_line_1,
			street_address_line_2:
				currentUser?.alpaca_account_contact?.street_address?.[1] ??
				initialFormData.street_address_line_2,
			immediate_family_exposed:
				currentUser?.alpaca_account_disclosures?.immediate_family_exposed ??
				initialFormData.immediate_family_exposed,
			is_affiliated_exchange_or_finra:
				currentUser?.alpaca_account_disclosures
					?.is_affiliated_exchange_or_finra ??
				initialFormData.is_affiliated_exchange_or_finra,
			is_affiliated_exchange_or_iiroc:
				currentUser?.alpaca_account_disclosures
					?.is_affiliated_exchange_or_iiroc ??
				initialFormData.is_affiliated_exchange_or_iiroc,
			is_control_person:
				currentUser?.alpaca_account_disclosures?.is_control_person ??
				initialFormData.is_control_person,
			is_politically_exposed:
				currentUser?.alpaca_account_disclosures?.is_politically_exposed ??
				initialFormData.is_politically_exposed,
			country_of_birth:
				currentUser?.alpaca_account_identity?.country_of_birth ??
				initialFormData.country_of_birth,
			country_of_citizenship:
				currentUser?.alpaca_account_identity?.country_of_citizenship ??
				initialFormData.country_of_citizenship,
			country_of_tax_residence:
				currentUser?.alpaca_account_identity?.country_of_tax_residence ??
				initialFormData.country_of_tax_residence,
			date_of_birth:
				currentUser?.alpaca_account_identity?.date_of_birth ??
				initialFormData.date_of_birth,
			family_name:
				currentUser?.alpaca_account_identity?.family_name ??
				initialFormData.family_name,
			given_name:
				currentUser?.alpaca_account_identity?.given_name ??
				initialFormData.given_name,
			tax_id:
				currentUser?.alpaca_account_identity?.tax_id ?? initialFormData.tax_id,
			tax_id_type:
				currentUser?.alpaca_account_identity?.tax_id_type ??
				initialFormData.tax_id_type,
		};
		reset(defaultValues);
		setHasInitializedDefaultValues(true);
	}, [
		currentAuthCredential,
		currentUser,
		isAuthCredentialPageLoading,
		isUserPageLoading,
		hasInitializedDefaultValues,
	]);

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
								<div
									className={cn(
										'mt-8 rounded-xl bg-white px-5 py-6 border border-slate-200 w-full text-left',
										activeBillingInformationSection == null
											? 'cursor-pointer'
											: '',
									)}
									onClick={() => {
										if (activeBillingInformationSection != null) {
											return;
										}
										setActiveBillingInformationSection(
											BillingInformationSectionEnum.obj['Contact Details'],
										);
									}}
								>
									<div className='flex justify-between'>
										<div
											className={cn(
												'flex space-x-2 items-center',
												activeBillingInformationSection != null
													? 'cursor-pointer'
													: '',
											)}
											onClick={() => {
												if (activeBillingInformationSection == null) {
													return;
												}
												setActiveBillingInformationSection(null);
											}}
										>
											<div>
												<p>Billing Information</p>
											</div>
											{activeBillingInformationSection != null && (
												<div>
													<FiChevronDown />
												</div>
											)}
										</div>
										{activeBillingInformationSection == null && (
											<div>
												{isBillingInformationSectionComplete && (
													<div className='mb-3'>
														<GoCheckCircle className='text-brand-dark text-xl' />
													</div>
												)}
												<div>
													<p className='font-semibold text-sm underline'>
														Edit
													</p>
												</div>
											</div>
										)}
									</div>
									<div
										className={cn(
											'mt-4',
											activeBillingInformationSection == null ? 'hidden' : '',
										)}
									>
										<div className='flex items-center space-x-4'>
											{BillingInformationSectionEnum.arr.map(
												(billingInformationSection) => {
													const isActive =
														activeBillingInformationSection ===
														billingInformationSection;
													const isPrevSectionComplete =
														billingInformationSection === 'Contact Details'
															? true
															: billingInformationSection === 'Tax Details'
															? isContactDetailsSectionComplete
															: billingInformationSection === 'Disclosures'
															? isTaxDetailsSectionComplete
															: false;
													const canClick = isActive || isPrevSectionComplete;
													return (
														<div
															key={billingInformationSection}
															className={cn(
																'flex space-x-2 items-center',
																canClick ? 'cursor-pointer' : '',
																isActive
																	? 'border-brand border-b-2'
																	: 'border-slate-200 border-b',
															)}
															onClick={() => {
																if (canClick)
																	setActiveBillingInformationSection(
																		billingInformationSection,
																	);
															}}
														>
															<p>{billingInformationSection}</p>
														</div>
													);
												},
											)}
										</div>
										<div className={cn('mt-4')}>
											<form onSubmit={handleSubmit(onSubmit) as () => void}>
												<div className='relative'>
													<div>
														<p className='font-semibold text-xl'>{formTitle}</p>
														<p className='font-extralight text-sm'>
															{formSubtitle}
														</p>
														<div
															className={cn(
																'px-1',
																activeBillingInformationSection ===
																	'Contact Details'
																	? ''
																	: 'hidden',
															)}
														>
															{contactFields.map((fieldProps) => (
																<LiteFormFieldContainer
																	key={fieldProps.fieldKey}
																	{...fieldProps}
																/>
															))}
														</div>
														<div
															className={cn(
																'px-1',
																activeBillingInformationSection ===
																	'Tax Details'
																	? ''
																	: 'hidden',
															)}
														>
															{taxFields.map((fieldProps) => (
																<LiteFormFieldContainer
																	key={fieldProps.fieldKey}
																	{...fieldProps}
																/>
															))}
														</div>
														<div
															className={cn(
																'px-1',
																activeBillingInformationSection ===
																	'Disclosures'
																	? ''
																	: 'hidden',
															)}
														>
															{disclosureFields.map((fieldProps) => (
																<LiteFormFieldContainer
																	key={fieldProps.fieldKey}
																	{...fieldProps}
																/>
															))}
														</div>
														{Boolean(formState.errors['root']?.message) && (
															<div className='mt-4'>
																<LiteFormFieldError
																	fieldErrorMessage={
																		formState.errors['root']?.message ?? ''
																	}
																/>
															</div>
														)}
													</div>
													<div className={cn('mt-4 py-4')}>
														<div className='flex justify-between space-x-4'>
															<div className='flex-1'>
																<button
																	className='w-full text-center bg-slate-200 py-2 rounded-md border border-slate-300'
																	type='button'
																	onClick={() => {
																		if (
																			activeBillingInformationSection ===
																			'Contact Details'
																		) {
																			setActiveBillingInformationSection(null);
																		} else if (
																			activeBillingInformationSection ===
																			'Tax Details'
																		) {
																			setActiveBillingInformationSection(
																				'Contact Details',
																			);
																		} else {
																			setActiveBillingInformationSection(
																				'Tax Details',
																			);
																		}
																	}}
																	disabled={isFormSubmitting}
																>
																	<p className='font-normal text-sm'>Back</p>
																</button>
															</div>
															<div className='flex-1'>
																<button
																	className={cn(
																		'w-full text-center py-2 rounded-md border',
																		!isContinueButtonDisabled
																			? 'bg-black'
																			: 'bg-slate-700',
																	)}
																	type={
																		activeBillingInformationSection ===
																		'Disclosures'
																			? 'submit'
																			: 'button'
																	}
																	onClick={() => {
																		if (
																			activeBillingInformationSection ===
																			'Contact Details'
																		) {
																			setActiveBillingInformationSection(
																				'Tax Details',
																			);
																		} else if (
																			activeBillingInformationSection ===
																			'Tax Details'
																		) {
																			setActiveBillingInformationSection(
																				'Disclosures',
																			);
																		}
																		return;
																	}}
																	disabled={isContinueButtonDisabled}
																>
																	<div>
																		{isFormSubmitting ? (
																			<>
																				<div className='flex items-center justify-center space-x-2 min-w-16 py-0.5'>
																					<div
																						className={cn(
																							'w-4 h-4 border-2 border-gray-200 rounded-full animate-spin',
																							'border-t-brand border-r-brand border-b-brand',
																						)}
																					></div>
																				</div>
																			</>
																		) : (
																			<p className='font-normal text-sm text-white'>
																				Continue
																			</p>
																		)}
																	</div>
																</button>
															</div>
														</div>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
								<div className='mt-8 rounded-xl bg-white px-5 py-6 border border-slate-200'>
									<div>
										<p>Payment</p>
									</div>
								</div>
							</div>
							<div
								className={cn(
									'bg-slate-100 mt-8 px-10 py-10 rounded-xl h-fit',
									'lg:w-2/5 lg:sticky lg:top-28 lg:mt-0',
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
