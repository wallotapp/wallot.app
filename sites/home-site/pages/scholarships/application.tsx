import * as changeCase from 'change-case';
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
	ScholarshipApplicationFormDataSectionEnum,
	getHomeSiteRoute,
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
import { Separator } from 'ergonomic-react/src/components/ui/separator';
import Link from 'next/link';

const steps = ScholarshipApplicationFormDataSectionEnum.arr;

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
	const isScholarshipApplicationForLoggedInUserReviewed =
		scholarshipApplicationForLoggedInUser != null &&
		isReviewedScholarshipApplication(scholarshipApplicationForLoggedInUser);
	const { decision = null } = scholarshipApplicationForLoggedInUser ?? {};
	const decisionText =
		decision == null
			? ''
			: {
					accepted:
						'Congratulations! Your application has been accepted. We had a large amount of qualified applicants this year, and your application stood out as one of the best. Please check your email for more information.',
					rejected:
						'We regret to inform you that your application was not accepted for a scholarship award. Thank you for your interest in the program, and we wish you the best in your future endeavors.',
					waitlisted:
						'You have been waitlisted. We will notify you if a spot opens up. Please monitor your email address and phone number for updates.',
			  }[decision];

	// Form
	const defaultFormData =
		scholarshipApplicationFormDataSchema.getDefault() as ScholarshipApplicationFormDataParams;
	const { control, formState, handleSubmit, reset, setError, watch } =
		useForm<ScholarshipApplicationFormDataParams>({
			resolver,
			shouldUnregister: false,
		});
	const liveData = watch();

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
		thumbnailData: {
			thumbnail: '/img/brand/og-image-scholarship.png',
			thumbnailAlt: 'Wallot Scholarship',
			thumbnailHeight: 538,
			thumbnailType: 'image/png',
			thumbnailWidth: '1024',
		},
	};

	// Define our steps and their fields.
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
		initialFormData: defaultFormData,
		isSubmitting:
			isFormSubmitting || isScholarshipApplicationForLoggedInUserSubmitted,
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
	const isFormDisabled =
		isFormSubmitting || isScholarshipApplicationForLoggedInUserSubmitted;

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
						] as unknown as ScholarshipApplicationFormDataParams[typeof field]) =
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
					await refetchScholarshipApplicationsForLoggedInUser();
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
						<div className='flex justify-between items-center'>
							<div className=''>
								<div>
									<p className='font-semibold text-lg'>
										Florida Visionary Scholarship Application
									</p>
								</div>
								<div className='-mt-0.5'>
									<p className='font-extralight text-sm'>
										Class of 2025 Cohort
									</p>
								</div>
							</div>
						</div>
						{isScholarshipApplicationForLoggedInUserSubmitted && (
							<div className='mt-4 mb-10 bg-gray-100 border border-gray-200 rounded-md shadow-md p-6 font-light text-sm max-w-md'>
								<div>
									<p className='font-semibold text-sm'>
										Application Status –{' '}
										{changeCase.capitalCase(
											scholarshipApplicationForLoggedInUser?.status ?? '',
										)}
									</p>
								</div>
								<div className='mt-1 text-gray-700 font-light text-xs'>
									{isScholarshipApplicationForLoggedInUserReviewed ? (
										<p>{decisionText}</p>
									) : (
										<p>
											Your application has been received and is under review.
											You will be notified once our committee has reached a
											decision regarding your application.
										</p>
									)}
								</div>
							</div>
						)}
					</div>
					<div className={cn('mt-5')}>
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
							<div className='flex flex-col md:flex-row md:space-x-5'>
								{/* Left sidebar (visible on Tablet and Desktop) */}
								<aside className='hidden md:block space-y-0.5'>
									{steps.map((step) => {
										const isActive = step === currentStep;
										return (
											<div className='flex items-center space-x-1'>
												<div className='py-1'>
													<Separator
														orientation='vertical'
														className={cn(
															'!h-5 !w-1 !rounded-lg',
															isActive ? 'bg-brand-dark' : 'bg-transparent',
														)}
													/>
												</div>
												<button
													key={step}
													className={cn(
														'block w-full text-left pl-2 pr-10 py-1 rounded',
														isActive ? 'bg-gray-200' : '',
													)}
													onClick={() =>
														setCurrentStep(
															step as ScholarshipApplicationFormDataSection,
														)
													}
												>
													<p
														className={cn(
															'text-xs',
															isActive ? 'font-semibold' : 'font-light',
														)}
													>
														{step}
													</p>
												</button>
											</div>
										);
									})}
								</aside>

								{/* Main content area */}
								<main className='flex-1 lg:pr-10'>
									{/* Mobile collapsible steps menu (visible on Mobile) */}
									<div className='md:hidden mb-4'>
										<button
											className='w-full flex justify-between items-center p-2 shadow rounded'
											onClick={toggleMobileMenu}
										>
											<span className='font-bold'>{currentStep}</span>
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
											<ul className='mt-2 shadow rounded'>
												{steps.map((step) => (
													<li
														key={step}
														className={cn(
															'cursor-pointer p-2 border-b last:border-b-0',
															{
																'font-bold text-blue-500': step === currentStep,
																'text-gray-700': step !== currentStep,
															},
														)}
														onClick={() => {
															setCurrentStep(
																step as ScholarshipApplicationFormDataSection,
															);
															setMobileMenuOpen(false);
														}}
													>
														{step}
													</li>
												))}
											</ul>
										)}
									</div>

									{/* Form container */}
									<div className=''>
										{/* Form header */}
										<div className='flex justify-between'>
											<div>
												<p className='text-lg font-medium'>{currentStep}</p>
											</div>
											<div>
												<button
													className={cn(
														'w-fit text-center bg-slate-50 px-4 py-1.5 rounded-md border border-slate-300',
														isFormDisabled
															? ' text-gray-400 cursor-not-allowed'
															: '',
													)}
													disabled={isFormDisabled}
													onClick={() => {
														const serverData =
															getGeneralizedServerDataFromFormData(
																liveData,
																formDataTransformationOptions,
															);
														toast({
															title: 'Saving Application',
															description: 'This may take a few moments...',
														});
														saveScholarshipApplication(serverData);
													}}
												>
													{isSaveScholarshipApplicationRunning ? (
														<div>
															<div className='flex items-center justify-center min-w-8'>
																<div
																	className={cn(
																		'w-4 h-4 border-2 border-gray-200 rounded-full animate-spin',
																		'border-t-brand border-r-brand border-b-brand',
																	)}
																></div>
															</div>
														</div>
													) : (
														<p className='font-medium text-xs'>Save Progress</p>
													)}
												</button>
											</div>
										</div>

										<Separator className='mt-1.5' />

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
											<div className='mt-6 flex justify-end space-x-3'>
												<button
													type='button'
													disabled={
														isFormSubmitting ||
														currentStep === 'Contact Details'
													}
													className={cn(
														'w-fit text-center bg-slate-50 px-4 py-1.5 rounded-md border border-slate-300',
														currentStep === 'Contact Details'
															? ' text-gray-400 cursor-not-allowed'
															: '',
													)}
													onClick={() =>
														currentStep !== 'Contact Details' &&
														setCurrentStep(
															steps[
																steps.findIndex(
																	(step) => step === currentStep,
																) - 1
															] as ScholarshipApplicationFormDataSection,
														)
													}
												>
													<p className='font-medium text-xs'>Back</p>
												</button>

												<button
													disabled={isFormSubmitting}
													type='button'
													className={cn(
														'w-fit text-center bg-slate-50 px-4 py-1.5 rounded-md border border-slate-300',
														isLastStep ? 'hidden' : '',
														isFormSubmitting
															? ' text-gray-400 cursor-not-allowed'
															: '',
													)}
													onClick={() =>
														setCurrentStep(
															steps[
																steps.findIndex(
																	(step) => step === currentStep,
																) + 1
															] as ScholarshipApplicationFormDataSection,
														)
													}
												>
													<p className='font-medium text-xs'>Continue</p>
												</button>
												<button
													disabled={isFormDisabled}
													type='submit'
													className={cn(
														'w-fit text-center px-4 py-1.5 rounded-md border border-slate-300',
														isLastStep ? '' : 'hidden',
														isFormDisabled
															? ' bg-brand-extralight text-gray-400 cursor-not-allowed'
															: 'bg-brand-dark',
													)}
												>
													<p className='font-medium text-xs text-white'>
														Submit Application
													</p>
												</button>
											</div>
										</form>
									</div>
								</main>

								{/* Right callout cards (visible on Desktop) */}
								<aside className='hidden lg:block lg:max-w-56 lg:ml-10'>
									<div
										className={cn(
											'bg-white border border-gray-200 rounded-md shadow-md p-6',
										)}
									>
										<div>
											<p className='font-semibold text-sm'>Questions?</p>
										</div>
										<div className='mt-1'>
											<p className='text-gray-700 font-light text-xs'>
												We're here to help. Visit our Florida Visionary
												Scholarship{' '}
												<Link
													href={getHomeSiteRoute({
														includeOrigin: false,
														origin: null,
														queryParams: {},
														routeStaticId: 'HOME_SITE__/SCHOLARSHIPS',
													})}
													target='_blank'
												>
													<span className='text-brand-dark'>FAQ page</span>
												</Link>{' '}
												or contact our program coordinator Kamar Mack by sending
												an email to{' '}
												<Link
													href='mailto:scholarships@wallot.app'
													target='_blank'
												>
													<span className='text-brand-dark'>
														scholarships@wallot.app
													</span>
												</Link>
												.
											</p>
										</div>
									</div>
								</aside>
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
