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
	SsoWebAppRouteQueryParams,
	getSsoWebAppRoute,
	registerUserSchema,
	registerUserSchemaFieldSpecByFieldKey,
} from '@wallot/js';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import { FieldValues, useForm } from 'react-hook-form';
// import { Input } from 'ergonomic-react/src/components/ui/input';
// import { Label } from 'ergonomic-react/src/components/ui/label';
import { useYupValidationResolver } from 'ergonomic-react/src/features/data/hooks/useYupValidationResolver';
// import { GeneralizedFormFieldError } from 'ergonomic-react/src/features/data/components/GeneralizedFormFieldError';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { PlatformLogo } from 'ergonomic-react/src/components/brand/PlatformLogo';
import { OPEN_GRAPH_CONFIG } from 'ergonomic-react/src/config/openGraphConfig';
import { defaultGeneralizedFormDataTransformationOptions } from 'ergonomic-react/src/features/data/types/GeneralizedFormDataTransformationOptions';
import { useRegisterUserMutation } from '@wallot/react/src/features/users';
import { OnboardingCard } from '@wallot/react/src/components/OnboardingCard';
import { SubmitButton } from '@wallot/react/src/components/SubmitButton';
import { FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';
import { GeneralizedFormFieldProps } from 'ergonomic-react/src/features/data/types/GeneralizedFormFieldProps';

type F<TFieldValues extends FieldValues> = Required<
	Pick<
		GeneralizedFormFieldProps<TFieldValues, string>,
		| 'control'
		| 'fieldErrors'
		| 'fieldKey'
		| 'fieldSpec'
		| 'initialFormData'
		| 'isSubmitting'
		| 'setError'
	>
>;

const Page: NextPage<PageStaticProps> = (props) => {
	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// Toaster
	const { toast } = useToast();

	// Form Resolver
	const resolver = useYupValidationResolver(
		registerUserSchema,
		defaultGeneralizedFormDataTransformationOptions,
	);

	// Form
	const initialFormData = registerUserSchema.getDefault();
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
			},
			onSuccess: async ({
				custom_token: customToken,
				redirect_url: redirectUrl,
			}) => {
				try {
					// Log in user
					await signInWithCustomToken(auth, customToken);

					// Show success toast
					toast({
						title: 'Success',
						description: 'Your account has been created.',
					});

					// Redirect to next page
					await router.push(redirectUrl);
				} catch (err) {
					console.error('Error:', err);
					toast({
						title: 'Error',
						description: 'An error occurred. Please try again.',
					});

					// Reset form
					reset();

					// Set error
					setError('email', {
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
	const _ = query;
	_;

	// Login Route
	const loginRoute = getSsoWebAppRoute({
		routeStaticId: 'SSO_WEB_APP__/INDEX',
		origin: null,
		includeOrigin: false,
		queryParams: {},
	});

	// Form
	const formStatus =
		formState.isSubmitting || isRegisterUserRunning ? 'running' : 'idle';
	const isFormSubmitting = formStatus === 'running';

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
	const onSubmit = (data: RegisterUserParams) => {
		console.log('Registering user with following data:', data);
		toast({
			title: 'Creating your account...',
			description: 'This may take a few moments.',
		});
		registerUser(data);
	};

	const registerUserFieldProps: F<RegisterUserParams>[] = [
		{
			control,
			fieldErrors: formState.errors,
			fieldKey: 'username' as const,
			fieldSpec: registerUserSchemaFieldSpecByFieldKey[
				'username'
			],
			initialFormData,
			isSubmitting: isFormSubmitting,
			setError: (message) => setError('username', { message }),
		},
	];

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
					step={0}
					subtitle='Enter a username, email and password to create a free account'
					title='Welcome to the community'
				>
					<form onSubmit={handleSubmit(onSubmit) as () => void}>
						<div>
							{registerUserFieldProps.map(() => (
								<div />
							))}
						</div>
						<div className='mt-4 text-right w-full'>
							<SubmitButton
								className='w-full'
								isSubmitting={isFormSubmitting}
							/>
						</div>
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
						<Link href={loginRoute}>
							<div
								className={cn(
									'flex items-center space-x-0.5 cursor-pointer',
									'text-base',
								)}
							>
								<p className='font-medium text-base text-brand-light'>
									Have an account? Login
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
const ROUTE_STATIC_ID = 'SSO_WEB_APP__/REGISTER' as const;

// Route Query Params Type
type RouteQueryParams = SsoWebAppRouteQueryParams[typeof ROUTE_STATIC_ID];

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
