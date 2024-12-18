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
import { Button } from 'ergonomic-react/src/components/ui/button';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { useRegisterUserMutation } from '@wallot/react/src/features/users';

const SubmitButton = ({
	isSubmitting,
	text = 'Continue',
	type = 'submit',
}: {
	isSubmitting: boolean;
	text?: string;
	type?: 'submit' | 'button';
}) => {
	return (
		<Button disabled={isSubmitting} type={type}>
			<div>
				{isSubmitting ? (
					<>
						<div className='flex items-center justify-center space-x-2 min-w-16'>
							<div
								className={cn(
									'w-4 h-4 border-2 border-gray-200 rounded-full animate-spin',
									'border-t-[#7F43D7] border-r-[#7F43D7] border-b-[#7F43D7]',
								)}
							></div>
						</div>
					</>
				) : (
					<p>{text}</p>
				)}
			</div>
		</Button>
	);
};

const Page: NextPage<PageStaticProps> = (props) => {
	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// Toaster
	const { toast } = useToast();

	// Form
	const { formState, handleSubmit, register, reset, setError } =
		useForm<RegisterUserParams>({
			defaultValues: registerUserSchema.getDefault(),
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
								<Label>
									<p>Email address</p>
								</Label>
								<Input
									placeholder='Email address'
									type='text'
									{...register('email', { required: true })}
								/>
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
