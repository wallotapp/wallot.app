import { useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { signInWithCustomToken } from 'firebase/auth';
import { firebaseAuthInstance as auth } from 'ergonomic-react/src/lib/firebase';
import {
	PageStaticProps,
	PageProps,
	Page as PageComponent,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import {
	RegisterUserParams,
	SsoSiteRouteQueryParams,
	getSsoSiteRoute,
	passwordRules,
	registerUserFormDataSchema,
	registerUserFormDataSchemaFieldSpecByFieldKey,
	usernameRules,
} from '@wallot/js';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from 'ergonomic-react/src/features/data/hooks/useYupValidationResolver';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { defaultGeneralizedFormDataTransformationOptions } from 'ergonomic-react/src/features/data/types/GeneralizedFormDataTransformationOptions';
import { useRegisterUserMutation } from '@wallot/react/src/features/users';
import { OnboardingCard } from '@wallot/react/src/components/OnboardingCard';
import { ChangeAuthenticationRoute } from '@wallot/react/src/components/ChangeAuthenticationRoute';
import { AuthenticationLegalNotice } from '@wallot/react/src/components/AuthenticationLegalNotice';
import { SubmitButton } from '@wallot/react/src/components/SubmitButton';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { useGuestRouteRedirect } from 'ergonomic-react/src/features/authentication/hooks/useGuestRouteRedirect';
import { LiteFormFieldProps } from 'ergonomic-react/src/features/data/types/LiteFormFieldProps';
import { LiteFormFieldContainer } from 'ergonomic-react/src/features/data/components/LiteFormFieldContainer';
import { LiteFormFieldError } from 'ergonomic-react/src/features/data/components/LiteFormFieldError';

const Page: NextPage<PageStaticProps> = (props) => {
	// ==== State ==== //
	const [
		shouldPauseFirebaseAuthRedirects,
		setShouldPauseFirebaseAuthRedirects,
	] = useState(false);

	// ==== Hooks ==== //

	// Site origins
	const siteOriginByTarget = useSiteOriginByTarget();

	// Auth
	useGuestRouteRedirect({
		shouldPauseFirebaseAuthRedirects,
		welcomeSiteOrigin: siteOriginByTarget.HOME_SITE,
	});

	// Router
	const router = useRouter();

	// Toaster
	const { toast } = useToast();

	// Form Resolver
	const resolver = useYupValidationResolver(
		registerUserFormDataSchema,
		defaultGeneralizedFormDataTransformationOptions,
	);

	// Form
	const initialFormData = registerUserFormDataSchema.getDefault();
	const { control, formState, handleSubmit, reset, setError } =
		useForm<RegisterUserParams>({
			defaultValues: initialFormData,
			resolver,
			shouldUnregister: false,
		});

	// Mutation
	const { mutate: registerUser, isLoading: isRegisterUserRunning } =
		useRegisterUserMutation({
			onError: ({ error: { message } }) => {
				// Show the error message
				toast({
					title: 'Error',
					description: message,
				});
				setError('root', {
					type: 'manual',
					message: 'An error occurred: ' + (message || 'Please try again.'),
				});
			},
			onSuccess: async ({
				custom_token: customToken,
				redirect_uri: redirectUri,
			}) => {
				try {
					// Pause onAuthStateChanged listener
					setShouldPauseFirebaseAuthRedirects(true);

					// Wait 1 second
					await new Promise((resolve) => setTimeout(resolve, 1000));

					// Log in user
					await signInWithCustomToken(auth, customToken);

					// Redirect to next page
					await router.push(redirectUri);
					return;
				} catch (err) {
					console.error('Error:', err);
					toast({
						title: 'Error',
						description: 'An error occurred. Please try again.',
					});

					// Reset form
					reset();

					// Set error
					setError('root', {
						type: 'manual',
						message: 'An error occurred. Please try again.',
					});
				}
			},
		});

	// ==== Constants ==== //

	// Router Query
	const query: RouteQueryParams = router?.query ?? {};

	// Router Query Param Values
	const { dest } = query;

	// Login Route
	const loginRoute = getSsoSiteRoute({
		routeStaticId: 'SSO_SITE__/LOGIN',
		origin: null,
		includeOrigin: false,
		queryParams: { dest },
	});

	// Form
	const formStatus =
		formState.isSubmitting || isRegisterUserRunning ? 'running' : 'idle';
	const isFormSubmitting = formStatus === 'running';
	const fields: LiteFormFieldProps<RegisterUserParams>[] = [
		{
			fieldKey: 'username' as const,
			renderTooltipContent: () => (
				<div>
					<ul className='text-xs list-disc list-inside'>
						{usernameRules.map((rule) => (
							<li key={rule}>{rule}</li>
						))}
					</ul>
				</div>
			),
		},
		{
			fieldKey: 'email' as const,
		},
		{
			fieldKey: 'password' as const,
			renderTooltipContent: () => (
				<div>
					<ul className='text-xs list-disc list-inside'>
						{passwordRules.map((rule) => (
							<li key={rule}>{rule}</li>
						))}
					</ul>
				</div>
			),
		},
	].map(({ fieldKey, renderTooltipContent }) => ({
		control,
		fieldErrors: formState.errors,
		fieldKey,
		fieldSpec: registerUserFormDataSchemaFieldSpecByFieldKey[fieldKey],
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

	// Copy edit
	const onboardingFlow =
		dest == null
			? 'normal'
			: dest.includes('scholarship')
			? 'scholarship'
			: 'normal';
	const subtitle = {
		normal: 'Enter a username, email and password to create a free account',
		scholarship: 'Enter a username, email and password to continue',
	}[onboardingFlow];
	const title = {
		normal: 'Welcome to the community',
		scholarship: "Let's begin your scholarship application",
	}[onboardingFlow];

	// ==== Functions ==== //

	// Form Submit Handler
	const onSubmit = (data: RegisterUserParams) => {
		console.log('Registering user with following data:', data);
		toast({
			title: 'Creating your account...',
			description: 'This may take a few moments.',
		});
		const redirectURI = dest ? decodeURIComponent(dest) : null;
		registerUser({ ...data, redirect_uri: redirectURI });
	};

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<div className={cn('min-h-screen relative', 'px-8 pt-24')}>
				<OnboardingCard step={0} subtitle={subtitle} title={title}>
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
						<AuthenticationLegalNotice />
					</form>
				</OnboardingCard>
				<ChangeAuthenticationRoute
					oppositeRoute={loginRoute}
					text='Have an account? Login'
				/>
			</div>
		</PageComponent>
	);
};

export default Page;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'SSO_SITE__/REGISTER' as const;

// Route Query Params Type
type RouteQueryParams = SsoSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

export const getStaticProps: GetStaticProps<PageStaticProps> = () => {
	// Route Static Props
	const ROUTE_STATIC_PROPS: PageStaticProps = {
		routeStaticId: ROUTE_STATIC_ID,
		title: 'Create an Account',
	};
	return Promise.resolve({
		props: ROUTE_STATIC_PROPS,
	});
};
