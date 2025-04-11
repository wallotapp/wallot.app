import { PageHeader } from '@wallot/react/src/components/PageHeader';
import { PageActionHeader } from '@wallot/react/src/components/PageActionHeader';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	Page as PageComponent,
	PageStaticProps,
	PageProps,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { ResearchSiteRouteQueryParams } from '@wallot/js';

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID =
	'RESEARCH_SITE__/APPLICATIONS/[APPLICATION_ID]/ACCEPTANCE_LETTER' as const;

// Route Static Props
const ROUTE_STATIC_PROPS: PageStaticProps = {
	routeStaticId: ROUTE_STATIC_ID,
	title: 'Acceptance Letter',
};

// Route Query Params Type
type RouteQueryParams = ResearchSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

const Page: NextPage = () => {
	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// ==== Constants ==== //

	// Router Query
	const query = (router?.query as RouteQueryParams) ?? {};

	// Router Query Param Values
	const { application_id, client_verification } = query;
	client_verification;

	// Runtime Route ID
	const ROUTE_RUNTIME_ID = ROUTE_STATIC_ID.replace(
		'[APPLICATION_ID]',
		application_id || '',
	);

	// Runtime Page Props
	const pageProps: PageProps = {
		...ROUTE_STATIC_PROPS,
		routeId: ROUTE_RUNTIME_ID,
	};

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<div className={cn('flex flex-col min-h-screen min-w-screen relative')}>
				<PageHeader showHomeLink={false} />
				<PageActionHeader />
				<div
					className={cn(
						'min-h-[95vh] w-full',
						'py-36 px-6',
						'lg:py-36 lg:px-28',
					)}
				>
					<div
						className={cn(
							'mt-8 flex',
							'flex-col lg:flex-row',
							'space-y-4 lg:space-y-0',
							'lg:space-x-4',
						)}
					>
						<div className={cn('lg:max-w-md')}>
							<div>
								<p className='font-semibold text-xl'>What is Lorem Ipsum?</p>
								<p className='font-light text-sm'>
									What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
									printing and typesetting industry. Lorem Ipsum has been the
									industry's standard dummy text ever since the 1500s, when an
									unknown printer took a galley of type and scrambled it to make
									a type specimen book. It has survived not only five centuries,
									but also the leap into electronic typesetting, remaining
									essentially unchanged.
								</p>
							</div>
							<div>
								<p>I've read the entire agreement.</p>
							</div>
							<div>
								<p>Yes</p>
								<p>I'm ready to sign</p>
							</div>
							<div>
								<form>
									<input placeholder='Full name' />
									<input placeholder='Parent name' />
									<input placeholder='Relationship' />
									<button>Submit</button>
								</form>
							</div>
						</div>
						<div className={cn('rounded-lg w-full')}>
							<iframe
								src={getAcceptanceLetterDownloadUrl()}
								title='PDF Document'
								className={cn('rounded-lg w-full h-screen')}
								allowFullScreen
							/>
						</div>
					</div>
				</div>
			</div>
		</PageComponent>
	);
};

export default Page;

function getAcceptanceLetterDownloadUrl() {
	return (
		'https://firebasestorage.googleapis.com/v0/b/app-wallot-production.appspot.com/o/_temp-pdfs%2Fhello-world.pdf?alt=media&token=40cb7ed5-3fe3-422d-b61b-1408dd7e61b7' +
		'#toolbar=0&navpanes=0'
	);
}
