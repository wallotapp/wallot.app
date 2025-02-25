import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	PageStaticProps,
	PageProps,
	Page as PageComponent,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import {
	getHomeSiteRoute,
	getSsoSiteRoute,
	HomeSiteRouteQueryParams,
	isSubmittedScholarshipApplication,
	ScholarshipOpenHouseRsvpFormDataField,
	ScholarshipOpenHouseRsvpFormDataFieldFromUserDataEnum,
	ScholarshipOpenHouseRsvpFormDataParams,
	scholarshipOpenHouseRsvpFormDataSchema,
	scholarshipOpenHouseRsvpFormDataSchemaFieldSpecByFieldKey,
	scholarshipOpenHouseEvents as events,
	ScholarshipOpenHouseRsvpFormDataResponse,
} from '@wallot/js';
import { Fragment, useEffect, useState } from 'react';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import Link from 'next/link';
import { AsyncLink } from 'ergonomic-react/src/components/custom-ui/async-link';
import { LogoButton } from '@wallot/react/src/components/LogoButton';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { useQueryScholarshipApplicationsForLoggedInUser } from '@wallot/react/src/features/scholarshipApplications/hooks/useQueryScholarshipApplicationsForLoggedInUser';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import { useContext } from 'react';
import { PiSparkleLight } from 'react-icons/pi';
import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { Separator } from 'ergonomic-react/src/components/ui/separator';
import {
	GoCalendar,
	GoCheckCircleFill,
	GoHome,
	GoLocation,
	GoOrganization,
	GoRows,
} from 'react-icons/go';
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
import { LiteFormFieldProps } from 'ergonomic-react/src/features/data/types/LiteFormFieldProps';
import { LiteFormFieldContainer } from 'ergonomic-react/src/features/data/components/LiteFormFieldContainer';
import { LiteFormFieldError } from 'ergonomic-react/src/features/data/components/LiteFormFieldError';
import { useSubmitScholarshipOpenHouseRsvpMutation } from '@wallot/react/src/features/scholarshipApplications/hooks/useSubmitScholarshipOpenHouseRsvpMutation';
import { useYupValidationResolver } from 'ergonomic-react/src/features/data/hooks/useYupValidationResolver';
import { GeneralizedError } from 'ergonomic';
import { useForm } from 'react-hook-form';
import { defaultGeneralizedFormDataTransformationOptions } from 'ergonomic-react/src/features/data/types/GeneralizedFormDataTransformationOptions';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import { SubmitButton } from '@wallot/react/src/components/SubmitButton';
import { useQueryLoggedInUser } from '@wallot/react/src/features/users/hooks/useQueryLoggedInUser';
import { getGeneralizedFormDataFromServerData } from 'ergonomic-react/src/features/data/utils/getGeneralizedFormDataFromServerData';
import { isDomAvailable } from 'ergonomic-react/src/utils/isDomAvailable';

const headers = [
	{ Icon: GoOrganization, title: 'Location' },
	{ Icon: GoLocation, title: 'Address' },
	{ Icon: GoCalendar, title: 'Time' },
	{ Icon: GoHome, title: 'Metro Area' },
	{ Icon: GoRows, title: 'Type' },
];

