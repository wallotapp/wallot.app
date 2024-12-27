import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { firebaseAuthInstance as auth } from 'ergonomic-react/src/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
	PageStaticProps,
	PageProps,
	Page as PageComponent,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import {
	LoginUserParams,
	SsoSiteRouteQueryParams,
	getSsoSiteRoute,
	passwordRules,
	loginUserSchema,
	loginUserSchemaFieldSpecByFieldKey,
	getHomeSiteRoute,
} from '@wallot/js';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from 'ergonomic-react/src/features/data/hooks/useYupValidationResolver';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { defaultGeneralizedFormDataTransformationOptions } from 'ergonomic-react/src/features/data/types/GeneralizedFormDataTransformationOptions';
import { OnboardingCard } from '@wallot/react/src/components/OnboardingCard';
import { ChangeAuthenticationRoute } from '@wallot/react/src/components/ChangeAuthenticationRoute';
import { SubmitButton } from '@wallot/react/src/components/SubmitButton';
import { AuthenticationLegalNotice } from '@wallot/react/src/components/AuthenticationLegalNotice';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { useGuestRouteRedirect } from 'ergonomic-react/src/features/authentication/hooks/useGuestRouteRedirect';
import { LiteFormFieldProps } from 'ergonomic-react/src/features/data/types/LiteFormFieldProps';
import { LiteFormFieldContainer } from 'ergonomic-react/src/features/data/components/LiteFormFieldContainer';
import { LiteFormFieldError } from 'ergonomic-react/src/features/data/components/LiteFormFieldError';
import { createFirebaseAuthCustomToken } from '@wallot/react/src/features/users/api/createFirebaseAuthCustomToken';
import { GeneralizedError } from 'ergonomic';
import { useState } from 'react';

const Page: NextPage<PageStaticProps> = (props) => {
	// ==== State ==== //
	const [isLoginUserRunning, setIsLoginUserRunning] = useState(false);

	// ==== Hooks ==== //

	// Site origins
	const siteOriginByTarget = useSiteOriginByTarget();

	// Auth
	useGuestRouteRedirect({
		welcomeSiteOrigin: siteOriginByTarget.HOME_SITE,
	});

	// Router
	const router = useRouter();

	// Toaster
	const { toast } = useToast();

	// Form Resolver
	const resolver = useYupValidationResolver(
		loginUserSchema,
		defaultGeneralizedFormDataTransformationOptions,
	);

	// Form
	const initialFormData = loginUserSchema.getDefault();
	const { control, formState, handleSubmit, reset, setError } =
		useForm<LoginUserParams>({
			defaultValues: initialFormData,
			resolver,
			shouldUnregister: false,
		});

	// ==== Constants ==== //

	// Router Query
	const query: RouteQueryParams = router?.query ?? {};

	// Router Query Param Values
	const { dest } = query;

	// Register Route
	const registerRoute = getSsoSiteRoute({
		routeStaticId: 'SSO_SITE__/REGISTER',
		origin: null,
		includeOrigin: false,
		queryParams: { dest },
	});

	// Form
	const formStatus =
		formState.isSubmitting || isLoginUserRunning ? 'running' : 'idle';
	const isFormSubmitting = formStatus === 'running';
	const fields: LiteFormFieldProps<LoginUserParams>[] = [
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
		fieldSpec: loginUserSchemaFieldSpecByFieldKey[fieldKey],
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
	const onSubmit = (data: LoginUserParams) =>
		void (async () => {
			console.log('Signing user in with following data:', data);
			toast({
				title: 'Signing in...',
				description: 'This may take a few moments.',
			});
			try {
				setIsLoginUserRunning(true);

				const { password, email } = data;
				localStorage.setItem('pause_firebase_auth_redirects', 'true');
				const { user: firebaseUser } = await signInWithEmailAndPassword(
					auth,
					email,
					password,
				);
				const { custom_token: clientToken } =
					await createFirebaseAuthCustomToken(firebaseUser, {});
				const defaultDestination = getHomeSiteRoute({
					routeStaticId: 'HOME_SITE__/INDEX',
					origin: siteOriginByTarget.HOME_SITE,
					includeOrigin: true,
					queryParams: { client_token: clientToken },
				});
				const decodedDest = decodeURIComponent(dest ?? '');
				const hasQueryParams = decodedDest.includes('?');
				const destination = dest
					? `${decodedDest}${
							hasQueryParams ? '&' : '?'
					  }client_token=${clientToken}`
					: defaultDestination;

				await router.push(destination);
				return;
			} catch (err) {
				// Show the error message
				const message =
					(err as Error)?.message ??
					(err as GeneralizedError)?.error?.message ??
					'An error occurred. Please try again.';
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

				// Log to console
				console.error('Error:', err);
			} finally {
				localStorage.removeItem('pause_firebase_auth_redirects');
				setIsLoginUserRunning(false);
			}
		})();

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<div className={cn('min-h-screen relative', 'px-8 pt-24')}>
				<OnboardingCard
					step={null}
					subtitle='Enter your email and password to login'
					title='Welcome back'
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
						<AuthenticationLegalNotice />
					</form>
				</OnboardingCard>
				<ChangeAuthenticationRoute
					oppositeRoute={registerRoute}
					text='Need an account? Sign up'
				/>
			</div>
		</PageComponent>
	);
};

export default Page;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'SSO_SITE__/LOGIN' as const;

// Route Query Params Type
type RouteQueryParams = SsoSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

export const getStaticProps: GetStaticProps<PageStaticProps> = () => {
	// Route Static Props
	const ROUTE_STATIC_PROPS: PageStaticProps = {
		routeStaticId: ROUTE_STATIC_ID,
		title: 'Login to your account',
	};
	return Promise.resolve({
		props: ROUTE_STATIC_PROPS,
	});
};
