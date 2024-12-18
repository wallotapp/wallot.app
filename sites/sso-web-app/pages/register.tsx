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
	registerUserSchema,
} from '@wallot/js';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { Input } from 'ergonomic-react/src/components/ui/input';
import { Label } from 'ergonomic-react/src/components/ui/label';
import { useYupValidationResolver } from 'ergonomic-react/src/features/data/hooks/useYupValidationResolver';
import { defaultGeneralizedFormDataTransformationOptions } from 'ergonomic-react/src/features/data/types/GeneralizedFormDataTransformationOptions';
import { useRegisterUserMutation } from '@wallot/react/src/features/users';
import { SubmitButton } from '@wallot/react/src/components/SubmitButton';

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
			<div className='p-8'>
				<div className='max-w-2xl'>
					<div>
						<p className='text-2xl font-bold'>Create your account</p>
					</div>
					<div className='mt-4'>
						<form onSubmit={handleSubmit(onSubmit) as () => void}>
							<div>
								{registerUserFieldProps.map(
									({ fieldKey, label, placeholder }) => {
										const fieldErrorMessage = formState.errors[fieldKey]
											? formState.errors[fieldKey].message ?? ''
											: '';
										return (
											<div className='mt-2' key={fieldKey}>
												<div>
													<Label className='text-xs'>{label}</Label>
												</div>
												<div>
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
							<div className='mt-4 text-right'>
								<SubmitButton isSubmitting={isFormSubmitting} />
							</div>
						</form>
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
