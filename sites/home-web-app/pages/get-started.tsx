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
	HomeWebAppRouteQueryParams,
	// getHomeWebAppRoute,
	// passwordRules,
	registerUserSchema,
	// registerUserSchemaFieldSpecByFieldKey,
	// usernameRules,
} from '@wallot/js';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from 'ergonomic-react/src/features/data/hooks/useYupValidationResolver';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { PlatformLogo } from 'ergonomic-react/src/components/brand/PlatformLogo';
import { OPEN_GRAPH_CONFIG } from 'ergonomic-react/src/config/openGraphConfig';
import { defaultGeneralizedFormDataTransformationOptions } from 'ergonomic-react/src/features/data/types/GeneralizedFormDataTransformationOptions';
import { useRegisterUserMutation } from '@wallot/react/src/features/users';
import { OnboardingCard } from '@wallot/react/src/components/OnboardingCard';
import { SubmitButton } from '@wallot/react/src/components/SubmitButton';
import { LiteFormFieldProps } from 'ergonomic-react/src/features/data/types/LiteFormFieldProps';
import { LiteFormFieldContainer } from 'ergonomic-react/src/features/data/components/LiteFormFieldContainer';

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
	const {
		// control,
		formState,
		handleSubmit,
		reset,
		setError,
	} = useForm<RegisterUserParams>({
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

	// Form
	const formStatus =
		formState.isSubmitting || isRegisterUserRunning ? 'running' : 'idle';
	const isFormSubmitting = formStatus === 'running';
	const fields: LiteFormFieldProps<RegisterUserParams>[] = [];

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
		console.log('Activating user with following data:', data);
		toast({
			title: 'Activating your account...',
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
				<OnboardingCard
					step={1}
					subtitle='This helps our AI personalize your investing recommendations'
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
                text='Activate Account'
							/>
						</div>
					</form>
				</OnboardingCard>
			</div>
		</PageComponent>
	);
};

export default Page;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_WEB_APP__/GET_STARTED' as const;

// Route Query Params Type
type RouteQueryParams = HomeWebAppRouteQueryParams[typeof ROUTE_STATIC_ID];

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
