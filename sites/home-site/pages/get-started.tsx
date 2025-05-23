import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	PageStaticProps,
	PageProps,
	Page as PageComponent,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import {
	ActivateUserParams,
	HomeSiteRouteQueryParams,
	activateUserSchema,
	activateUserSchemaFieldSpecByFieldKey,
	getSsoSiteRoute,
} from '@wallot/js';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from 'ergonomic-react/src/features/data/hooks/useYupValidationResolver';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { defaultGeneralizedFormDataTransformationOptions } from 'ergonomic-react/src/features/data/types/GeneralizedFormDataTransformationOptions';
import { useActivateUserMutation } from '@wallot/react/src/features/users';
import { OnboardingCard } from '@wallot/react/src/components/OnboardingCard';
import { SubmitButton } from '@wallot/react/src/components/SubmitButton';
import { useAuthenticatedRouteRedirect } from 'ergonomic-react/src/features/authentication/hooks/useAuthenticatedRouteRedirect';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { LiteFormFieldProps } from 'ergonomic-react/src/features/data/types/LiteFormFieldProps';
import { LiteFormFieldContainer } from 'ergonomic-react/src/features/data/components/LiteFormFieldContainer';
import { LiteFormFieldError } from 'ergonomic-react/src/features/data/components/LiteFormFieldError';

const Page: NextPage<PageStaticProps> = (props) => {
	try {
		// ==== Hooks ==== //

		// Site origins
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

		// Router
		const router = useRouter();

		// Toaster
		const { toast } = useToast();

		// Form Resolver
		const resolver = useYupValidationResolver(
			activateUserSchema,
			defaultGeneralizedFormDataTransformationOptions,
		);

		// Form
		const initialFormData =
			activateUserSchema.getDefault() as ActivateUserParams;
		const { control, formState, handleSubmit, reset, setError } =
			useForm<ActivateUserParams>({
				defaultValues: initialFormData,
				resolver,
				shouldUnregister: false,
			});

		// Mutation
		const { mutate: activateUser, isLoading: isActivateUserRunning } =
			useActivateUserMutation({
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
				onSuccess: async ({ redirect_uri: redirectUri }) => {
					// Show success toast
					toast({
						title: 'Success',
						description: 'Personalizing your experience...',
					});

					// Redirect to next page
					await router.push(redirectUri);
				},
			});

		// ==== Constants ==== //

		// Router Query
		const query: RouteQueryParams = router?.query ?? {};

		// Router Query Param Values
		const _ = query;
		_;

		// Form
		const formStatus =
			formState.isSubmitting || isActivateUserRunning ? 'running' : 'idle';
		const isFormSubmitting = formStatus === 'running';
		const fields: LiteFormFieldProps<ActivateUserParams>[] = [
			{
				fieldKey: 'age_range' as const,
				renderTooltipContent: () => (
					<div>
						This helps us identify stocks with appropriate liquidation horizons
						and volatility levels
					</div>
				),
			},
			{
				fieldKey: 'capital_level' as const,
			},
			{
				fieldKey: 'investing_goals' as const,
			},
			{
				fieldKey: 'risk_preference' as const,
				renderTooltipContent: () => (
					<div>
						This helps us balance risk with potential returns when recommending
						a stock
					</div>
				),
			},
		].map(({ fieldKey, renderTooltipContent }) => ({
			control,
			fieldErrors: formState.errors,
			fieldKey,
			fieldSpec: activateUserSchemaFieldSpecByFieldKey[fieldKey],
			hideRequiredIndicator: true,
			initialFormData,
			isSubmitting: isFormSubmitting,
			operation: 'create',
			renderTooltipContent,
			setError: (message) => setError(fieldKey, { message }),
		}));

		// ==== Constants ==== //

		// Runtime Route ID
		const ROUTE_RUNTIME_ID = props.routeStaticId;

		// Runtime Page Props
		const pageProps: PageProps = {
			...props,
			routeId: ROUTE_RUNTIME_ID,
		};

		// ==== Functions ==== //

		// Form Submit Handler
		const onSubmit = (data: ActivateUserParams) => {
			console.log('Activating user with following data:', data);
			toast({
				title: 'Saving your preferences',
				description: 'This may take a few moments.',
			});
			activateUser(data);
		};

		// ==== Render ==== //
		return (
			<PageComponent {...pageProps}>
				<div className={cn('min-h-screen relative', 'px-8 pt-24', 'pb-16')}>
					<OnboardingCard
						step={1}
						subtitle='This helps our AI personalize your portfolio recommendations'
						title="Let's get to know each other"
					>
						<form onSubmit={handleSubmit(onSubmit) as () => void}>
							<div>
								{fields.map((fieldProps) => (
									<LiteFormFieldContainer
										key={fieldProps.fieldKey}
										{...fieldProps}
									/>
								))}
							</div>
							<div className='mt-4 text-right w-full'>
								<SubmitButton
									className='w-full'
									isSubmitting={isFormSubmitting}
								/>
							</div>
							{Boolean(formState.errors['root']?.message) && (
								<div className='mt-4'>
									<LiteFormFieldError
										fieldErrorMessage={formState.errors['root']?.message ?? ''}
									/>
								</div>
							)}
						</form>
					</OnboardingCard>
				</div>
			</PageComponent>
		);
	} catch (err) {
		console.error('Error in get started page', err);
		return null;
	}
};

export default Page;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_SITE__/GET_STARTED' as const;

// Route Query Params Type
type RouteQueryParams = HomeSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

export const getStaticProps: GetStaticProps<PageStaticProps> = () => {
	// Route Static Props
	const ROUTE_STATIC_PROPS: PageStaticProps = {
		routeStaticId: ROUTE_STATIC_ID,
		title: 'Activate Your Account',
	};
	return Promise.resolve({
		props: ROUTE_STATIC_PROPS,
	});
};
