import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	PageStaticProps,
	PageProps,
	Page as PageComponent,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { SsoWebAppRouteQueryParams, getHomeWebAppRoute } from '@wallot/js';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { Input } from 'ergonomic-react/src/components/ui/input';
import { Label } from 'ergonomic-react/src/components/ui/label';
import { Button } from 'ergonomic-react/src/components/ui/button';
import { default as cn } from 'ergonomic-react/src/lib/cn';

const wallotMockUserPayload = {
	email: 'agitated_carver_88160509@example.com',
	password: '123456',
};
type WallotUserPayload = typeof wallotMockUserPayload;

const Page: NextPage<PageStaticProps> = (props) => {
	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// Toaster
	const { toast } = useToast();

	// ==== Constants ==== //

	// Router Query
	const query: RouteQueryParams = router?.query ?? {};

	// Router Query Param Values
	const { dest } = query;
	const destDecoded = dest ? decodeURIComponent(dest) : null;

	// ==== Constants ==== //

	// Runtime Route ID
	const ROUTE_RUNTIME_ID = props.routeStaticId;

	// Runtime Page Props
	const pageProps: PageProps = {
		...props,
		routeId: ROUTE_RUNTIME_ID,
	};
	const recommendationRoute = getHomeWebAppRoute({
		includeOrigin: false,
		origin: null,
		queryParams: { recommendation_id: '1' },
		routeStaticId: 'HOME_WEB_APP__/RECOMMENDATIONS/[RECOMMENDATION_ID]/DETAILS',
	});
	const {
		formState: { isSubmitting },
		handleSubmit,
		register,
	} = useForm<WallotUserPayload>({
		defaultValues: wallotMockUserPayload,
		shouldUnregister: false,
	});
	const onSubmit = async (data: WallotUserPayload) => {
		toast({
			title: 'Creating your Wallot account...',
			description: 'This may take a few seconds.',
		});
		// Wait 1 second
		await new Promise((resolve) => setTimeout(resolve, 2500));
		console.log('Registering user with following data data:', data);
		const clientToken = 'mock_tk_123';
		const redirectUrl =
			(destDecoded || recommendationRoute) + '?client_token=' + clientToken;
		await router.push(redirectUrl);
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
								<Button disabled={isSubmitting} type='submit'>
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
											<p>Continue</p>
										)}
									</div>
								</Button>
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
