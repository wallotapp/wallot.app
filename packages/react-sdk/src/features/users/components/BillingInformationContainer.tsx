import * as R from 'ramda';
import { useEffect, useState } from 'react';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import {
	KycFormDataParams,
	kycFormDataSchema,
	kycFormDataSchemaFieldSpecByFieldKey,
	getSsoSiteRoute,
} from '@wallot/js';
import { getEnum, UsaStateCodeEnum } from 'ergonomic';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { useYupValidationResolver } from 'ergonomic-react/src/features/data/hooks/useYupValidationResolver';
import { defaultGeneralizedFormDataTransformationOptions } from 'ergonomic-react/src/features/data/types/GeneralizedFormDataTransformationOptions';
import { useForm } from 'react-hook-form';
import { useUpdateUserMutation } from '@wallot/react/src/features/users';
import { useQueryLoggedInUser } from '@wallot/react/src/features/users/hooks/useQueryLoggedInUser';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import { LiteFormFieldProps } from 'ergonomic-react/src/features/data/types/LiteFormFieldProps';
import { LiteFormFieldContainer } from 'ergonomic-react/src/features/data/components/LiteFormFieldContainer';
import { LiteFormFieldError } from 'ergonomic-react/src/features/data/components/LiteFormFieldError';
import { FiChevronDown } from 'react-icons/fi';
import { GoCheckCircleFill } from 'react-icons/go';
import { useAuthenticatedRouteRedirect } from 'ergonomic-react/src/features/authentication/hooks/useAuthenticatedRouteRedirect';
import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { getGeneralizedFormDataFromServerData } from 'ergonomic-react/src/features/data/utils/getGeneralizedFormDataFromServerData';

const BillingInformationSectionEnum = getEnum([
	'Contact Details',
	'Tax Details',
	'Disclosures',
]);
type BillingInformationSection = keyof typeof BillingInformationSectionEnum.obj;

