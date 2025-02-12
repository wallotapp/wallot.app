import { useEffect, useState } from 'react';
import * as R from 'ramda';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	PageStaticProps,
	PageProps,
	Page as PageComponent,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import {
	HomeSiteRouteQueryParams,
	isSubmittedScholarshipApplication,
	isReviewedScholarshipApplication,
	ScholarshipApplicationFormDataSection,
	ScholarshipApplicationFormDataParams,
	scholarshipApplicationFormDataPropertiesBySection,
	scholarshipApplicationFormDataSchema,
	scholarshipApplicationFormDataSchemaFieldSpecByFieldKey,
	ScholarshipApplicationFormDataField,
	ScholarshipApplicationFormDataFieldEnum,
	ScholarshipApplicationFormDataFieldFromUserDataEnum,
	scholarshipApplicationsApi,
} from '@wallot/js';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { getSsoSiteRoute } from '@wallot/js';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { useAuthenticatedRouteRedirect } from 'ergonomic-react/src/features/authentication/hooks/useAuthenticatedRouteRedirect';
import { AuthenticatedPageHeader } from '@wallot/react/src/components/AuthenticatedPageHeader';
import { PageActionHeader } from '@wallot/react/src/components/PageActionHeader';
import { Skeleton } from 'ergonomic-react/src/components/ui/skeleton';
import { useQueryScholarshipApplicationsForLoggedInUser } from '@wallot/react/src/features/scholarshipApplications/hooks/useQueryScholarshipApplicationsForLoggedInUser';
import { GeneralizedError, Keys } from 'ergonomic';
import { useForm } from 'react-hook-form';
import { defaultGeneralizedFormDataTransformationOptions } from 'ergonomic-react/src/features/data/types/GeneralizedFormDataTransformationOptions';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import { LiteFormFieldProps } from 'ergonomic-react/src/features/data/types/LiteFormFieldProps';
import { LiteFormFieldContainer } from 'ergonomic-react/src/features/data/components/LiteFormFieldContainer';
import { LiteFormFieldError } from 'ergonomic-react/src/features/data/components/LiteFormFieldError';
import { useYupValidationResolver } from 'ergonomic-react/src/features/data/hooks/useYupValidationResolver';
import { useQueryLoggedInUser } from '@wallot/react/src/features/users/hooks/useQueryLoggedInUser';
import { getGeneralizedFormDataFromServerData } from 'ergonomic-react/src/features/data/utils/getGeneralizedFormDataFromServerData';
import { createScholarshipApplication } from '@wallot/react/src/features/scholarshipApplications/api/createScholarshipApplication';
import { useSaveScholarshipApplicationMutation } from '@wallot/react/src/features/scholarshipApplications/hooks/useSaveScholarshipApplicationMutation';
import { useSubmitScholarshipApplicationMutation } from '@wallot/react/src/features/scholarshipApplications/hooks/useSubmitScholarshipApplicationMutation';
import { getGeneralizedServerDataFromFormData } from 'ergonomic-react/src/features/data/utils/getGeneralizedServerDataFromFormData';

