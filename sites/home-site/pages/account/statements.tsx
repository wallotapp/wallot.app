import * as changeCase from 'change-case';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	Page as PageComponent,
	PageStaticProps,
	PageProps,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { HomeSiteRouteQueryParams } from '@wallot/js';
import { AccountDashboardPage } from '@wallot/home-site/src/components/AccountDashboardPage';
import { useRetrieveDocuments } from '@wallot/react/src/features/users/hooks/useRetrieveDocuments';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { DateTime } from 'luxon';
import { GoDownload } from 'react-icons/go';

const Page: NextPage<PageStaticProps> = (props) => {
	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// Documents
	const { data: documentsData } = useRetrieveDocuments();
	const documents = documentsData ?? [];

	// ==== Constants ==== //

	// Router Query
	const _: RouteQueryParams = router?.query ?? {};
	_;

	// ==== Constants ==== //

	// Runtime Route ID
	const ROUTE_RUNTIME_ID = props.routeStaticId;

	// Runtime Page Props
	const pageProps: PageProps = {
		...props,
		routeId: ROUTE_RUNTIME_ID,
	};

	// ==== Render ==== //
	return (
		<PageComponent {...pageProps}>
			<AccountDashboardPage className={cn('lg:max-w-3xl')}>
				<div>
					<div>
						<p className='font-semibold text-2xl'>Statements</p>
					</div>
					<div className='mt-1'>
						<p className='font-light text-base text-gray-600'>
							Below are the statements for your account.
						</p>
					</div>
					<div className='mt-3 border-b border-gray-200 py-1'>
						<div className='grid grid-cols-3'>
							{['Date', 'Type of Document', 'Download'].map((header) => {
								return (
									<div key={header}>
										<p className='font-semibold text-base text-gray-600'>
											{header}
										</p>
									</div>
								);
							})}
						</div>
					</div>
					<div className='mt-2 flex flex-col gap-2'>
						{documents.map(({ date, id, type }) => {
							const dateString =
								date == null
									? 'Pending'
									: DateTime.fromISO(date).toLocaleString(DateTime.DATE_SHORT);

							return (
								<div key={id} className={cn('grid grid-cols-3')}>
									{[dateString, changeCase.capitalCase(type ?? '')].map(
										(value, valueIdx) => {
											return (
												<div key={valueIdx}>
													<p className='font-light text-sm'>{value}</p>
												</div>
											);
										},
									)}
									<div>
										<button className='flex items-center gap-1'>
											<div>
												<GoDownload className='text-gray-400' />
											</div>
											<div>
												<p className='font-light text-sm'>Download</p>
											</div>
										</button>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</AccountDashboardPage>
		</PageComponent>
	);
};

export default Page;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_SITE__/ACCOUNT/STATEMENTS' as const;

// Route Query Params Type
type RouteQueryParams = HomeSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

export const getStaticProps: GetStaticProps<PageStaticProps> = () => {
	// Route Static Props
	const ROUTE_STATIC_PROPS: PageStaticProps = {
		routeStaticId: ROUTE_STATIC_ID,
		title: 'Statements',
	};
	return Promise.resolve({
		props: ROUTE_STATIC_PROPS,
	});
};
