import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	PageStaticProps,
	PageProps,
	Page as PageComponent,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { HomeWebAppRouteQueryParams, getHomeWebAppRoute } from '@wallot/js';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { Input } from 'ergonomic-react/src/components/ui/input';
import { Label } from 'ergonomic-react/src/components/ui/label';
import { Button } from 'ergonomic-react/src/components/ui/button';
import { default as cn } from 'ergonomic-react/src/lib/cn';

const alpacaMockAccountPayload = {
	contact: {
		email_address: 'agitated_carver_88160509@example.com',
		phone_number: '226-555-0970',
		street_address: ['20 N San Mateo Dr'],
		city: 'San Mateo',
		state: 'CA',
		postal_code: '94401',
	},
	identity: {
		given_name: 'Agitated',
		family_name: 'Carver',
		date_of_birth: '1970-01-01',
		tax_id: '555-55-5555',
		tax_id_type: 'USA_SSN',
		country_of_citizenship: 'USA',
		country_of_birth: 'USA',
		country_of_tax_residence: 'USA',
		funding_source: ['employment_income'],
		visa_type: null,
		visa_expiration_date: null,
		date_of_departure_from_usa: null,
		permanent_resident: null,
		is_force_finra_institutional: null,
		investment_experience_with_stocks: null,
		investment_experience_with_options: null,
		investment_time_horizon: null,
	},
	disclosures: {
		is_control_person: false,
		is_affiliated_exchange_or_finra: false,
		is_affiliated_exchange_or_iiroc: false,
		is_politically_exposed: false,
		immediate_family_exposed: false,
		is_discretionary: null,
	},
	agreements: [
		{
			agreement: 'customer_agreement',
			signed_at: '2024-12-12T01:59:15.126099757Z',
			ip_address: '127.0.0.1',
		},
	],
	documents: [
		{
			document_type: 'identity_verification',
			document_sub_type: 'passport',
			content: '/9j/4AA...',
			content_data: null,
			mime_type: 'image/jpeg',
		},
	],
	trusted_contact: {
		given_name: 'Jane',
		family_name: 'Doe',
		email_address: 'agitated_carver_88160509@example.com',
	},
	minor_identity: null,
	entity_id: null,
	additional_information: '',
	account_type: '',
	account_sub_type: null,
	auto_approve: null,
	beneficiaries: null,
	trading_configurations: null,
	currency: null,
	enabled_assets: null,
	instant: null,
	entity_identity: null,
	entity_contact: null,
	authorized_individuals: null,
	ultimate_beneficial_owners: null,
	sub_correspondent: null,
};
type AlpacaAccountPayload = typeof alpacaMockAccountPayload;

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
	const { step } = query;
	step;

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
	} = useForm<AlpacaAccountPayload>({
		defaultValues: alpacaMockAccountPayload,
		shouldUnregister: false,
	});
	const onSubmit = async (data: AlpacaAccountPayload) => {
		toast({
			title: 'Building your recommendation...',
			description: 'This may take a few seconds.',
		});
		// Wait 1 second
		await new Promise((resolve) => setTimeout(resolve, 2500));
		console.log('Building recommendation with the following data:', data);
		await router.push(recommendationRoute);
	};

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<div className='p-8'>
				<div className='max-w-2xl'>
					<div>
						<p className='text-2xl font-bold'>Tell us about yourself</p>
					</div>
					<div className='mt-4'>
						<form onSubmit={handleSubmit(onSubmit) as () => void}>
							<div>
								<Label>
									<p>First Name</p>
								</Label>
								<Input
									placeholder='First Name'
									type='text'
									{...register('identity.given_name')}
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
const ROUTE_STATIC_ID = 'HOME_WEB_APP__/GET_STARTED' as const;

// Route Query Params Type
type RouteQueryParams = HomeWebAppRouteQueryParams[typeof ROUTE_STATIC_ID];

export const getStaticProps: GetStaticProps<PageStaticProps> = () => {
	// Route Static Props
	const ROUTE_STATIC_PROPS: PageStaticProps = {
		routeStaticId: ROUTE_STATIC_ID,
		title: 'Get Started',
	};
	return Promise.resolve({
		props: ROUTE_STATIC_PROPS,
	});
};