export type BillingInformationContainerProps = BaseComponent & {
	defaultOpen?: boolean;
	disableEdits?: boolean;
};
export function BillingInformationContainer({
	className = '',
	defaultOpen = false,
	disableEdits = false,
}: BillingInformationContainerProps) {
	// ==== State ==== //
	const [activeBillingInformationSection, setActiveBillingInformationSection] =
		useState<BillingInformationSection | null>(null);

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
		shouldPauseFirebaseAuthRedirects: false,
	});

	// Toaster
	const { toast } = useToast();

	// Form Resolver
	const resolver = useYupValidationResolver(kycFormDataSchema, {
		...defaultGeneralizedFormDataTransformationOptions,
		phoneNumberFieldKeys: ['phone_number'],
	});

	// Current User
	const {
		loggedInUser,
		isLoggedInUserLoading,
		refetch: refetchUser,
	} = useQueryLoggedInUser();
	// const defaultBankAccountId = loggedInUser?.default_bank_account ?? 'null';

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
				// Refetch the user
				await refetchUser();

				// Close the billing information section
				setActiveBillingInformationSection(null);

				// Show success toast
				toast({
					title: 'Success',
					description: 'Saved your billing information...',
				});
			},
		});

	// ==== Constants ==== //

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
		disableEdits ||
		isFormSubmitting ||
		(activeBillingInformationSection === 'Contact Details'
			? !isContactDetailsSectionComplete
			: activeBillingInformationSection === 'Tax Details'
			? !isTaxDetailsSectionComplete
			: false);

	// ==== Functions ==== //

	// Form Submit Handler
	const onSubmit = (data: KycFormDataParams) => {
		if (loggedInUser == null) {
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
			_id: loggedInUser._id,
			alpaca_account_contact: {
				...R.pick(
					['email_address', 'phone_number', 'city', 'postal_code'] as const,
					data,
				),
				state: data.state,
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

	// ==== Effects ==== //
	const [hasInitializedDefaultValues, setHasInitializedDefaultValues] =
		useState(false);
	useEffect(() => {
		if (hasInitializedDefaultValues) return;
		if (isLoggedInUserLoading) return;
		const { firebase_auth_email: fallbackEmail } = loggedInUser ?? {};
		const defaultValues: KycFormDataParams = {
			city: loggedInUser?.alpaca_account_contact?.city ?? initialFormData.city,
			email_address:
				loggedInUser?.alpaca_account_contact?.email_address ??
				fallbackEmail ??
				initialFormData.email_address,
			phone_number:
				loggedInUser?.alpaca_account_contact?.phone_number ??
				initialFormData.phone_number,
			postal_code:
				loggedInUser?.alpaca_account_contact?.postal_code ??
				initialFormData.postal_code,
			state: UsaStateCodeEnum.isMember(
				loggedInUser?.alpaca_account_contact?.state,
			)
				? loggedInUser?.alpaca_account_contact?.state
				: initialFormData.state,
			street_address_line_1:
				(
					loggedInUser?.alpaca_account_contact?.street_address as string[]
				)?.[0] ?? initialFormData.street_address_line_1,
			street_address_line_2:
				(
					loggedInUser?.alpaca_account_contact?.street_address as string[]
				)?.[1] ?? initialFormData.street_address_line_2,
			immediate_family_exposed:
				loggedInUser?.alpaca_account_disclosures?.immediate_family_exposed ??
				initialFormData.immediate_family_exposed,
			is_affiliated_exchange_or_finra:
				loggedInUser?.alpaca_account_disclosures
					?.is_affiliated_exchange_or_finra ??
				initialFormData.is_affiliated_exchange_or_finra,
			is_affiliated_exchange_or_iiroc:
				loggedInUser?.alpaca_account_disclosures
					?.is_affiliated_exchange_or_iiroc ??
				initialFormData.is_affiliated_exchange_or_iiroc,
			is_control_person:
				loggedInUser?.alpaca_account_disclosures?.is_control_person ??
				initialFormData.is_control_person,
			is_politically_exposed:
				loggedInUser?.alpaca_account_disclosures?.is_politically_exposed ??
				initialFormData.is_politically_exposed,
			country_of_birth:
				loggedInUser?.alpaca_account_identity?.country_of_birth ??
				initialFormData.country_of_birth,
			country_of_citizenship:
				loggedInUser?.alpaca_account_identity?.country_of_citizenship ??
				initialFormData.country_of_citizenship,
			country_of_tax_residence:
				loggedInUser?.alpaca_account_identity?.country_of_tax_residence ??
				initialFormData.country_of_tax_residence,
			date_of_birth:
				loggedInUser?.alpaca_account_identity?.date_of_birth ??
				initialFormData.date_of_birth,
			family_name:
				loggedInUser?.alpaca_account_identity?.family_name ??
				initialFormData.family_name,
			given_name:
				loggedInUser?.alpaca_account_identity?.given_name ??
				initialFormData.given_name,
			tax_id:
				loggedInUser?.alpaca_account_identity?.tax_id ?? initialFormData.tax_id,
			tax_id_type:
				loggedInUser?.alpaca_account_identity?.tax_id_type ??
				initialFormData.tax_id_type,
		};
		const isContactDetailsSectionCompleteInDefaultValues =
			defaultValues.email_address &&
			defaultValues.phone_number &&
			defaultValues.street_address_line_1 &&
			defaultValues.city &&
			defaultValues.state &&
			defaultValues.postal_code;
		const isTaxDetailsSectionCompleteInDefaultValues =
			defaultValues.given_name &&
			defaultValues.family_name &&
			defaultValues.date_of_birth &&
			defaultValues.tax_id_type &&
			defaultValues.tax_id;
		if (defaultOpen) {
			setActiveBillingInformationSection('Contact Details');
		} else {
			if (!isContactDetailsSectionCompleteInDefaultValues) {
				setActiveBillingInformationSection('Contact Details');
			} else if (!isTaxDetailsSectionCompleteInDefaultValues) {
				setActiveBillingInformationSection('Tax Details');
			}
		}
		const defaultFormValues = getGeneralizedFormDataFromServerData(
			defaultValues,
			{
				...defaultGeneralizedFormDataTransformationOptions,
				phoneNumberFieldKeys: ['phone_number'],
			},
		);
		reset(defaultFormValues);
		setHasInitializedDefaultValues(true);
	}, [
		defaultOpen,
		loggedInUser,
		isLoggedInUserLoading,
		hasInitializedDefaultValues,
	]);

	// ==== Render ==== //
	return (
		<div
			className={cn(
				'rounded-xl bg-white border px-5 py-6 w-full text-left',
				activeBillingInformationSection == null ? 'cursor-pointer' : '',
				isBillingInformationSectionComplete
					? 'border-slate-400'
					: 'border-slate-200',
				className,
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
						activeBillingInformationSection != null ? 'cursor-pointer' : '',
					)}
					onClick={() => {
						if (activeBillingInformationSection == null) {
							return;
						}
						setActiveBillingInformationSection(null);
					}}
				>
					<div>
						<div className='flex items-center space-x-2'>
							{isBillingInformationSectionComplete && (
								<div>
									<GoCheckCircleFill className='text-2xl text-slate-700 font-semibold' />
								</div>
							)}
							<div>
								<p className='font-semibold text-xl'>Billing Information</p>
							</div>
						</div>
						{activeBillingInformationSection == null && (
							<div className='mt-2 font-semibold text-sm'>
								<p>
									{liveData.given_name} {liveData.family_name}
								</p>
								{isContactDetailsSectionComplete && (
									<p>
										{liveData.street_address_line_1}, {liveData.city},{' '}
										{liveData.state} {liveData.postal_code}
									</p>
								)}
							</div>
						)}
					</div>
					{activeBillingInformationSection != null && (
						<div>
							<FiChevronDown />
						</div>
					)}
				</div>
				{activeBillingInformationSection == null && (
					<div>
						<div>
							<p className='font-semibold text-sm underline'>Edit</p>
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
								activeBillingInformationSection === billingInformationSection;
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
								<p className='font-extralight text-sm'>{formSubtitle}</p>
								<div
									className={cn(
										'px-1',
										activeBillingInformationSection === 'Contact Details'
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
										activeBillingInformationSection === 'Tax Details'
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
										activeBillingInformationSection === 'Disclosures'
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
											className='w-full text-center bg-slate-50 py-2 rounded-md border border-slate-300'
											type='button'
											onClick={() => {
												if (
													activeBillingInformationSection === 'Contact Details'
												) {
													setActiveBillingInformationSection(null);
												} else if (
													activeBillingInformationSection === 'Tax Details'
												) {
													setActiveBillingInformationSection('Contact Details');
												} else {
													setActiveBillingInformationSection('Tax Details');
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
												isContinueButtonDisabled ? 'bg-slate-500' : 'bg-black',
												activeBillingInformationSection === 'Disclosures'
													? 'hidden'
													: '',
											)}
											type={'button'}
											onClick={() => {
												if (
													activeBillingInformationSection === 'Contact Details'
												) {
													setActiveBillingInformationSection('Tax Details');
												} else if (
													activeBillingInformationSection === 'Tax Details'
												) {
													setActiveBillingInformationSection('Disclosures');
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
													<p
														className={cn(
															'font-normal text-sm',
															isContinueButtonDisabled
																? 'text-slate-300'
																: 'text-white',
														)}
													>
														Continue
													</p>
												)}
											</div>
										</button>
										<button
											className={cn(
												'w-full text-center py-2 rounded-md border',
												isContinueButtonDisabled ? 'bg-slate-500' : 'bg-black',
												activeBillingInformationSection === 'Disclosures'
													? ''
													: 'hidden',
											)}
											type={'submit'}
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
													<p
														className={cn(
															'font-normal text-sm',
															isContinueButtonDisabled
																? 'text-slate-300'
																: 'text-white',
														)}
													>
														Save Responses
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
	);
}
