import Select from 'react-select/creatable';
import * as changeCase from 'change-case';
import { Fragment, useEffect, useState } from 'react';
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
	School,
	scholarshipOpenHouseEvents as allScholarshipOpenHouseEvents,
	lastScholarshipOpenHouseEvent,
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
import { queryClient } from 'ergonomic-react/src/lib/tanstackQuery';
import { dehydrate } from '@tanstack/react-query';
import {
	retrieveScholarshipApplicationSchoolsQueryKey,
	useRetrieveScholarshipApplicationSchools,
} from '@wallot/react/src/features/scholarshipApplications/hooks/useRetrieveScholarshipApplicationSchools';
import { retrieveScholarshipApplicationSchools } from '@wallot/react/src/features/scholarshipApplications/api/retrieveScholarshipApplicationSchools';
import { Label } from 'ergonomic-react/src/components/ui/label';
import {
	DialogHeader,
	DialogFooter,
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from 'ergonomic-react/src/components/ui/dialog';
import { OPEN_GRAPH_CONFIG } from 'ergonomic-react/src/config/openGraphConfig';
import { PlatformIcon } from 'ergonomic-react/src/components/brand/PlatformIcon';
import { DateTime } from 'luxon';
import { AsyncLink } from 'ergonomic-react/src/components/custom-ui/async-link';
import {
	GoCalendar,
	GoCheck,
	GoCheckCircleFill,
	GoChevronLeft,
	GoCircle,
} from 'react-icons/go';
import Image from 'next/image';

const steps = ScholarshipApplicationFormDataSectionEnum.arr;

const Page: NextPage<PageProps> = (props) => {
	// ==== State ==== //
	const [currentStep, setCurrentStep] =
		useState<ScholarshipApplicationFormDataSection>('Contact Details');
	const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
	const toggleMobileMenu = () => setMobileMenuOpen(R.not);
	// const [isSubmitConfirmationDialogOpen, setIsSubmitConfirmationDialogOpen] =
	// 	useState(false);
	const [submitConfirmationStep, setSubmitConfirmationStep] = useState<
		number | null
	>(null);
	const isSubmitConfirmationDialogOpen = submitConfirmationStep !== null;
	const [showFullScheduleOfEvents, setShowFullScheduleOfEvents] =
		useState(false);
	const [selectedEventLookupKey, setSelectedEventLookupKey] = useState<
		string | null
	>(null);
	const shouldGoToRSVPAfterSubmit = selectedEventLookupKey != null;

	// ==== Hooks ==== //

	// Schools
	const { isLoading: isSchoolsLoading, data: schoolsData } =
		useRetrieveScholarshipApplicationSchools();
	const schools = Array.isArray(schoolsData) ? schoolsData : [];

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
	const { control, formState, handleSubmit, reset, setError, setValue, watch } =
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

			if (operation === 'submit') {
				setSubmitConfirmationStep(null);
				if (shouldGoToRSVPAfterSubmit) {
					void router.push(
						getHomeSiteRoute({
							includeOrigin: false,
							origin: null,
							queryParams: {
								rsvp: selectedEventLookupKey,
							},
							routeStaticId: 'HOME_SITE__/SCHOLARSHIPS',
						}),
					);
				}
			}
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
	const isLastStep = currentStep === 'Summer Research';

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
	)
		.filter((fieldKey) => fieldKey !== 'high_school')
		.map(getLiteFormFieldProps);
	const collegeInformationFields = Keys(
		scholarshipApplicationFormDataPropertiesBySection['College Information'],
	).map(getLiteFormFieldProps);
	const studentProfileFields = Keys(
		scholarshipApplicationFormDataPropertiesBySection['Student Profile'],
	).map(getLiteFormFieldProps);
	const personalEssaysFields = Keys(
		scholarshipApplicationFormDataPropertiesBySection['Personal Essays'],
	).map(getLiteFormFieldProps);
	const summerInternshipsFields = Keys(
		scholarshipApplicationFormDataPropertiesBySection['Summer Research'],
	)
		.filter(
			(fieldKey) =>
				![
					'is_looking_for_summer_program',
					'prefers_summer_program_housing',
				].includes(fieldKey),
		)
		.map(getLiteFormFieldProps);
	const isFormDisabled =
		isFormSubmitting || isScholarshipApplicationForLoggedInUserSubmitted;

	// Form Submit Handler
	const onSubmit = handleSubmit((data) => {
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
	});

	// ==== Effects ==== //
	const [isInitialized, setIsInitialized] = useState(false);
	const [initialHighSchoolValue, setInitialHighSchoolValue] = useState<{
		label: string;
		value: string;
	} | null>(null);
	useEffect(() => {
		if (isInitialized) return;
		if (authStateIsLoading) return;
		if (isSchoolsLoading) return;
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

				// Set initial high school value
				const schoolName = defaultFormValues.high_school;
				if (schoolName) {
					const school = schools.find(({ name }) => name === schoolName);
					const schoolAddress = school?.address ?? '';
					setInitialHighSchoolValue(() => ({
						label: `${schoolName}${schoolAddress ? ' - ' + schoolAddress : ''}`,
						value: schoolName,
					}));
				} else {
					setInitialHighSchoolValue(() => ({
						label: 'Select one',
						value: '',
					}));
				}

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
		isSchoolsLoading,
		isLoggedInUserLoading,
		isScholarshipApplicationPageLoading,
		loggedInUser,
		scholarshipApplicationForLoggedInUser,
	]);

	// School logic
	const schoolName = liveData.high_school;
	const { metro_areas: schoolMetroAreas = [] } =
		schools.find(({ name }) => name === schoolName) || ({} as Partial<School>);
	const nearestMetroArea = schoolMetroAreas[0] ?? '';
	const today = DateTime.now();
	const scholarshipOpenHouseEvents = allScholarshipOpenHouseEvents.filter(
		({ start_time_nyc, status }) => {
			return (
				status === 'has_spots_open' && DateTime.fromISO(start_time_nyc) > today
			);
		},
	);
	const nextEventInNearestMetroArea = scholarshipOpenHouseEvents.find(
		({ metro_area_full_name }) => {
			return metro_area_full_name === nearestMetroArea;
		},
	);
	const nextNearestMetroArea = schoolMetroAreas[1] ?? '';
	const nextEventInNextNearestMetroArea = scholarshipOpenHouseEvents.find(
		({ metro_area_full_name }) => {
			return metro_area_full_name === nextNearestMetroArea;
		},
	);
	const thirdNearestMetroArea = schoolMetroAreas[2] ?? '';
	const nextEventInThirdNearestMetroArea = scholarshipOpenHouseEvents.find(
		({ metro_area_full_name }) => {
			return metro_area_full_name === thirdNearestMetroArea;
		},
	);
	const eventToShow =
		nextEventInNearestMetroArea ??
		nextEventInNextNearestMetroArea ??
		nextEventInThirdNearestMetroArea ??
		lastScholarshipOpenHouseEvent;
	const isRsvpdToNextEvent =
		scholarshipApplicationForLoggedInUser?.open_house_rsvps?.some(
			(lookupKey) => {
				return lookupKey === eventToShow.lookup_key;
			},
		) ?? false;
	const firstAttendingEventFromExistingRsvp = Array.isArray(
		scholarshipApplicationForLoggedInUser?.open_house_rsvps,
	)
		? scholarshipApplicationForLoggedInUser.open_house_rsvps[0]
		: null;
	const isAttendingAnOpenHouse = firstAttendingEventFromExistingRsvp != null;
	const selectedEvent = scholarshipOpenHouseEvents.find(({ lookup_key }) => {
		return (
			lookup_key ===
			(firstAttendingEventFromExistingRsvp || selectedEventLookupKey)
		);
	});

	const isLookingForSummerProgramValue =
		liveData['is_looking_for_summer_program'];
	const isLookingForSummerProgramUnset =
		isLookingForSummerProgramValue == null ||
		isLookingForSummerProgramValue === '';
	const isLookingForSummerProgram = isLookingForSummerProgramValue === true;
	const isNotLookingForSummerProgram = isLookingForSummerProgramValue === false;
	const isPreferringSummerProgramHousingValue =
		liveData['prefers_summer_program_housing'];
	const isPreferringSummerProgramHousingUnset =
		isPreferringSummerProgramHousingValue == null ||
		isPreferringSummerProgramHousingValue === '';
	const isPreferringSummerProgramHousing =
		isPreferringSummerProgramHousingValue === true;
	const isNotPreferringSummerProgramHousing =
		isPreferringSummerProgramHousingValue === false;
	const disableSubmit =
		isFormDisabled ||
		isLookingForSummerProgramUnset ||
		(isLookingForSummerProgram &&
			(!liveData.summer_plans || isPreferringSummerProgramHousingUnset));

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
											<div className='flex items-center space-x-1 w-44'>
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
										<form>
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

													<div className='mt-3'>
														<Label className='flex items-center space-x-1'>
															<div>
																<div>
																	<p>
																		High School
																		<span className='text-red-700 font-semibold'>
																			*
																		</span>
																	</p>
																</div>
																<div className='text-gray-500 font-light text-sm'>
																	<p>
																		Enter the name of your current high school
																	</p>
																</div>
															</div>
														</Label>
														<div className='mt-1'>
															{initialHighSchoolValue == null ? (
																<div>
																	<Skeleton className='bg-slate-300 h-10' />
																</div>
															) : (
																<Select
																	className='font-light text-sm'
																	defaultValue={initialHighSchoolValue}
																	isDisabled={
																		isFormSubmitting ||
																		isScholarshipApplicationForLoggedInUserSubmitted
																	}
																	isMulti={false}
																	name={'high_school'}
																	onChange={(changedValues) => {
																		const schoolName =
																			changedValues?.value ?? '';
																		setValue('high_school', schoolName);
																	}}
																	options={[
																		{
																			label: 'Select one',
																			value: '',
																		},
																	].concat(
																		schools.map(
																			({
																				address: schoolAddress,
																				name: schoolName,
																			}) => ({
																				label: `${schoolName}${
																					schoolAddress
																						? ' - ' + schoolAddress
																						: ''
																				}`,
																				value: schoolName,
																			}),
																		),
																	)}
																	required={true}
																/>
															)}
														</div>
													</div>
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
												<div
													className={cn(
														'px-1',
														currentStep === 'Summer Research' ? '' : 'hidden',
													)}
												>
													<div className='mt-2'>
														<div className=''>
															<Image
																alt='Summer Research'
																className='rounded-lg'
																height={512}
																priority
																objectFit='contain'
																src={'/img/banners/academic-program_v2.jpg'}
																width={2048}
															/>
														</div>
													</div>
													<div
														className={cn(
															'mt-2 text-right text-sm flex flex-col items-end space-y-1',
														)}
													>
														{[
															{
																benefit:
																	'8-Week research projects with college professors in your field',
															},
															{
																benefit:
																	'Publish your research in an academic journal',
															},
															{ benefit: 'Housing and meals provided' },
															{ benefit: 'Fun events in Tampa' },
														].map(({ benefit }) => {
															return (
																<div className='flex items-center space-x-1 font-light'>
																	<div>
																		<GoCheck />
																	</div>
																	<div>
																		<p>{benefit}</p>
																	</div>
																</div>
															);
														})}
													</div>
													<div className='mt-6'>
														<Label>
															<p className=''>
																Are you also interested in applying to our
																academic research program?
																<span className='text-red-700 font-semibold'>
																	*
																</span>
															</p>
														</Label>
														<div className='font-light mt-0.5 text-gray-500 text-sm'>
															<p>
																Designed for students interested in pursuing
																STEM, Pre-med or Nursing.
															</p>
														</div>
													</div>
													<div
														className={cn(
															'mt-2 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0',
														)}
													>
														{[
															{
																isSelected: isLookingForSummerProgram,
																subtitle: "I'm looking for a summer program",
																title: 'Yes',
															},
															{
																isSelected: isNotLookingForSummerProgram,
																subtitle: 'I already have plans this summer',
																title: 'No',
															},
														].map(({ isSelected, subtitle, title }) => {
															return (
																<button
																	className={cn(
																		'flex items-center space-x-3 px-3 py-2',
																		isSelected ? 'bg-gray-200' : 'bg-white',
																		'border border-gray-300 rounded-md',
																		{
																			'transition duration-200 ease-in-out hover:bg-gray-100':
																				!isFormDisabled,
																			'cursor-not-allowed': isFormDisabled,
																		},
																	)}
																	key={title}
																	type='button'
																	onClick={() => {
																		setValue(
																			'is_looking_for_summer_program',
																			isSelected ? null : title === 'Yes',
																		);
																	}}
																	disabled={isFormDisabled}
																>
																	<div className=''>
																		{isSelected ? (
																			<GoCheckCircleFill className='text-brand-dark text-lg' />
																		) : (
																			<GoCircle className='text-gray-400 text-lg' />
																		)}
																	</div>
																	<div className='text-left'>
																		<div>
																			<p className='font-semibold text-sm'>
																				{title}
																			</p>
																		</div>
																		<div className='lg:max-w-44'>
																			<p className='font-light text-xs'>
																				{subtitle}
																			</p>
																		</div>
																	</div>
																</button>
															);
														})}
													</div>
													<div
														className={cn('mt-6', {
															hidden: !isLookingForSummerProgram,
														})}
													>
														<div>
															{summerInternshipsFields.map((fieldProps) => (
																<LiteFormFieldContainer
																	key={fieldProps.fieldKey}
																	{...fieldProps}
																/>
															))}
														</div>
														<div className='mt-4'>
															<Label>
																<p className=''>
																	If accepted, would you prefer to stay in
																	program housing in Tampa?
																	<span className='text-red-700 font-semibold'>
																		*
																	</span>
																</p>
															</Label>
															<div className='font-light mt-0.5 text-gray-500 text-sm'>
																<p>Please note that housing is co-ed</p>
															</div>
														</div>
														<div
															className={cn(
																'mt-2 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0',
															)}
														>
															{[
																{
																	isSelected: isPreferringSummerProgramHousing,
																	subtitle:
																		'I would prefer to stay in program housing',
																	title: 'Yes',
																},
																{
																	isSelected:
																		isNotPreferringSummerProgramHousing,
																	subtitle: 'I would prefer to commute',
																	title: 'No',
																},
															].map(({ isSelected, subtitle, title }) => {
																return (
																	<button
																		className={cn(
																			'flex items-center space-x-3 px-3 py-2',
																			isSelected ? 'bg-gray-200' : 'bg-white',
																			'border border-gray-300 rounded-md',
																			{
																				'transition duration-200 ease-in-out hover:bg-gray-100':
																					!isFormDisabled,
																				'cursor-not-allowed': isFormDisabled,
																			},
																		)}
																		key={title}
																		type='button'
																		onClick={() => {
																			setValue(
																				'prefers_summer_program_housing',
																				isSelected ? null : title === 'Yes',
																			);
																		}}
																		disabled={isFormDisabled}
																	>
																		<div className=''>
																			{isSelected ? (
																				<GoCheckCircleFill className='text-brand-dark text-lg' />
																			) : (
																				<GoCircle className='text-gray-400 text-lg' />
																			)}
																		</div>
																		<div className='text-left'>
																			<div>
																				<p className='font-semibold text-sm'>
																					{title}
																				</p>
																			</div>
																			<div className='lg:max-w-44'>
																				<p className='font-light text-xs'>
																					{subtitle}
																				</p>
																			</div>
																		</div>
																	</button>
																);
															})}
														</div>
													</div>
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
													disabled={disableSubmit}
													type='button'
													className={cn(
														'w-fit text-center px-4 py-1.5 rounded-md border border-slate-300',
														isLastStep ? '' : 'hidden',
														disableSubmit
															? ' bg-brand-extralight text-gray-400 cursor-not-allowed'
															: 'bg-brand-dark',
													)}
													onClick={() => setSubmitConfirmationStep(0)}
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
								<aside className='hidden xl:block xl:max-w-64 xl:ml-10 xl:space-y-5'>
									<div
										className={cn(
											'bg-white border border-gray-200 rounded-md shadow-md p-5',
										)}
									>
										<div>
											<p className='font-semibold text-base'>Questions?</p>
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
									<div
										className={cn(
											'bg-white border border-brand-dark rounded-md shadow-md p-5',
										)}
									>
										<div>
											<p className='font-semibold text-base'>Next Open House</p>
										</div>
										<div className='mt-1'>
											<p className='text-gray-700 font-light text-sm'>
												{eventToShow.metro_area} Open House on{' '}
												{eventToShow.time.replace('·', 'at')}
											</p>
										</div>
										<AsyncLink
											href={getHomeSiteRoute({
												includeOrigin: false,
												origin: null,
												queryParams: {
													rsvp: eventToShow.lookup_key,
												},
												routeStaticId: 'HOME_SITE__/SCHOLARSHIPS',
											})}
											target='_blank'
											isReady={!isRsvpdToNextEvent}
										>
											<div className='p-[1.5px] bg-gradient-to-r from-brand-dark via-pink-600 to-red-800 animate-gradient-rotate bg-[length:200%_200%] rounded w-full cursor-pointer mt-3'>
												<div className='bg-black rounded flex items-center justify-center space-x-1.5 py-1 px-4 w-full'>
													{isRsvpdToNextEvent && (
														<GoCheckCircleFill className='text-white' />
													)}
													<div className={''}>
														<p
															className={cn(
																'font-extralight text-white text-sm',
															)}
														>
															{isRsvpdToNextEvent
																? 'Attending'
																: 'RSVP for the Guest List'}
														</p>
													</div>
												</div>
											</div>
										</AsyncLink>
									</div>
								</aside>
							</div>
						</div>
					</div>
				</div>
			</div>
			{isSubmitConfirmationDialogOpen && (
				<Dialog
					open={isSubmitConfirmationDialogOpen}
					onOpenChange={(open) => {
						setSubmitConfirmationStep(open ? 0 : null);
					}}
				>
					<DialogTrigger asChild></DialogTrigger>
					<DialogContent
						className={cn('!max-h-[85vh]', {
							'!overflow-y-auto': submitConfirmationStep !== 0,
						})}
					>
						<button
							className='focus:outline-none focus-visible:ring-none !text-left flex items-center space-x-1'
							onClick={() => {
								if (submitConfirmationStep === 0) {
									setSubmitConfirmationStep(null);
								} else {
									setSubmitConfirmationStep((prev) => (prev ?? 0) - 1);
								}
							}}
						>
							<div>
								<GoChevronLeft className='text-xs' />
							</div>
							<div>
								<p className='text-xs'>
									{
										{
											0: 'Back to application',
											1: 'Back to application review',
											2: 'Back to Open House RSVP',
										}[submitConfirmationStep ?? '']
									}
								</p>
							</div>
						</button>
						<div
							className={cn('flex items-center justify-center space-x-3 mt-3')}
						>
							<div>
								<PlatformIcon
									height={380}
									size='lg'
									srcMap={{
										dark: OPEN_GRAPH_CONFIG.siteBrandIconDarkMode ?? '',
										light: OPEN_GRAPH_CONFIG.siteBrandIconLightMode ?? '',
									}}
									width={2048}
								/>
							</div>
						</div>
						<div className='flex justify-center space-x-5 mt-4'>
							<div className='w-16 h-2 rounded-md bg-brand'></div>
							<div
								className={cn(
									'w-16 h-2 rounded-md',
									submitConfirmationStep < 1 ? 'bg-gray-200' : 'bg-brand',
								)}
							></div>
							{!isAttendingAnOpenHouse && (
								<div
									className={cn(
										'w-16 h-2 rounded-md',
										submitConfirmationStep < 2 ? 'bg-gray-200' : 'bg-brand',
									)}
								></div>
							)}
						</div>
						{submitConfirmationStep === 0 && (
							<Fragment>
								<DialogHeader className='mt-4'>
									<DialogTitle className=''>Review your responses</DialogTitle>
									<DialogDescription className=''>
										Please review your responses before submitting your
										application. If you need to make any changes, click the
										"Back" button. Once everything looks good, continue to the
										next step.
									</DialogDescription>
								</DialogHeader>
								<div className={'!max-h-[30vh] !overflow-y-auto'}>
									{[
										{
											question: 'Name',
											response: `${liveData.given_name} ${liveData.family_name}`,
										},
										{
											question: 'Phone Number',
											response: liveData.phone_number,
										},
										{
											question: 'High School',
											response: liveData.high_school,
										},
										{
											question: 'Date of Birth',
											response: liveData.date_of_birth,
										},
										{
											question: 'Anticipated College',
											response: liveData.college_name,
										},
										{
											question: 'Type of College',
											response: liveData.college_type,
										},
										{
											question: 'Academic Achievement',
											response: liveData.academic_achievement,
										},
										{
											question: 'Honors & Awards',
											response: liveData.honors_and_awards,
										},
										{
											question: 'Extracurricular Activities',
											response: liveData.extracurricular_activities,
										},
										{
											question: 'Future Goals',
											response: liveData.future_goals,
										},
										{
											question: 'Common Essay',
											response: liveData.common_essay,
										},
										{
											question: 'Academic Achievement Award Essay',
											response:
												liveData.academic_achievement_award_essay ||
												'Not applicable',
										},
										{
											question: 'Outstanding Student-Athlete Award Essay',
											response:
												liveData.outstanding_student_athlete_award_essay ||
												'Not applicable',
										},
										{
											question: 'Community Leadership Award Essay',
											response:
												liveData.community_leadership_award_essay ||
												'Not applicable',
										},
										{
											question: 'Entrepreneurial Excellence Award Essay',
											response:
												liveData.entrepreneurial_excellence_award_essay ||
												'Not applicable',
										},
									].map(({ question, response }, responseIdx) => {
										return (
											<div
												key={question}
												className={cn({ 'mt-2': responseIdx > 0 })}
											>
												<p className='font-semibold text-xs'>{question}</p>
												<p className='font-extralight text-base whitespace-pre-line'>
													{response}
												</p>
											</div>
										);
									})}
								</div>
								<div className='flex items-center space-x-4 mt-4'>
									<button
										className='w-full text-center bg-slate-50 px-4 py-1.5 rounded-md border border-slate-300'
										onClick={() => setSubmitConfirmationStep(null)}
									>
										<p className='font-medium text-xs'>Back</p>
									</button>
									<button
										className='w-full text-center bg-brand-dark px-4 py-1.5 rounded-md border border-transparent'
										onClick={() => setSubmitConfirmationStep(1)}
									>
										<p className='font-medium text-xs text-white'>Continue</p>
									</button>
								</div>
							</Fragment>
						)}
						{!isAttendingAnOpenHouse && (
							<Fragment>
								{submitConfirmationStep === 1 && (
									<Fragment>
										<DialogHeader className='mt-4'>
											<DialogTitle className=''>
												RSVP to an Open House
											</DialogTitle>
											<DialogDescription className=''>
												The Florida Visionary Scholarship program committee is
												hosting informal open house events both in-person and
												virtually to help applicants learn more about the
												scholarship and get to know our team. Spaces at each
												event are limited, so RSVP asap!
											</DialogDescription>
										</DialogHeader>
										<div className={cn({ hidden: showFullScheduleOfEvents })}>
											<Fragment>
												<p className='font-semibold text-xs'>
													Our next event near you
												</p>
												<p className='font-extralight text-base'>
													{eventToShow.metro_area} Open House on{' '}
													{eventToShow.time.replace('·', 'at')}
												</p>
												<p className='font-extralight text-sm'>
													– {eventToShow.address_title}
												</p>
												<button
													className='text-brand-dark font-light text-xs mt-3 flex items-center space-x-2 focus:outline-none focus-visible:ring-none'
													onClick={() => setShowFullScheduleOfEvents(true)}
												>
													<div>
														<GoCalendar className='' />
													</div>
													<div>
														<p>Show full schedule of events</p>
													</div>
												</button>
											</Fragment>
										</div>
										<div className={cn({ hidden: !showFullScheduleOfEvents })}>
											<p className='font-semibold text-xs'>
												Select the event that you wish to attend
											</p>
											{scholarshipOpenHouseEvents.map(
												(event, eventIdx, arr) => {
													const isSelected =
														selectedEventLookupKey === event.lookup_key;
													const isLast = eventIdx === arr.length - 1;
													return (
														<Fragment key={event.lookup_key}>
															<button
																key={event.lookup_key}
																className='flex items-center space-x-2 mt-1 text-left w-full hover:bg-gray-100 focus:outline-none focus-visible:ring-none p-2'
																onClick={() => {
																	if (isSelected) {
																		setSelectedEventLookupKey(null);
																	} else {
																		setSelectedEventLookupKey(event.lookup_key);
																	}
																}}
															>
																<div className='w-8'>
																	{isSelected ? (
																		<GoCheckCircleFill className='text-brand-dark' />
																	) : (
																		<GoCircle className='text-gray-400' />
																	)}
																</div>
																<div className='w-3/4'>
																	<div>
																		<p className='font-extralight text-sm'>
																			{event.metro_area} Open House
																		</p>
																	</div>
																	<div className=''>
																		<p className='font-normal text-xs'>
																			{event.time.replace('·', 'at')}
																		</p>
																	</div>
																</div>
																<div className='w-1/4 flex justify-end'>
																	<div
																		className={cn('px-1.5 py-0.5 rounded-lg', {
																			'bg-purple-200':
																				event.type === 'In-person',
																			'bg-blue-200': event.type === 'Virtual',
																		})}
																	>
																		<p
																			className={cn('font-extralight text-xs', {
																				'text-purple-900':
																					event.type === 'In-person',
																				'text-blue-900':
																					event.type === 'Virtual',
																			})}
																		>
																			{event.type}
																		</p>
																	</div>
																</div>
															</button>
															{!isLast && <Separator className='my-2' />}
														</Fragment>
													);
												},
											)}
										</div>
										<div className='flex flex-col space-y-4 mt-4'>
											<button
												className='bg-brand-dark rounded-md px-4 py-2 text-center w-full mt-1'
												onClick={() => {
													if (selectedEventLookupKey == null) {
														if (showFullScheduleOfEvents) {
															toast({
																title: 'Error',
																description:
																	'Please select one of the events above',
															});
															return;
														}
														setSelectedEventLookupKey(eventToShow.lookup_key);
													}
													setSubmitConfirmationStep(2);
												}}
											>
												<p className='text-white'>Yes, I can attend</p>
											</button>
											<button
												className='bg-transparent px-4 py-2 text-center w-full mt-1'
												onClick={() => {
													setShowFullScheduleOfEvents(false);
													setSubmitConfirmationStep(2);
												}}
											>
												<p className='text-gray-600 font-light'>
													No, I have a scheduling conflict with all{' '}
													{scholarshipOpenHouseEvents.length} events
												</p>
											</button>
										</div>
										<Separator className='!my-3' />
										<DialogFooter className=''>
											<div className={cn('mt-1', 'lg:max-w-2xl')}>
												<p className='font-semibold text-xs'>
													Scheduling Conflicts
												</p>
												<p className='font-light text-[0.55rem]'>
													While we have several open houses scheduled, we
													understand that some students may have scheduling
													conflicts on account of prior obligations. If you are
													unable to attend any of the scheduled open houses,
													please email us at scholarships@wallot.app with your
													availability and a member of our team will do our best
													schedule a time to meet with you.
												</p>
											</div>
										</DialogFooter>
									</Fragment>
								)}
							</Fragment>
						)}
						{submitConfirmationStep === (isAttendingAnOpenHouse ? 1 : 2) && (
							<Fragment>
								<DialogHeader className='mt-4'>
									<DialogTitle className=''>
										Submit your application
									</DialogTitle>
									<DialogDescription className=''>
										Thank you for completing your Florida Visionary Scholarship
										Application. We're excited to learn more about your
										academic, athletic, and extracurricular achievements.
									</DialogDescription>
								</DialogHeader>
								<div className={'!max-h-[30vh] !overflow-y-auto'}>
									{[
										{
											question: 'Applicant',
											response: `${liveData.given_name} ${liveData.family_name} from ${liveData.high_school}`,
										},
										{
											question: 'Open House RSVP',
											response:
												selectedEvent == null
													? 'Can not attend due to scheduling conflict'
													: `Attending ${
															selectedEvent.metro_area
													  } Open House on ${selectedEvent.time.replace(
															'·',
															'at',
													  )}`,
										},
									].map(({ question, response }, responseIdx) => {
										return (
											<div
												key={question}
												className={cn({ 'mt-2': responseIdx > 0 })}
											>
												<p className='font-semibold text-xs'>{question}</p>
												<p className='font-extralight text-base whitespace-pre-line'>
													{response}
												</p>
											</div>
										);
									})}
								</div>
								<div className='flex items-center space-x-4 mt-4'>
									<button
										className='w-full text-center bg-slate-50 px-4 py-1.5 rounded-md border border-slate-300'
										onClick={() =>
											setSubmitConfirmationStep(isAttendingAnOpenHouse ? 0 : 1)
										}
									>
										<p className='font-medium text-xs'>Back</p>
									</button>
									<button
										className='w-full text-center bg-brand-dark px-4 py-1.5 rounded-md border border-transparent'
										onClick={onSubmit}
										disabled={isSubmitScholarshipApplicationRunning}
									>
										{isSubmitScholarshipApplicationRunning ? (
											<div>
												<div className='flex items-center justify-center min-w-8'>
													<div
														className={cn(
															'w-4 h-4 border-2 border-gray-200 rounded-full animate-spin',
															'border-t-white border-r-white border-b-white',
														)}
													></div>
												</div>
											</div>
										) : (
											<p className='font-medium text-xs text-white'>Submit</p>
										)}
									</button>
								</div>
							</Fragment>
						)}
					</DialogContent>
				</Dialog>
			)}
		</PageComponent>
	);
};

export default Page;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_SITE__/SCHOLARSHIPS/APPLICATION' as const;

// Route Query Params Type
type RouteQueryParams = HomeSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

export const getStaticProps: GetStaticProps<PageStaticProps> = async () => {
	// Prefetch the list of Schools from Cloud Storage
	await queryClient.prefetchQuery(
		retrieveScholarshipApplicationSchoolsQueryKey,
		retrieveScholarshipApplicationSchools,
	);

	// Route Static Props
	const ROUTE_STATIC_PROPS: PageStaticProps = {
		routeStaticId: ROUTE_STATIC_ID,
		title: 'Florida Visionary Scholarship Application',
	};
	return Promise.resolve({
		props: { ...ROUTE_STATIC_PROPS, dehydratedState: dehydrate(queryClient) },
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
