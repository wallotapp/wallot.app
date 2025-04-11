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
	const isAcceptanceLetterSigned =
		acceptanceLetter != null &&
		Boolean(acceptanceLetter.research_seat_signed_acceptance_letter);

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

	const documentUrl =
		acceptanceLetter?.research_seat_signed_acceptance_letter ||
		acceptanceLetter?.research_seat_acceptance_letter ||
		'';

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
								<p className='font-semibold text-xl'>What is Lorem Ipsum?</p>
								<p className='font-light text-sm'>
									What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
									printing and typesetting industry. Lorem Ipsum has been the
									industry's standard dummy text ever since the 1500s, when an
									unknown printer took a galley of type and scrambled it to make
									a type specimen book. It has survived not only five centuries,
									but also the leap into electronic typesetting, remaining
									essentially unchanged.
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
											subtitle: "I'm ready to accept my seat in the program",
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
												<p className='font-semibold text-base'>
													Accepted
												</p>
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
						{Boolean(documentUrl) ? (
							<div className={cn('rounded-lg w-full')}>
								<iframe
									src={getAcceptanceLetterDownloadUrl(documentUrl)}
									title='PDF Document'
									className={cn('rounded-lg w-full h-screen')}
									allowFullScreen
								/>
							</div>
						) : (
							<div>Loading...</div>
						)}
					</div>
				</div>
			</div>
		</PageComponent>
	);
};

export default Page;

function getAcceptanceLetterDownloadUrl(url: string) {
	return url + '#navpanes=0'; // toolbar=0& is also option
}