const Page: NextPage<PageProps> = (props) => {
	// ==== State ==== //
	const [currentStep, setCurrentStep] =
		useState<ScholarshipApplicationFormDataSection>('Contact Details');
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
	const toggleMobileMenu = () => setMobileMenuOpen(R.not);

	// ==== Hooks ==== //

	// Site origins
	const siteOriginByTarget = useSiteOriginByTarget();
	const authSiteOrigin = siteOriginByTarget['SSO_SITE'];

	// Application URL
	const guestApplicationUrl = getSsoSiteRoute({
		includeOrigin: false,
		origin: null,
		queryParams: {},
		routeStaticId: 'SSO_SITE__/LOGIN',
	});

	// Auth
	const { authStateIsLoading } = useAuthenticatedRouteRedirect({
		authSiteOrigin,
		loginRoutePath: guestApplicationUrl,
		shouldPauseFirebaseAuthRedirects: false,
	});

	// Toaster
	const { toast } = useToast();
	toast;

	// Form Resolver
	const formDataTransformationOptions = {
		...defaultGeneralizedFormDataTransformationOptions,
		phoneNumberFieldKeys: ['phone_number'],
	};
	const resolver = useYupValidationResolver(
		scholarshipApplicationFormDataSchema,
		formDataTransformationOptions,
	);

	// Router
	const router = useRouter();

	// User
	const {
		loggedInUser,
		isLoggedInUserLoading,
		refetch: refetchLoggedInUser,
	} = useQueryLoggedInUser();
	refetchLoggedInUser;

	// Application status
	const {
		resourcesForLoggedInUser: scholarshipApplicationsForLoggedInUser,
		refetch: refetchScholarshipApplicationsForLoggedInUser,
		isResourcePageLoading: isScholarshipApplicationPageLoading,
	} = useQueryScholarshipApplicationsForLoggedInUser();
	const scholarshipApplicationForLoggedInUser =
		scholarshipApplicationsForLoggedInUser[0] ?? null;
	const isScholarshipApplicationForLoggedInUserSubmitted =
		scholarshipApplicationForLoggedInUser != null &&
		isSubmittedScholarshipApplication(scholarshipApplicationForLoggedInUser);
	const disabled = isScholarshipApplicationForLoggedInUserSubmitted;
	disabled;
	const isScholarshipApplicationForLoggedInUserReviewed =
		scholarshipApplicationForLoggedInUser != null &&
		isReviewedScholarshipApplication(scholarshipApplicationForLoggedInUser);
	const { decision = null } = scholarshipApplicationForLoggedInUser ?? {};
	const decisionText =
		decision == null
			? ''
			: {
					accepted: 'Congratulations! You have been accepted.',
					rejected: 'We regret to inform you that you have been rejected.',
					waitlisted:
						'You have been waitlisted. We will notify you if a spot opens up.',
			  }[decision];

	// Form
	const defaultFormData =
		scholarshipApplicationFormDataSchema.getDefault() as ScholarshipApplicationFormDataParams;
	const { control, formState, handleSubmit, reset, setError, watch } =
		useForm<ScholarshipApplicationFormDataParams>({
			resolver,
			shouldUnregister: false,
		});
	handleSubmit;
	const liveData = watch();
	liveData;

	// Mutation error
	const onMutationError = ({ error: { message } }: GeneralizedError) => {
		// Show the error message
		toast({
			title: 'Error',
			description: message,
		});
		setError('root', {
			type: 'manual',
			message: 'An error occurred. Please try again.',
		});
	};

	// Mutation success
	const onMutationSuccess = (operation: 'save' | 'submit') => {
		return async () => {
			// Refetch the queries
			await Promise.all(
				[
					refetchLoggedInUser,
					refetchScholarshipApplicationsForLoggedInUser,
				].map((refetch) => refetch()),
			);

			// Show success toast
			toast({
				title: 'Success',
				description:
					operation === 'save'
						? 'Your application has been saved.'
						: 'Your application has been submitted.',
			});
		};
	};

	// Save mutation
	const {
		mutate: saveScholarshipApplication,
		isLoading: isSaveScholarshipApplicationRunning,
	} = useSaveScholarshipApplicationMutation(
		scholarshipApplicationForLoggedInUser?._id ?? null,
		{
			onError: onMutationError,
			onSuccess: onMutationSuccess('save'),
		},
	);

	// Submit mutation
	const {
		mutate: submitScholarshipApplication,
		isLoading: isSubmitScholarshipApplicationRunning,
	} = useSubmitScholarshipApplicationMutation(
		scholarshipApplicationForLoggedInUser?._id ?? null,
		{
			onError: onMutationError,
			onSuccess: onMutationSuccess('submit'),
		},
	);

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
			title: 'Contact Details',
			fields: [
				{ name: 'name', type: 'text' },
				{ name: 'age', type: 'number' },
			],
		},
		{
			title: 'College Information',
			fields: [
				{ name: 'weight', type: 'number' },
				{ name: 'height', type: 'text' },
			],
		},
		{
			title: 'Student Profile',
			fields: [{ name: 'notes', type: 'textarea' }],
		},
		{
			title: 'Personal Essays',
			fields: [{ name: 'notes', type: 'textarea' }],
		},
	];
	const currentStepData = steps.find((step) => step.title === currentStep);
	const isLastStep = currentStep === 'Personal Essays';

	// Form
	const formStatus =
		formState.isSubmitting ||
		isSaveScholarshipApplicationRunning ||
		isSubmitScholarshipApplicationRunning
			? 'running'
			: 'idle';
	const isFormSubmitting = formStatus === 'running';
	const getLiteFormFieldProps = (
		fieldKey: ScholarshipApplicationFormDataField,
	): LiteFormFieldProps<ScholarshipApplicationFormDataParams> => ({
		control,
		fieldErrors: formState.errors,
		fieldKey,
		fieldSpec:
			scholarshipApplicationFormDataSchemaFieldSpecByFieldKey[fieldKey],
		hideRequiredIndicator: true,
		initialFormData: defaultFormData,
		isSubmitting: isFormSubmitting,
		operation: 'update',
		renderTooltipContent: undefined,
		setError: (message) => setError(fieldKey, { message }),
	});
	const contactDetailsFields = Keys(
		scholarshipApplicationFormDataPropertiesBySection['Contact Details'],
	).map(getLiteFormFieldProps);
	const collegeInformationFields = Keys(
		scholarshipApplicationFormDataPropertiesBySection['College Information'],
	).map(getLiteFormFieldProps);
	const studentProfileFields = Keys(
		scholarshipApplicationFormDataPropertiesBySection['Student Profile'],
	).map(getLiteFormFieldProps);
	const personalEssaysFields = Keys(
		scholarshipApplicationFormDataPropertiesBySection['Personal Essays'],
	).map(getLiteFormFieldProps);
	contactDetailsFields;
	collegeInformationFields;
	studentProfileFields;
	personalEssaysFields;

	// Form Submit Handler
	const onSubmit = (data: ScholarshipApplicationFormDataParams) => {
		if (loggedInUser == null) {
			toast({
				title: 'Error',
				description: 'Try logging in again',
			});
			return;
		}

		console.log('Submitting Application with following data:', data);
		toast({
			title: 'Submitting Application',
			description: 'This may take a few moments...',
		});

		submitScholarshipApplication(data);
	};

	// ==== Effects ==== //
	const [isInitialized, setIsInitialized] = useState(false);
	useEffect(() => {
		if (isInitialized) return;
		if (authStateIsLoading) return;
		if (isLoggedInUserLoading || loggedInUser == null) return;
		if (isScholarshipApplicationPageLoading) return;
		return void (async function () {
			try {
				const initialServerData: ScholarshipApplicationFormDataParams =
					defaultFormData;

				// Properties from user data
				const { alpaca_account_contact, alpaca_account_identity } =
					loggedInUser;
				const { phone_number = '' } = alpaca_account_contact ?? {};
				const { date_of_birth, family_name, given_name } =
					alpaca_account_identity ?? {};
				initialServerData.phone_number = phone_number ?? '';
				initialServerData.date_of_birth = date_of_birth ?? '';
				initialServerData.given_name = given_name ?? '';
				initialServerData.family_name = family_name ?? '';

				// Properties from scholarship application data
				const noScholarshipApplicationFound =
					scholarshipApplicationForLoggedInUser == null;
				const newScholarshipApplicationForLoggedInUser =
					scholarshipApplicationsApi.mergeCreateParams({
						createParams: {
							category: 'default',
							name: '',
							user: loggedInUser._id,
						},
					});
				const scholarshipApplicationServerData = noScholarshipApplicationFound
					? newScholarshipApplicationForLoggedInUser
					: scholarshipApplicationForLoggedInUser;
				ScholarshipApplicationFormDataFieldEnum.arr
					.filter(
						(field) =>
							!ScholarshipApplicationFormDataFieldFromUserDataEnum.isMember(
								field,
							),
					)
					.forEach((field) => {
						const value = scholarshipApplicationServerData[field];
						(initialServerData[
							field
						] as ScholarshipApplicationFormDataParams[typeof field]) =
							value ?? '';
					});

				// Set form values
				const defaultFormValues = getGeneralizedFormDataFromServerData(
					initialServerData,
					formDataTransformationOptions,
				);
				reset(defaultFormValues);

				// Save initial scholarship application to db
				if (noScholarshipApplicationFound) {
					await createScholarshipApplication([
						newScholarshipApplicationForLoggedInUser,
					]);
					refetchScholarshipApplicationsForLoggedInUser();
				}
			} catch (error) {
				console.error('Error initializing scholarship application:', error);
			} finally {
				setIsInitialized(true);
			}
		})();
	}, [
		isInitialized,
		authStateIsLoading,
		isLoggedInUserLoading,
		isScholarshipApplicationPageLoading,
		loggedInUser,
		scholarshipApplicationForLoggedInUser,
	]);

	if (!currentStepData) {
		return null;
	}

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<div className={cn('flex flex-col min-h-screen min-w-screen relative')}>
				<AuthenticatedPageHeader showHomeLink={false} />
				<PageActionHeader />
				<div
					className={cn(
						'min-h-[95vh] w-full',
						'py-36 px-6',
						'lg:py-36 lg:px-28',
					)}
				>
					<div>
						<div>
							<p className='font-medium text-xl'>Application</p>
						</div>
						{isScholarshipApplicationForLoggedInUserSubmitted && (
							<div>
								{isScholarshipApplicationForLoggedInUserReviewed ? (
									<p>{decisionText}</p>
								) : (
									<p>
										Your application has been received and is under review. You
										will be notified once our committee has reached a decision
										regarding your application.
									</p>
								)}
							</div>
						)}
					</div>
					<div className={cn('mt-7')}>
						<div
							className={cn(
								isScholarshipApplicationPageLoading ? '' : 'hidden',
							)}
						>
							<ApplicationPageSuspense />
						</div>
						<div
							className={cn(
								!isScholarshipApplicationPageLoading ? '' : 'hidden',
							)}
						>
							<div className=''>
								<div className='flex flex-col md:flex-row'>
									{/* Left sidebar (visible on Tablet and Desktop) */}
									<aside className='hidden md:block md:w-1/4 lg:w-1/5 bg-white p-4 shadow'>
										<ul>
											{steps.map((step) => (
												<li
													key={step.title}
													className={cn('cursor-pointer p-2', {
														'font-bold text-blue-500':
															step.title === currentStep,
														'text-gray-700': step.title !== currentStep,
													})}
													onClick={() =>
														setCurrentStep(
															step.title as ScholarshipApplicationFormDataSection,
														)
													}
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
												<span className='font-bold'>
													{currentStepData.title}
												</span>
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
													{steps.map((step) => (
														<li
															key={step.title}
															className={cn(
																'cursor-pointer p-2 border-b last:border-b-0',
																{
																	'font-bold text-blue-500':
																		step.title === currentStep,
																	'text-gray-700': step.title !== currentStep,
																},
															)}
															onClick={() => {
																setCurrentStep(
																	step.title as ScholarshipApplicationFormDataSection,
																);
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
												<h1 className='text-xl font-bold'>
													{currentStepData.title}
												</h1>
												<button
													className='text-sm text-blue-500'
													onClick={() => {
														const serverData =
															getGeneralizedServerDataFromFormData(
																liveData,
																formDataTransformationOptions,
															);
														saveScholarshipApplication(serverData);
													}}
												>
													Save Progress
												</button>
											</div>

											{/* Form fields */}
											<form onSubmit={handleSubmit(onSubmit) as () => void}>
												<div className=''>
													<div
														className={cn(
															'px-1',
															currentStep === 'Contact Details' ? '' : 'hidden',
														)}
													>
														{contactDetailsFields.map((fieldProps) => (
															<LiteFormFieldContainer
																key={fieldProps.fieldKey}
																{...fieldProps}
															/>
														))}
													</div>
													<div
														className={cn(
															'px-1',
															currentStep === 'College Information'
																? ''
																: 'hidden',
														)}
													>
														{collegeInformationFields.map((fieldProps) => (
															<LiteFormFieldContainer
																key={fieldProps.fieldKey}
																{...fieldProps}
															/>
														))}
													</div>
													<div
														className={cn(
															'px-1',
															currentStep === 'Student Profile' ? '' : 'hidden',
														)}
													>
														{studentProfileFields.map((fieldProps) => (
															<LiteFormFieldContainer
																key={fieldProps.fieldKey}
																{...fieldProps}
															/>
														))}
													</div>
													<div
														className={cn(
															'px-1',
															currentStep === 'Personal Essays' ? '' : 'hidden',
														)}
													>
														{personalEssaysFields.map((fieldProps) => (
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

												{/* Navigation buttons */}
												<div className='mt-6 flex justify-between'>
													<button
														type='button'
														disabled={currentStep === 'Contact Details'}
														className={cn('px-4 py-2 rounded', {
															'bg-gray-200 text-gray-500 cursor-not-allowed':
																currentStep === 'Contact Details',
															'bg-blue-500 text-white':
																currentStep !== 'Contact Details',
														})}
														onClick={() =>
															currentStep !== 'Contact Details' &&
															setCurrentStep(
																steps[
																	steps.findIndex(
																		(step) => step.title === currentStep,
																	) - 1
																]
																	?.title as ScholarshipApplicationFormDataSection,
															)
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
														onClick={() =>
															setCurrentStep(
																steps[
																	steps.findIndex(
																		(step) => step.title === currentStep,
																	) + 1
																]
																	?.title as ScholarshipApplicationFormDataSection,
															)
														}
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
						</div>
					</div>
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

function ApplicationPageSuspense({ length = 5 }) {
	return (
		<div className='flex flex-col space-y-7'>
			{Array.from({ length }).map((_, i) =>
				i % 3 === 0 ? (
					<div key={i} className='flex space-x-4'>
						<Skeleton
							className={cn(
								'bg-slate-300 h-20',
								i % 2 === 0 ? 'flex-[2_2_0%]' : 'flex-1',
							)}
						/>
						<Skeleton
							className={cn(
								'bg-slate-300 h-20',
								i % 2 === 0 ? 'flex-1' : 'flex-[4_4_0%]',
							)}
						/>
					</div>
				) : (
					<Skeleton key={i} className='bg-slate-300 h-28' />
				),
			)}
		</div>
	);
}
