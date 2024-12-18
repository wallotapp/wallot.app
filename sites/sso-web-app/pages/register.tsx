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
} from '@wallot/js';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { Input } from 'ergonomic-react/src/components/ui/input';
import { Label } from 'ergonomic-react/src/components/ui/label';
import { useYupValidationResolver } from 'ergonomic-react/src/features/data/hooks/useYupValidationResolver';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { PlatformLogo } from 'ergonomic-react/src/components/brand/PlatformLogo';
import { OPEN_GRAPH_CONFIG } from 'ergonomic-react/src/config/openGraphConfig';
import { defaultGeneralizedFormDataTransformationOptions } from 'ergonomic-react/src/features/data/types/GeneralizedFormDataTransformationOptions';
import { useRegisterUserMutation } from '@wallot/react/src/features/users';
import { SubmitButton } from '@wallot/react/src/components/SubmitButton';
import { FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';

const registerUserFieldProps = [
	{
		fieldKey: 'username' as const,
		label: 'Username',
		placeholder: 'e.g. my_username',
	},
	{
		fieldKey: 'email' as const,
		label: 'Email address',
		placeholder: 'e.g. me@example.com',
	},
	{
		fieldKey: 'password' as const,
		label: 'Password',
		placeholder: '************',
	},
];

const getFieldPresentation = (fieldErrorMessage: string) =>
	fieldErrorMessage === '' ? 'normal' : 'error';
export const FormFieldError: React.FC<{
	className?: string;
	fieldErrorMessage: string;
}> = ({ className = '', fieldErrorMessage }) => {
	const fieldPresentation = getFieldPresentation(fieldErrorMessage);

	if (fieldPresentation === 'normal') return null;

	return (
		<div className={className}>
			<p className='font-semibold text-red-700 text-xs'>
				{fieldErrorMessage.toString()}
			</p>
		</div>
	);
};

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
	const { formState, handleSubmit, register, reset, setError } =
		useForm<RegisterUserParams>({
			defaultValues: registerUserSchema.getDefault(),
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
				<div
					className={cn(
						'bg-white border border-gray-200 rounded-md shadow-lg flex flex-col items-center justify-evenly pt-24 pb-14 px-8 mx-auto relative',
						'w-full',
						'md:w-[28rem]',
					)}
				>
					<div className='absolute top-12 flex justify-center mb-8 space-x-5'>
						<div className='w-16 h-2 rounded-md bg-brand'></div>
						<div className='w-16 h-2 rounded-md bg-gray-200'></div>
					</div>
					<div className='text-center max-w-[75%] mx-auto'>
						<div className=''>
							<p className='font-semibold text-xl'>Welcome to the community</p>
						</div>
						<div className='mt-1 text-center'>
							<p className='text-gray-400 text-base'>
								Enter a username, email and password to create a free account
							</p>
						</div>
					</div>

					<div className={cn('mt-4 w-full', 'md:w-80')}>
						<form onSubmit={handleSubmit(onSubmit) as () => void}>
							<div>
								{registerUserFieldProps.map(
									({ fieldKey, label, placeholder }, idx) => {
										const fieldErrorMessage = formState.errors[fieldKey]
											? formState.errors[fieldKey].message ?? ''
											: '';
										return (
											<div className={cn(idx && 'mt-2.5')} key={fieldKey}>
												<div>
													<Label className='text-base'>{label}</Label>
												</div>
												<div className='mt-0.5'>
													<Input
														className='h-8 text-xs'
														type='text'
														placeholder={placeholder}
														{...register(fieldKey)}
													/>
												</div>
												<div>
													<FormFieldError
														className='my-1'
														fieldErrorMessage={fieldErrorMessage}
													/>
												</div>
											</div>
										);
									},
								)}
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
					</div>
				</div>
				<div className='flex flex-col items-center justify-center w-fit py-16 px-8 mx-auto'>
					<div>
						<Link
							href={getSsoWebAppRoute({
								routeStaticId: 'SSO_WEB_APP__/INDEX',
								origin: null,
								includeOrigin: false,
								queryParams: {},
							})}
						>
							<div
								className={cn(
									'flex items-center space-x-0.5 cursor-pointer',
									'text-gray-600',
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
