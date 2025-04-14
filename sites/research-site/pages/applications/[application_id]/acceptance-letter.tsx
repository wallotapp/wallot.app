import { Skeleton } from 'ergonomic-react/src/components/ui/skeleton';
import { Separator } from 'ergonomic-react/src/components/ui/separator';
import { GoCheckCircleFill, GoChevronLeft, GoCircle } from 'react-icons/go';
import { SubmitButton } from '@wallot/react/src/components/SubmitButton';
import { LiteFormFieldProps } from 'ergonomic-react/src/features/data/types/LiteFormFieldProps';
import { LiteFormFieldContainer } from 'ergonomic-react/src/features/data/components/LiteFormFieldContainer';
import { LiteFormFieldError } from 'ergonomic-react/src/features/data/components/LiteFormFieldError';
import { PageHeader } from '@wallot/react/src/components/PageHeader';
import { Fragment, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	PageStaticProps,
	PageProps,
	Page as PageComponent,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import {
	AcceptResearchSeatFormDataParams,
	acceptResearchSeatFormDataSchema,
	AcceptResearchSeatFormDataField,
	ResearchSiteRouteQueryParams,
	acceptResearchSeatFormDataSchemaFieldSpecByFieldKey,
} from '@wallot/js';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { PageActionHeader } from '@wallot/react/src/components/PageActionHeader';
import { GeneralizedError } from 'ergonomic';
import { useForm } from 'react-hook-form';
import { defaultGeneralizedFormDataTransformationOptions } from 'ergonomic-react/src/features/data/types/GeneralizedFormDataTransformationOptions';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import { useYupValidationResolver } from 'ergonomic-react/src/features/data/hooks/useYupValidationResolver';
import { useRetrieveAcceptanceLetter } from '@wallot/react/src/features/scholarshipApplications/hooks/useRetrieveAcceptanceLetter';
import { useAcceptResearchSeatMutation } from '@wallot/react/src/features/scholarshipApplications/hooks/useAcceptResearchSeatMutation';
import Link from 'next/link';
import Image from 'next/image';
import { FiDownloadCloud } from 'react-icons/fi';

const mobileThumbnailFall =
	'https://firebasestorage.googleapis.com/v0/b/app-wallot-production.appspot.com/o/scholarships%2FWallot%20Research%20Fellowship%20Orientation%20Guide.png?alt=media&token=f8ba4a90-9274-4ffb-a6f8-b029e2c6a19c';
const mobileThumbnailSummer =
	'https://firebasestorage.googleapis.com/v0/b/app-wallot-production.appspot.com/o/scholarships%2FSHARP%20Orientation%20Guide.png?alt=media&token=d73adb7c-b622-448e-9ea9-1d76b53c394c';

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID =
	'RESEARCH_SITE__/APPLICATIONS/[APPLICATION_ID]/ACCEPTANCE_LETTER' as const;

// Route Static Props
const ROUTE_STATIC_PROPS: PageStaticProps = {
	routeStaticId: ROUTE_STATIC_ID,
	title: 'Acceptance Letter',
};

// Route Query Params Type
type RouteQueryParams = ResearchSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

const Page: NextPage = () => {
	// ==== State ==== //
	const [hasReadAgreement, setHasReadAgreement] = useState<boolean>(false);

	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// ==== Constants ==== //

	// Router Query
	const query = (router?.query as RouteQueryParams) ?? {};

	// Router Query Param Values
	const { application_id, client_verification } = query;

	// Runtime Route ID
	const ROUTE_RUNTIME_ID = ROUTE_STATIC_ID.replace(
		'[APPLICATION_ID]',
		application_id || '',
	);

	// Runtime Page Props
	const pageProps: PageProps = {
		...ROUTE_STATIC_PROPS,
		routeId: ROUTE_RUNTIME_ID,
	};

	// Toaster
	const { toast } = useToast();

	// Form Resolver
	const formDataTransformationOptions =
		defaultGeneralizedFormDataTransformationOptions;
	const resolver = useYupValidationResolver(
		acceptResearchSeatFormDataSchema,
		formDataTransformationOptions,
	);

	// Acceptance Letter
	const {
		data: acceptanceLetter,
		refetch: refetchAcceptanceLetter,
		isLoading: isAcceptanceLetterLoading,
	} = useRetrieveAcceptanceLetter({
		client_verification,
	});

	const documentUrl =
		acceptanceLetter?.research_seat_signed_acceptance_letter ||
		acceptanceLetter?.research_seat_acceptance_letter ||
		'';
	const mobileThumbnail = acceptanceLetter?.research_seat_cohort
		? acceptanceLetter?.research_seat_cohort === 'fall'
			? mobileThumbnailFall
			: mobileThumbnailSummer
		: '';
	const isAcceptanceLetterReady =
		acceptanceLetter != null &&
		Boolean(documentUrl) &&
		Boolean(mobileThumbnail);
	const isAcceptanceLetterSigned =
		isAcceptanceLetterReady &&
		Boolean(acceptanceLetter.research_seat_signed_acceptance_letter);
	const isFallCohort = acceptanceLetter?.research_seat_cohort === 'fall';

	// Form
	const defaultFormData =
		acceptResearchSeatFormDataSchema.getDefault() as AcceptResearchSeatFormDataParams;
	const {
		control,
		formState,
		handleSubmit,
		// reset,
		setError,
		// setValue, watch
	} = useForm<AcceptResearchSeatFormDataParams>({
		resolver,
		shouldUnregister: false,
	});
	// const liveData = watch();
	const formStateErrorValues = Object.values(formState.errors ?? {});
	const formStateErrorMessages = formStateErrorValues
		.flatMap((x) => (x?.message ? [String(x.message)] : []))
		.join('\n');

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
	const onMutationSuccess = async () => {
		// Refetch the queries
		await refetchAcceptanceLetter();

		// Show success toast
		toast({
			title: 'Success',
			description: 'Your e-signatures have been saved',
		});
	};

	// Save mutation
	const { mutate: acceptResearchSeat, isLoading: isAcceptResearchSeatRunning } =
		useAcceptResearchSeatMutation(application_id ?? null, {
			onError: onMutationError,
			onSuccess: onMutationSuccess,
		});

	// Form
	const formStatus =
		formState.isSubmitting || isAcceptResearchSeatRunning ? 'running' : 'idle';
	const isFormSubmitting = formStatus === 'running';
	const isFormDisabled =
		isAcceptanceLetterLoading || isFormSubmitting || isAcceptanceLetterSigned;
	const getLiteFormFieldProps = (
		fieldKey: AcceptResearchSeatFormDataField,
	): LiteFormFieldProps<AcceptResearchSeatFormDataParams> => ({
		control,
		fieldErrors: formState.errors,
		fieldKey,
		fieldSpec: acceptResearchSeatFormDataSchemaFieldSpecByFieldKey[fieldKey],
		initialFormData: defaultFormData,
		isSubmitting: isFormDisabled,
		operation: 'update',
		renderTooltipContent: undefined,
		setError: (message) => setError(fieldKey, { message }),
	});
	const fields = (
		[
			'student_name',
			'parent_name',
			'parent_email',
			'parent_relationship_to_student',
		] as const
	).map(getLiteFormFieldProps);

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<div className={cn('flex flex-col min-h-screen min-w-screen relative')}>
				<PageHeader showHomeLink={false} />
				<PageActionHeader />
				<div
					className={cn(
						'min-h-[95vh] w-full',
						'py-36 px-6',
						'lg:py-36 lg:px-28',
					)}
				>
					{isAcceptanceLetterReady ? (
						<div
							className={cn(
								'mt-8 flex',
								'flex-col lg:flex-row',
								'space-y-8 lg:space-y-0',
								'lg:space-x-8',
							)}
						>
							<div className={cn('lg:max-w-lg')}>
								<div>
									<p className='font-semibold text-xl'>
										Congratulations! Let's Confirm Your Spot
										{isFallCohort ? ' in our Fall 2025 Cohort' : ''}.
									</p>
									<p className='font-light text-sm mt-1'>
										It's our distinct pleasure to welcome you to{' '}
										<span className='font-semibold'>
											{isFallCohort
												? 'the Wallot Research Fellowship'
												: 'SHARP (Summer Honors Academic Research Program)'}
										</span>
										, {isFallCohort ? 'our' : "Wallot's"} flagship research
										opportunity for graduating seniors! If you would like to
										accept your invitation to participate in the program, please
										review our Orientation Guide with your parents asap. This
										document details the{' '}
										{isFallCohort ? 'Fall semester' : 'Summer'} packing list,
										housing logistics and community rules for the program. If
										you have any questions, feel free to{' '}
										<Link
											className='text-brand-dark font-semibold'
											href='mailto:kamar.mack@wallot.app'
											target='_blank'
										>
											contact our team
										</Link>
										.
									</p>
								</div>
								<Separator className='my-6' />
								<div className='flex justify-start space-x-5 mt-4'>
									<div className='w-16 h-2 rounded-md bg-brand'></div>
									<div
										className={cn(
											'w-16 h-2 rounded-md',
											hasReadAgreement || isAcceptanceLetterSigned
												? 'bg-brand'
												: 'bg-gray-200',
										)}
									></div>
								</div>
								<div
									className={cn(
										hasReadAgreement || isAcceptanceLetterSigned
											? 'hidden'
											: 'mt-6',
									)}
								>
									<div className='max-w-sm'>
										<p className='font-light text-xs'>
											Once you have reviewed the orientation guide with a parent
											or guardian, continue to the next step.
										</p>
									</div>
									<div
										className={cn(
											'mt-2 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0',
										)}
									>
										{[
											{
												isSelected: hasReadAgreement,
												subtitle:
													"I'm ready to accept my invitation to the program",
												title: 'Continue',
											},
										].map(({ isSelected, subtitle, title }) => {
											return (
												<button
													className={cn(
														'flex items-center space-x-3 px-3 py-2',
														isSelected ? 'bg-gray-200' : 'bg-white',
														'border border-gray-300 rounded-md',
														'transition duration-200 ease-in-out hover:bg-gray-100',
													)}
													key={title}
													type='button'
													onClick={() => setHasReadAgreement(true)}
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
															<p className='font-semibold text-sm'>{title}</p>
														</div>
														<div className='lg:max-w-44'>
															<p className='font-light text-xs'>{subtitle}</p>
														</div>
													</div>
												</button>
											);
										})}
									</div>
								</div>
								<div
									className={cn(
										hasReadAgreement || isAcceptanceLetterSigned
											? 'mt-6'
											: 'hidden',
									)}
								>
									{isAcceptanceLetterSigned ? (
										<Fragment>
											<div className='border border-gray-400 py-3 px-4 rounded-md w-fit lg:max-w-sm'>
												<div className='flex items-center space-x-2'>
													<GoCheckCircleFill className='text-brand-dark' />
													<p className='font-semibold text-base'>Accepted</p>
												</div>
												<div className='mt-1'>
													<p className='font-light text-xs'>
														Your seat for the program has been confirmed! Please
														check your email for additional instructions and
														communcations from our team.
													</p>
												</div>
											</div>
										</Fragment>
									) : (
										<Fragment>
											<button
												className=''
												onClick={() => setHasReadAgreement(false)}
											>
												<div className='flex items-center space-x-1'>
													<GoChevronLeft className='text-xs text-gray-500' />
													<p className='font-medium text-xs text-gray-500'>
														Back
													</p>
												</div>
											</button>
											<form
												onSubmit={handleSubmit((formData) => {
													if (!client_verification) {
														toast({
															title: 'Invalid verification code.',
															description:
																'Please check your email for the correct link to sign your acceptance letter.',
														});
														return;
													}
													const data = {
														...formData,
														client_verification,
													};

													console.log(
														'Saving e-signatures with following data:',
														data,
													);
													toast({
														title: 'Saving your e-signatures',
														description: 'This may take a few moments...',
													});

													acceptResearchSeat(data);
												})}
											>
												{fields.map((fieldProps) => (
													<LiteFormFieldContainer
														key={fieldProps.fieldKey}
														{...fieldProps}
													/>
												))}
												<SubmitButton
													className='w-full lg:w-1/2 mt-4 !bg-slate-100 !border-slate-300 !border'
													textClassName='!text-brand-dark'
													isSubmitting={isFormSubmitting}
													text='Confirm Agreement'
												/>
												{Boolean(formStateErrorMessages) && (
													<div className='mt-2.5'>
														<LiteFormFieldError
															fieldErrorMessage={formStateErrorMessages}
														/>
													</div>
												)}
											</form>
										</Fragment>
									)}
								</div>
							</div>
							<Fragment>
								{/* Mobile: tappable thumbnail that downloads the PDF */}
								<a
									href={documentUrl}
									download='SHARP Acceptance Letter.pdf'
									target='_blank'
									rel='noopener noreferrer'
									className={cn('block lg:hidden relative')}
									style={{ WebkitOverflowScrolling: 'touch' }}
								>
									<Image
										src={mobileThumbnail}
										alt='Tap to view your SHARP Acceptance Letter'
										className='rounded-lg'
										layout='responsive'
										height={1920}
										width={1080}
										priority
									/>
									{/* Dark overlay */}
									<div className='absolute top-0 left-0 w-full h-full bg-black opacity-[15%] rounded-xl cursor-pointer z-[5]' />
									{/* Download button/icon */}
									<button
										className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10'
										aria-label='Download Acceptance Letter'
									>
										<FiDownloadCloud className='text-7xl' />
									</button>
								</a>

								<div
									className={cn(
										'hidden lg:block rounded-lg h-screen overflow-auto w-full',
									)}
									style={{ WebkitOverflowScrolling: 'touch' }}
								>
									<iframe
										src={getAcceptanceLetterDownloadUrl(documentUrl)}
										title='PDF Document'
										className={cn('w-full h-full border-none')}
										allowFullScreen
									/>
								</div>
							</Fragment>
						</div>
					) : (
						<div>
							<div className='flex space-x-8'>
								<div className='flex-1'>
									<Skeleton className='bg-slate-300 h-28' />
									<Skeleton className={cn('bg-slate-300 h-[20vh] mt-8')} />
								</div>
								<Skeleton
									className={cn('bg-slate-300 h-[80vh]', 'flex-[2_2_0%]')}
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</PageComponent>
	);
};

export default Page;

function getAcceptanceLetterDownloadUrl(url: string) {
	return url + '#view=fitH&navpanes=0'; // toolbar=0& is also option
}
