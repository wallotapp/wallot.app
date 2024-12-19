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
	SsoWebAppRouteQueryParams,
	getSsoWebAppRoute,
	passwordRules,
	loginUserSchema,
	loginUserSchemaFieldSpecByFieldKey,
	getHomeWebAppRoute,
} from '@wallot/js';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from 'ergonomic-react/src/features/data/hooks/useYupValidationResolver';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { PlatformLogo } from 'ergonomic-react/src/components/brand/PlatformLogo';
import { OPEN_GRAPH_CONFIG } from 'ergonomic-react/src/config/openGraphConfig';
import { defaultGeneralizedFormDataTransformationOptions } from 'ergonomic-react/src/features/data/types/GeneralizedFormDataTransformationOptions';
import { OnboardingCard } from '@wallot/react/src/components/OnboardingCard';
import { SubmitButton } from '@wallot/react/src/components/SubmitButton';
import { FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';
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
		welcomeSiteOrigin: siteOriginByTarget.HOME_WEB_APP,
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
	const registerRoute = getSsoWebAppRoute({
		routeStaticId: 'SSO_WEB_APP__/REGISTER',
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
				const defaultDestination = getHomeWebAppRoute({
					routeStaticId: 'HOME_WEB_APP__/INDEX',
					origin: siteOriginByTarget.HOME_WEB_APP,
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
				<div className='mb-10 flex items-center justify-center'>
					{OPEN_GRAPH_CONFIG.siteBrandLogoDarkMode &&
						OPEN_GRAPH_CONFIG.siteBrandLogoLightMode && (
							<PlatformLogo
								height={380}
								size='xl'
								srcMap={{
									dark: OPEN_GRAPH_CONFIG.siteBrandLogoDarkMode,
									light: OPEN_GRAPH_CONFIG.siteBrandLogoLightMode,
								}}
								width={2048}
							/>
						)}
					{!(
						OPEN_GRAPH_CONFIG.siteBrandLogoDarkMode &&
						OPEN_GRAPH_CONFIG.siteBrandLogoLightMode
					) && (
						<div>
							<p className={cn('text-2xl font-bold', 'lg:text-3xl')}>
								{OPEN_GRAPH_CONFIG.siteName}
							</p>
						</div>
					)}
				</div>
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
						<div className='text-center mt-5 mx-auto'>
							<p className='text-gray-400 text-sm'>
								By clicking continue, you agree to our{' '}
								<Link
									href='https://wallot.app/terms'
									rel='noopener noreferrer'
									target='_blank'
								>
									<span className='underline'>Terms of Service</span>
								</Link>{' '}
								and{' '}
								<Link
									href='https://wallot.app/privacy'
									rel='noopener noreferrer'
									target='_blank'
								>
									<span className='underline'>Privacy Policy</span>
								</Link>
							</p>
						</div>
					</form>
				</OnboardingCard>
				<div className='flex flex-col items-center justify-center w-fit py-16 px-8 mx-auto'>
					<div>
						<Link href={registerRoute}>
							<div
								className={cn(
									'flex items-center space-x-0.5 cursor-pointer',
									'text-base',
								)}
							>
								<p className='font-medium text-base text-brand-light'>
									Need an account? Sign up
								</p>
								<FiChevronRight className='mt-0.5 stroke-[3px] text-brand-light' />
							</div>
						</Link>
					</div>
				</div>
			</div>
		</PageComponent>
	);
};

export default Page;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'SSO_WEB_APP__/LOGIN' as const;

// Route Query Params Type
type RouteQueryParams = SsoWebAppRouteQueryParams[typeof ROUTE_STATIC_ID];

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