const Page: NextPage<PageProps> = (props) => {
	// ==== State ==== //
	const [rsvpsGuest, setRsvpsGuest] = useState<string[]>([]);
	const [isDialogOpenForLookupKey, setIsDialogOpenForLookupKey] = useState<
		string | null
	>(null);

	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// Site Origin
	const siteOriginByTarget = useSiteOriginByTarget();
	const homeSiteOrigin = siteOriginByTarget['HOME_SITE'];
	const ssoSiteOrigin = siteOriginByTarget['SSO_SITE'];

	// ==== Constants ==== //

	// Router Query
	const query: RouteQueryParams = router?.query ?? {};

	// Router Query Param Values
	const _ = query;
	typeof _;

	// Auth status
	const { user } = useContext(AuthContext);
	const isUserSignedIn = user?.uid != null;

	// User
	const { loggedInUser, isLoggedInUserLoading } = useQueryLoggedInUser();

	// Application status
	const {
		resourcesForLoggedInUser: scholarshipApplicationsForLoggedInUser,
		isResourcePageLoading: isScholarshipApplicationPageLoading,
		refetch: refetchScholarshipApplicationsForLoggedInUser,
	} = useQueryScholarshipApplicationsForLoggedInUser();
	const scholarshipApplicationForLoggedInUser =
		scholarshipApplicationsForLoggedInUser[0] ?? null;
	const isScholarshipApplicationForLoggedInUserSubmitted =
		scholarshipApplicationForLoggedInUser != null &&
		isSubmittedScholarshipApplication(scholarshipApplicationForLoggedInUser);

	// ==== Constants ==== //

	// Home URL (current page)
	const homeUrl = getHomeSiteRoute({
		includeOrigin: false,
		origin: null,
		queryParams: {},
		routeStaticId: 'HOME_SITE__/SCHOLARSHIPS',
	});

	// Application URL
	const loggedInApplicationUrl = getHomeSiteRoute({
		includeOrigin: true,
		origin: homeSiteOrigin,
		queryParams: {},
		routeStaticId: 'HOME_SITE__/SCHOLARSHIPS/APPLICATION',
	});
	const guestApplicationUrl = getSsoSiteRoute({
		includeOrigin: true,
		origin: ssoSiteOrigin,
		queryParams: {
			dest: loggedInApplicationUrl,
		},
		routeStaticId: 'SSO_SITE__/REGISTER',
	});
	const applicationUrl = isUserSignedIn
		? loggedInApplicationUrl
		: guestApplicationUrl;
	const isApplicationUrlReady = isUserSignedIn
		? !isScholarshipApplicationPageLoading
		: true;

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

	// Toaster
	const { toast } = useToast();

	// Form Resolver
	const formDataTransformationOptions =
		defaultGeneralizedFormDataTransformationOptions;
	const resolver = useYupValidationResolver(
		scholarshipOpenHouseRsvpFormDataSchema,
		formDataTransformationOptions,
	);

	// Form
	const defaultFormData =
		scholarshipOpenHouseRsvpFormDataSchema.getDefault() as ScholarshipOpenHouseRsvpFormDataParams;
	const { control, formState, handleSubmit, reset, setError, watch } =
		useForm<ScholarshipOpenHouseRsvpFormDataParams>({
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
	const onMutationSuccess = async ({
		open_house_lookup_key,
	}: ScholarshipOpenHouseRsvpFormDataResponse) => {
		// Close dialog
		setIsDialogOpenForLookupKey(null);

		// Show success toast
		toast({
			title: 'Success',
			description: 'Your RSVP has been confirmed.',
		});

		if (scholarshipApplicationForLoggedInUser == null) {
			// Append lookup key to RSVP list
			setRsvpsGuest((prev) => [...prev, open_house_lookup_key]);

			// Add or set OPEN_HOUSE_RSVP_LOOKUP_KEYS
			const localStorageRsvps = localStorage.getItem(
				'OPEN_HOUSE_RSVP_LOOKUP_KEYS',
			);
			if (localStorageRsvps) {
				const rsvpsCached = localStorageRsvps.split(',');
				if (!rsvpsCached.includes(open_house_lookup_key)) {
					rsvpsCached.push(open_house_lookup_key);
					localStorage.setItem(
						'OPEN_HOUSE_RSVP_LOOKUP_KEYS',
						rsvpsCached.join(','),
					);
				}
			} else {
				localStorage.setItem(
					'OPEN_HOUSE_RSVP_LOOKUP_KEYS',
					open_house_lookup_key,
				);
			}
		} else {
			// Refetch scholarship applications
			await refetchScholarshipApplicationsForLoggedInUser();
		}
	};

	// Submit mutation
	const {
		mutate: submitScholarshipOpenHouseRsvp,
		isLoading: isSubmitScholarshipOpenHouseRsvpRunning,
	} = useSubmitScholarshipOpenHouseRsvpMutation({
		onError: onMutationError,
		onSuccess: onMutationSuccess,
	});

	// Form
	const formStatus =
		formState.isSubmitting || isSubmitScholarshipOpenHouseRsvpRunning
			? 'running'
			: 'idle';
	const isFormSubmitting = formStatus === 'running';
	const getLiteFormFieldProps = (
		fieldKey: ScholarshipOpenHouseRsvpFormDataField,
	): LiteFormFieldProps<ScholarshipOpenHouseRsvpFormDataParams> => ({
		control,
		fieldErrors: formState.errors,
		fieldKey,
		fieldSpec:
			scholarshipOpenHouseRsvpFormDataSchemaFieldSpecByFieldKey[fieldKey],
		initialFormData: defaultFormData,
		isSubmitting:
			fieldKey === 'email'
				? isFormSubmitting || loggedInUser != null
				: isFormSubmitting,
		operation: 'update',
		renderTooltipContent: undefined,
		setError: (message) => setError(fieldKey, { message }),
	});
	const rsvpFormFields =
		ScholarshipOpenHouseRsvpFormDataFieldFromUserDataEnum.arr.map(
			getLiteFormFieldProps,
		);

	// Form Submit Handler
	const onSubmit =
		(lookupKey: string) => (data: ScholarshipOpenHouseRsvpFormDataParams) => {
			console.log('Submitting RSVP with following data:', data);
			toast({
				title: 'Adding you to the guest list',
				description: 'This may take a few moments...',
			});

			// Save data to local storage
			localStorage.setItem('OPEN_HOUSE_RSVP_DATA', JSON.stringify(data));

			submitScholarshipOpenHouseRsvp({
				...data,
				open_house_lookup_key: lookupKey,
			});
		};

	// ==== Effects ==== //
	const [isReadyToInitialize, setIsReadyToInitialize] = useState(false);
	useEffect(
		() =>
			void (async () => {
				// Wait 1 second
				await new Promise((resolve) => setTimeout(resolve, 1000));
				setIsReadyToInitialize(true);
			})(),
		[],
	);
	const [isInitialized, setIsInitialized] = useState(false);
	useEffect(() => {
		if (!isReadyToInitialize) return;
		if (isInitialized) return;
		if (isUserSignedIn) {
			if (isLoggedInUserLoading) return;
			if (isScholarshipApplicationPageLoading) return;
		}
		return void (async function () {
			try {
				const initialServerData: ScholarshipOpenHouseRsvpFormDataParams =
					defaultFormData;

				// Properties from local storage
				const localStorageData = localStorage.getItem('OPEN_HOUSE_RSVP_DATA');

				if (!localStorageData) {
					// Properties from user data
					initialServerData.email = loggedInUser?.firebase_auth_email ?? '';
				} else {
					const parsedLocalStorageData = JSON.parse(
						localStorageData,
					) as ScholarshipOpenHouseRsvpFormDataParams;
					initialServerData.email = parsedLocalStorageData.email;
					initialServerData.accessibility_requests =
						parsedLocalStorageData.accessibility_requests;
					initialServerData.parent_emails =
						parsedLocalStorageData.parent_emails;
					initialServerData.is_attending_with_parent =
						parsedLocalStorageData.is_attending_with_parent;
				}

				// Set form values
				const defaultFormValues = getGeneralizedFormDataFromServerData(
					initialServerData,
					formDataTransformationOptions,
				);
				reset(defaultFormValues);

				if (scholarshipApplicationForLoggedInUser == null) {
					// Get RSVP lookup keys from local storage
					const localStorageRsvps = localStorage.getItem(
						'OPEN_HOUSE_RSVP_LOOKUP_KEYS',
					);
					if (localStorageRsvps) {
						setRsvpsGuest(() => localStorageRsvps.split(','));
					}
				}
			} catch (error) {
				console.error('Error initializing scholarship application:', error);
			} finally {
				setIsInitialized(true);
			}
		})();
	}, [
		isReadyToInitialize,
		isInitialized,
		isLoggedInUserLoading,
		isScholarshipApplicationPageLoading,
		loggedInUser,
		scholarshipApplicationForLoggedInUser,
		scholarshipApplicationForLoggedInUser,
	]);

	const rsvps =
		scholarshipApplicationForLoggedInUser == null
			? rsvpsGuest
			: Array.isArray(scholarshipApplicationForLoggedInUser.open_house_rsvps)
			? scholarshipApplicationForLoggedInUser.open_house_rsvps
			: [];

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<Fragment>
				<div className='pt-6 px-6 bg-black'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center space-x-2'>
							<div>
								<LogoButton homeHref={homeUrl} theme='dark' />
							</div>
						</div>
						<div className={cn('hidden lg:block')}>
							<AttendOpenHouseButton />
						</div>
					</div>
					<div className='h-36' />
					<p className='text-5xl font-normal text-gray-100 text-center'>
						Florida Visionary Scholarship
					</p>
					<p className='text-xl text-gray-400 font-extralight text-center mt-1.5'>
						$5,000 Merit Scholarships for Graduating Seniors from Florida
					</p>
					<div className='mt-10 lg:mt-5 text-center'>
						<AsyncLink
							className=''
							href={applicationUrl}
							target='_blank'
							isReady={isApplicationUrlReady}
						>
							{isApplicationUrlReady ? (
								<div
									className={cn(
										'bg-gray-100 hover:bg-brand-dark',
										'font-medium inline-block px-6 py-1.5 rounded text-black hover:text-white',
										'transition-colors',
									)}
								>
									{scholarshipApplicationForLoggedInUser == null
										? 'Start'
										: isScholarshipApplicationForLoggedInUserSubmitted
										? 'View'
										: 'Continue'}{' '}
									Application
								</div>
							) : (
								<>
									<div className='flex items-center justify-center space-x-2 min-w-16'>
										<div
											className={cn(
												'w-4 h-4 border-2 border-gray-200 rounded-full animate-spin',
												'border-t-brand border-r-brand border-b-brand',
											)}
										></div>
									</div>
								</>
							)}
						</AsyncLink>
					</div>
					<div className={cn('block lg:hidden')}>
						<div className='my-8 flex flex-col items-center'>
							<Separator className='!bg-gray-400 !w-16' />
						</div>
						<div className='flex flex-col items-center'>
							<AttendOpenHouseButton className='mx-auto' />
						</div>
					</div>
					<div className='h-24 lg:h-36' />
				</div>
				<div className='grid grid-cols-4 gap-8 pb-12 pt-10 px-6'>
					<div
						className={cn(
							'flex flex-col space-y-5 col-span-4',
							'lg:col-span-1',
						)}
					>
						{[
							{
								subtitle: 'February 28',
								title: 'Priority Deadline',
							},
							{
								subtitle: 'March 23',
								title: 'Final Deadline',
							},
							{
								subtitle: 'Wallot, Tampa-based AI Company',
								title: 'Sponsored by',
							},
						].map(({ subtitle, title }) => {
							return (
								<div key={title}>
									<p
										className={cn(
											'text-xs text-gray-500 uppercase font-medium',
										)}
									>
										{title}
									</p>
									<p className={cn('text-base text-gray-700 font-normal')}>
										{subtitle}
										<span className={cn('font-extralight text-sm')}>
											{title.includes('Deadline') ? ' at 11:59 PM EST' : ''}
										</span>
									</p>
								</div>
							);
						})}
					</div>
					<div className='col-span-4 pr-12 lg:pr-0 lg:col-span-3'>
						<div className='font-extralight flex flex-col space-y-3'>
							<p className={cn('text-2xl text-gray-800 font-semibold')}>
								A Commitment to Florida's Future
							</p>
							<p>
								<span className={cn('font-medium text-gray-800')}>
									Wallot is excited to announce that we are currently accepting
									applications for our inaugural Florida Visionary Scholarship
									Program.
								</span>{' '}
								<span className='font-extralight italic'>
									This program celebrates the inspirational academic, athletic,
									and extracurricular achievement of Florida students by
									awarding each recipient a yearly merit scholarship toward
									their college's cost of attendance.
								</span>
							</p>
							<p>
								All graduating Seniors from the state of Florida who are
								matriculating to an accredited 2-year or 4-year college this
								Fall are eligible to apply.
							</p>
							<p className={cn('text-2xl text-gray-800 font-semibold')}>
								Scholarship Awards
							</p>
							<p>
								<span className='font-medium text-sm underline'>
									Academic Achievement Award
								</span>
								<br />
								This scholarship honors students with outstanding academic
								records and commitment to learning. Recipients excel
								consistently and engage in rigorous coursework and innovative
								research.{' '}
								<span className='italic'>
									Applicant's GPA must be in the{' '}
									<span className='font-medium'>top 15%</span> of his/her class
									to apply.
								</span>
							</p>
							<p>
								<span className='font-medium text-sm underline'>
									Outstanding Student-Athlete Award
								</span>
								<br />
								This award honors students who excel academically and
								athletically. Recipients balance competitive spirit with
								scholastic diligence and demonstrate leadership under pressure.
								<span className='italic'>
									Applicants must have at minimum{' '}
									<span className='font-medium'>two years</span> of varsity
									athletic experience to apply.
								</span>
							</p>
							<p>
								<span className='font-medium text-sm underline'>
									Community Leadership Award
								</span>
								<br />
								This scholarship celebrates individuals who positively impact
								their communities through service and leadership. Applicants
								must show meaningful involvement and proactive civic engagement.
							</p>
							<p>
								<span className='font-medium text-sm underline'>
									Entrepreneurial Excellence Award
								</span>
								<br />
								This award honors students who drive innovation and turn ideas
								into impact. Candidates must show a forward-thinking mindset and
								seize opportunities for growth.
							</p>
							<p>The future of your higher education journey starts here.</p>
						</div>
						<div id='open-house-events' className='mt-6'>
							<p className={cn('text-2xl text-gray-800 font-semibold')}>
								Attend an Open House
							</p>
							<p className='mt-3'>
								<span className='font-extralight'>
									The Florida Visionary Scholarship program committee is hosting
									informal open house events both in-person and virtually to
									help applicants learn more about the scholarship and get to
									know our team. Spaces at each event are limited, so RSVP asap!
								</span>
							</p>
							<div className='overflow-hidden rounded-md border-[0.5px] border-gray-300 mt-3 w-full overflow-x-auto border-collapse bg-white shadow-sm'>
								<table className='min-w-full'>
									{/* Table Head */}
									<thead>
										<tr className='bg-slate-100 border-b border-b-gray-400'>
											{headers.map(({ Icon, title }) => (
												<th
													key={title}
													className='border-[0.5px] border-gray-300 px-3 py-2 text-left !min-w-36'
												>
													<div className='flex items-center space-x-1'>
														<div>
															<Icon className='text-gray-800 text-sm' />
														</div>
														<div>
															<p className='!font-light !text-sm'>{title}</p>
														</div>
													</div>
												</th>
											))}
										</tr>
									</thead>

									{/* Table Body */}
									<tbody>
										{events.map((event) => {
											const isRsvpd = rsvps.includes(event.lookup_key);
											const isOpen =
												isDialogOpenForLookupKey === event.lookup_key;
											return (
												<tr key={event.time} className='hover:bg-slate-50'>
													<td className='border-[0.5px] border-gray-300'>
														<Dialog
															open={isOpen}
															onOpenChange={(open) => {
																setIsDialogOpenForLookupKey(
																	open ? event.lookup_key : null,
																);
															}}
														>
															<DialogTrigger asChild disabled={isRsvpd}>
																<button
																	disabled={isRsvpd}
																	className={cn(
																		'font-light text-xs flex items-start text-left w-full h-full px-3 py-2',
																		isRsvpd
																			? 'cursor-default'
																			: 'cursor-pointer',
																		{
																			'flex-col': isRsvpd,
																			'space-x-1': !isRsvpd,
																			'space-y-1': isRsvpd,
																		},

																		// Remove rings
																		'focus:outline-none focus-visible:ring-none',
																	)}
																>
																	<div className='!text-left'>
																		<p className=''>
																			{event.address_title}
																			{isRsvpd ? '' : ' ·'}
																		</p>
																	</div>
																	<div className='flex items-center space-x-1'>
																		{isRsvpd && (
																			<div>
																				<GoCheckCircleFill className='text-brand-dark text-sm' />
																			</div>
																		)}
																		<div>
																			<p
																				className={cn('', {
																					'hover:underline': !isRsvpd,
																				})}
																			>
																				<span
																					className={cn('text-left', {
																						'text-brand-dark': !isRsvpd,
																						'font-semibold': isRsvpd,
																					})}
																				>
																					{isRsvpd ? 'Attending' : 'RSVP'}
																				</span>
																			</p>
																		</div>
																	</div>
																</button>
															</DialogTrigger>
															<DialogContent className='!max-h-[85vh] !overflow-y-auto'>
																<div
																	className={cn(
																		'flex items-center justify-center space-x-3',
																	)}
																>
																	<div>
																		<PlatformIcon
																			height={380}
																			size='lg'
																			srcMap={{
																				dark:
																					OPEN_GRAPH_CONFIG.siteBrandIconDarkMode ??
																					'',
																				light:
																					OPEN_GRAPH_CONFIG.siteBrandIconLightMode ??
																					'',
																			}}
																			width={2048}
																		/>
																	</div>
																</div>
																<DialogHeader className='mt-2'>
																	<DialogTitle className=''>
																		RSVP for our {event.metro_area} Open House
																	</DialogTitle>
																	<div className=''>
																		{[
																			{
																				subtitle: event.address_title,
																				title: 'Location',
																			},
																			{
																				subtitle: event.address,
																				title: 'Address',
																			},
																			{
																				subtitle: event.time,
																				title: 'Time',
																			},
																			event.type === 'In-person'
																				? {
																						subtitle: 'Casual',
																						title: 'Attire',
																				  }
																				: null,
																			event.type === 'In-person'
																				? {
																						subtitle:
																							'Light refreshments will be served',
																						title: 'Food',
																				  }
																				: null,
																		]
																			.filter(
																				(
																					row,
																				): row is Exclude<typeof row, null> =>
																					row !== null,
																			)
																			.map(({ subtitle, title }) => {
																				return (
																					<div className='mt-1 flex items-center space-x-1'>
																						<div className='min-w-20'>
																							<p className='!font-medium text-sm'>
																								{title}
																							</p>
																						</div>
																						<div>
																							<p className='!font-extralight !text-xs'>
																								{subtitle}
																							</p>
																						</div>
																					</div>
																				);
																			})}
																	</div>
																	<Separator className='!mt-6 !mb-2' />
																</DialogHeader>
																<DialogDescription className=''>
																	Fill in our RSVP form below to join the the
																	guest list. We'll email you a calendar invite
																	once your RSVP is confirmed.
																</DialogDescription>
																<form
																	onSubmit={
																		handleSubmit(
																			onSubmit(event.lookup_key),
																		) as () => void
																	}
																>
																	<div className='-mt-2'>
																		{rsvpFormFields.map((fieldProps) => (
																			<div
																				className={cn('pb-3', {
																					hidden:
																						fieldProps.fieldKey ===
																							'parent_emails' &&
																						!liveData.is_attending_with_parent,
																				})}
																				key={fieldProps.fieldKey}
																			>
																				<LiteFormFieldContainer
																					{...fieldProps}
																				/>
																			</div>
																		))}
																	</div>
																	{Boolean(
																		formState.errors['root']?.message,
																	) && (
																		<div className='mt-4'>
																			<LiteFormFieldError
																				fieldErrorMessage={
																					formState.errors['root']?.message ??
																					''
																				}
																			/>
																		</div>
																	)}
																	<div className='mt-2'>
																		<SubmitButton
																			textClassName='!font-light !text-sm'
																			isDisabled={isFormSubmitting}
																			isSubmitting={isFormSubmitting}
																			text='Confirm RSVP'
																		/>
																	</div>
																</form>
																<Separator className='!my-3' />
																<DialogFooter className=''>
																	<div className={cn('mt-1', 'lg:max-w-2xl')}>
																		<p className='font-semibold text-xs'>
																			Scheduling Conflicts
																		</p>
																		<p className='font-light text-[0.55rem]'>
																			While we have several open houses
																			scheduled, we understand that some
																			students may have scheduling conflicts on
																			account of prior obligations. If you are
																			unable to attend any of the scheduled open
																			houses, please email us at
																			scholarships@wallot.app with your
																			availability and a member of our team will
																			do our best schedule a time to meet with
																			you.
																		</p>
																	</div>
																</DialogFooter>
															</DialogContent>
														</Dialog>
													</td>
													<td className='border-[0.5px] border-gray-300 px-3 py-2'>
														<div className=''>
															<p className='font-light text-xs'>
																{event.address}
															</p>
														</div>
													</td>
													<td className='border-[0.5px] border-gray-300 px-3 py-2'>
														<div className=''>
															<p className='font-light text-xs'>{event.time}</p>
														</div>
													</td>
													<td className='border-[0.5px] border-gray-300 px-3 py-2'>
														<div className='bg-slate-200 px-1.5 py-0.5 rounded-lg w-fit'>
															<p className='font-extralight text-xs'>
																{event.metro_area}
															</p>
														</div>
													</td>
													<td className='border-[0.5px] border-gray-300 px-3 py-2'>
														<div
															className={cn('px-1.5 py-0.5 rounded-lg w-fit', {
																'bg-purple-200': event.type === 'In-person',
																'bg-blue-200': event.type === 'Virtual',
															})}
														>
															<p
																className={cn('font-extralight text-xs', {
																	'text-purple-900': event.type === 'In-person',
																	'text-blue-900': event.type === 'Virtual',
																})}
															>
																{event.type}
															</p>
														</div>
													</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						</div>
						<div className='mt-6 lg:w-1/2'>
							<p className={cn('text-2xl text-gray-800 font-semibold')}>FAQ</p>
							{[
								{
									question: 'Can I apply for more than one scholarship?',
									answer:
										'Yes, we recommend that you apply to any of the scholarships that you believe you are a good fit for. However, students can only be awarded at most one scholarship.',
								},
								{
									question:
										"The college that I'm attending is not in Florida. Can I still apply?",
									answer:
										'Yes, all graduating Seniors from Florida high schools are eligible to apply for the scholarship, regardless of the location of the college you plan to attend.',
								},
								{
									question: 'Which expenses may the scholarship be used for?',
									answer:
										'The scholarship may be used for any expenses related to college cost of attendance, including tuition, room and board, books, and other fees.',
								},
								{
									question: 'When is the deadline to apply?',
									answer: '',
									answersPrefix:
										'The following are the most important dates for the scholarship:',
									answers: [
										'The priority application window is open until 11:59pm EST on February 28th.',
										'Late applications will be accepted until our interview process ends March 23rd.',
									],
								},
								{
									question: 'When will I know if I have been selected?',
									answer: 'Final decisions will be delivered in mid-April.',
								},
							].map(
								({ question, answer, answers = [], answersPrefix = '' }) => {
									return (
										<div key={question} className='mb-2'>
											<p className={cn('font-medium italic')}>{question}</p>
											{answers.length === 0 && (
												<p className={cn('font-extralight')}>{answer}</p>
											)}
											{answers.length > 0 && (
												<div className={cn('font-extralight')}>
													<span className={cn('font-normal text-gray-800')}>
														{answersPrefix}
													</span>
													<ol
														className={cn(
															'list-decimal list-inside font-extralight',
														)}
													>
														{answers.map((answer) => (
															<li key={answer} className='text-sm'>
																{answer}
															</li>
														))}
													</ol>
												</div>
											)}
										</div>
									);
								},
							)}
						</div>
						<div className='mt-6 font-extralight'>
							<p className={cn('text-2xl text-gray-800 font-semibold')}>
								Apply
							</p>
							<p>
								The application form for the scholarship can be found{' '}
								<Link href={applicationUrl} target='_blank'>
									<span
										className='font-medium underline decoration-dotted underline-offset-2 hover:underline hover:cursor-pointer'
										tabIndex={0}
									>
										here
									</span>
								</Link>
								.
							</p>
						</div>
					</div>
				</div>
				<div className='p-6 bg-black text-gray-400 flex items-center justify-between'>
					<div>
						<p className={cn('font-extralight p-2 text-white text-sm')}>
							© 2025 Wallot
						</p>
					</div>
					<div>
						<Link
							className=''
							href='mailto:scholarships@wallot.app'
							target='_blank'
						>
							<div className={cn('font-extralight p-2 text-white text-sm')}>
								Contact Us
							</div>
						</Link>
					</div>
				</div>
			</Fragment>
		</PageComponent>
	);
};

function AttendOpenHouseButton({ className = '' }: BaseComponent) {
	return (
		<button
			className={className}
			onClick={() => {
				if (!isDomAvailable()) return;

				// scroll smoothly to the component with ID open-house-events
				document
					?.getElementById('open-house-events')
					?.scrollIntoView({ behavior: 'smooth' });
			}}
		>
			<div className='p-[1.5px] bg-gradient-to-r from-brand-dark via-pink-600 to-red-800 animate-gradient-rotate bg-[length:200%_200%] rounded w-fit cursor-pointer'>
				<div className='bg-black rounded flex items-center space-x-1 py-2 px-4 w-fit'>
					<div>
						<PiSparkleLight className='text-white text-sm' />
					</div>
					<div>
						<p className={cn('font-extralight text-white text-sm')}>
							Attend our Next Open House
						</p>
					</div>
				</div>
			</div>
		</button>
	);
}

export default Page;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_SITE__/SCHOLARSHIPS' as const;

// Route Query Params Type
type RouteQueryParams = HomeSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

export const getStaticProps: GetStaticProps<PageStaticProps> = () => {
	// Route Static Props
	const ROUTE_STATIC_PROPS: PageStaticProps = {
		routeStaticId: ROUTE_STATIC_ID,
		title: 'Florida Visionary Scholarship',
	};
	return Promise.resolve({
		props: ROUTE_STATIC_PROPS,
	});
};
