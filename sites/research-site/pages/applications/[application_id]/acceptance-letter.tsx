import { PageHeader } from '@wallot/react/src/components/PageHeader';
import { useState } from 'react';
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
	AcceptResearchSeatFormDataFieldEnum,
} from '@wallot/js';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { PageActionHeader } from '@wallot/react/src/components/PageActionHeader';
import { GeneralizedError } from 'ergonomic';
import { useForm } from 'react-hook-form';
import { defaultGeneralizedFormDataTransformationOptions } from 'ergonomic-react/src/features/data/types/GeneralizedFormDataTransformationOptions';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import { LiteFormFieldProps } from 'ergonomic-react/src/features/data/types/LiteFormFieldProps';
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
	const [hasReadAgreement, setHasReadAgreement] = useState(false);

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
	const { control, formState, handleSubmit, reset, setError, setValue, watch } =
		useForm<AcceptResearchSeatFormDataParams>({
			resolver,
			shouldUnregister: false,
		});
	const liveData = watch();
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
	const fields = AcceptResearchSeatFormDataFieldEnum.arr.map(
		getLiteFormFieldProps,
	);

	// Form Submit Handler
	const onSubmit = handleSubmit((data) => {
		console.log('Saving e-signatures with following data:', data);
		toast({
			title: 'Saving your e-signatures',
			description: 'This may take a few moments...',
		});

		acceptResearchSeat(data);
	});

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
							'space-y-4 lg:space-y-0',
							'lg:space-x-4',
						)}
					>
						<div className={cn('lg:max-w-md')}>
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
							<div>
								<p>I've read the entire agreement.</p>
							</div>
							<div>
								<p>Yes</p>
								<p>I'm ready to sign</p>
							</div>
							<div>
								<form>
									<input placeholder='Full name' />
									<input placeholder='Parent name' />
									<input placeholder='Relationship' />
									<button>Submit</button>
								</form>
							</div>
						</div>
						<div className={cn('rounded-lg w-full')}>
							<iframe
								src={getAcceptanceLetterDownloadUrl()}
								title='PDF Document'
								className={cn('rounded-lg w-full h-screen')}
								allowFullScreen
							/>
						</div>
					</div>
				</div>
			</div>
		</PageComponent>
	);
};

export default Page;

function getAcceptanceLetterDownloadUrl() {
	return (
		'https://firebasestorage.googleapis.com/v0/b/app-wallot-production.appspot.com/o/_temp-pdfs%2Fhello-world.pdf?alt=media&token=40cb7ed5-3fe3-422d-b61b-1408dd7e61b7' +
		'#toolbar=0&navpanes=0'
	);
}
