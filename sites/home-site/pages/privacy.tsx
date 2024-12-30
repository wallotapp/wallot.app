import * as React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import {
	PageStaticProps,
	PageProps,
	Page as PageComponent,
} from 'ergonomic-react/src/components/nextjs-pages/Page';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { PageHeader } from '@wallot/react/src/components/PageHeader';
import { HomeSiteRouteQueryParams } from '@wallot/js';

const Page: NextPage<PageProps> = (props) => {
	// ==== Hooks ==== //

	// Router
	const router = useRouter();

	// ==== Constants ==== //

	// Router Query
	const query: RouteQueryParams = router?.query ?? {};

	// Router Query Param Values
	const _ = query;
	typeof _;

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
			<div className={cn('flex flex-col min-h-screen min-w-screen relative')}>
				<PageHeader showHomeLink={false} />
				<div
					className={cn(
						'min-h-[95vh] w-full scroll-smooth',
						'py-48 px-6',
						'lg:py-48 lg:px-28',
					)}
				>
					<div className='container mx-auto p-8 rounded-lg shadow'>
						<header className='mb-6'>
							<h1 className='text-3xl font-bold'>Privacy Policy</h1>
							<p className='text-gray-600'>Last Modified: June 26, 2024</p>
						</header>
						<section id='introduction' className='mb-6'>
							<h2 className='text-2xl font-semibold mb-4'>Introduction</h2>
							<p className='mb-4'>
								At Symmetric, we are committed to protecting your privacy. This
								Privacy Policy outlines the types of information we collect from
								you while you use our services, how we use that information, and
								the steps we take to safeguard it. This policy applies to
								information we collect through our websites, services, and
								applications that reference this Privacy Policy.
							</p>
						</section>
						<section id='informationCollection' className='mb-6'>
							<h2 className='text-2xl font-semibold mb-4'>
								Information Collection
							</h2>
							<p className='mb-4'>
								We collect various types of information, including information
								you provide directly, information collected automatically
								through your use of our services, and information obtained from
								third parties. Directly provided information includes personal
								details you provide when you register, such as your name, email
								address, and organizational details. Automatically collected
								information may include usage details, IP addresses, and
								information collected through cookies and other tracking
								technologies.
							</p>
						</section>
						<section id='useOfInformation' className='mb-6'>
							<h2 className='text-2xl font-semibold mb-4'>
								Use of Information
							</h2>
							<p className='mb-4'>
								The information we collect is used to provide, maintain, and
								improve our services, to develop new services, and to protect
								Symmetric and our users. We also use the information to offer
								tailored content – like giving you more relevant search results
								and ads.
							</p>
						</section>
						<section id='informationSharing' className='mb-6'>
							<h2 className='text-2xl font-semibold mb-4'>
								Information Sharing
							</h2>
							<p className='mb-4'>
								We do not share personal information with companies,
								organizations, or individuals outside of Symmetric except in the
								following cases: With your consent, with domain administrators,
								for external processing, and for legal reasons. We attempt to
								ensure the safe handling of your personal data by third parties
								by requiring them to follow our instructions and comply with our
								Privacy Policy and other appropriate confidentiality and
								security measures.
							</p>
						</section>
						<section id='dataSecurity' className='mb-6'>
							<h2 className='text-2xl font-semibold mb-4'>Data Security</h2>
							<p className='mb-4'>
								We use industry-standard measures to protect the personal
								information we hold, including physical, technical, and
								administrative protections. Despite our efforts, no security
								measure is completely secure, and we cannot guarantee the
								security of your personal information.
							</p>
						</section>
						<section id='dataRights' className='mb-6'>
							<h2 className='text-2xl font-semibold mb-4'>Your Data Rights</h2>
							<p className='mb-4'>
								You have the right to access, update, or delete the information
								you have provided to us. You can also object to the processing
								of your information, restrict the processing of your
								information, and request the portability of your information.
								Applicable law may entitle you to additional rights.
							</p>
						</section>
						<section id='childrensPrivacy' className='mb-6'>
							<h2 className='text-2xl font-semibold mb-4'>
								Children's Privacy
							</h2>
							<p className='mb-4'>
								Our services are not directed to individuals under 16. We do not
								knowingly collect personal information from children under 16.
								If we become aware that a child under 16 has provided us with
								personal information, we take steps to remove such information
								and terminate the child's account.
							</p>
						</section>
						<section id='internationalTransfers' className='mb-6'>
							<h2 className='text-2xl font-semibold mb-4'>
								International Transfers
							</h2>
							<p className='mb-4'>
								Your information, including personal information, may be
								transferred to — and maintained on — computers located outside
								of your state, province, country, or other governmental
								jurisdiction where the data protection laws may differ from
								those of your jurisdiction.
							</p>
						</section>
						<section id='changesToPolicy' className='mb-6'>
							<h2 className='text-2xl font-semibold mb-4'>
								Changes to This Policy
							</h2>
							<p className='mb-4'>
								We may update our Privacy Policy from time to time. We will
								notify you of any changes by posting the new Privacy Policy on
								this page. You are advised to review this Privacy Policy
								periodically for any changes. Changes to this Privacy Policy are
								effective when they are posted on this page.
							</p>
						</section>
						<section id='contactInformation' className='mb-6'>
							<h2 className='text-2xl font-semibold mb-4'>
								Contact Information
							</h2>
							<p>
								If you have any questions about this Privacy Policy, please
								contact us:
							</p>
							<p>Symmetric LLC</p>
							<p>Phone: 202.713.5950</p>
							<p>Email: support@wallot.app</p>
						</section>
					</div>
				</div>
			</div>
		</PageComponent>
	);
};

export default Page;

// ==== Static Page Props ==== //

// Route Static ID
const ROUTE_STATIC_ID = 'HOME_SITE__/PRIVACY' as const;

// Route Query Params Type
type RouteQueryParams = HomeSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

export const getStaticProps: GetStaticProps<PageStaticProps> = () => {
	// Route Static Props
	const ROUTE_STATIC_PROPS: PageStaticProps = {
		routeStaticId: ROUTE_STATIC_ID,
		title: 'Privacy Policy',
	};
	return Promise.resolve({
		props: ROUTE_STATIC_PROPS,
	});
};
