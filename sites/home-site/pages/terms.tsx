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
					<div className='container p-8 rounded-lg shadow'>
						<header className='mb-6'>
							<h1 className='text-3xl font-bold'>Terms of Service</h1>
							<p className='text-gray-600'>Last Modified: August 15, 2024</p>
						</header>

						<section id='introduction' className='mb-6'>
							<h2 className='text-2xl font-semibold mb-4'>Introduction</h2>
							<p className='mb-4'>
								Welcome to Wallot! We offer AI-powered investment recommendation
								services that help users identify stocks to add to their
								portfolio based on their capital, risk appetite, and industry
								exclusions. By accessing or using our services, you agree to be
								bound by these Terms of Service and all terms incorporated by
								reference.
							</p>
						</section>

						<section id='serviceDescription' className='mb-6'>
							<h2 className='text-2xl font-semibold mb-4'>
								Service Description
							</h2>
							<p className='mb-4'>
								Symmetric LLC, the creator of ("Wallot") provides an AI-driven
								platform designed to deliver personalized stock recommendations
								tailored to your investment preferences. Our service analyzes
								the information you provide regarding your investment amount,
								risk tolerance, and any industry exclusions to suggest stocks
								that may be suitable additions to your portfolio.
							</p>
						</section>

						<section id='usageRights' className='mb-6'>
							<h2 className='text-2xl font-semibold mb-4'>
								Usage Rights and Restrictions
							</h2>
							<p className='mb-4'>
								Subject to these Terms, Wallot grants you a non-exclusive,
								non-transferable, revocable license to access and use our
								services for your personal investment purposes. You may not use
								our services for any illegal or unauthorized purpose. You agree
								not to reproduce, duplicate, copy, sell, resell or exploit any
								portion of the Service, use of the Service, or access to the
								Service without express written permission by us.
							</p>
						</section>

						<section id='userResponsibilities' className='mb-6'>
							<h2 className='text-2xl font-semibold mb-4'>
								User Responsibilities
							</h2>
							<p className='mb-4'>
								You are responsible for all activities that occur under your
								user account. You agree to maintain the security of your account
								and promptly notify Wallot if you discover or suspect any
								security breaches related to our services.
							</p>
						</section>

						<section id='contentOwnership' className='mb-6'>
							<h2 className='text-2xl font-semibold mb-4'>
								Content Ownership and Intellectual Property
							</h2>
							<p className='mb-4'>
								All intellectual property rights in and to our services,
								including but not limited to software, associated documentation,
								and all other materials produced by Wallot, are owned by Wallot
								LLC. Your use of the services does not grant you any ownership
								in our services or the content or data accessed through them.
							</p>
						</section>

						<section id='termination' className='mb-6'>
							<h2 className='text-2xl font-semibold mb-4'>
								Termination and Suspension
							</h2>
							<p className='mb-4'>
								Wallot may terminate or suspend your access to the services at
								any time, without prior notice or liability, for any reason
								whatsoever, including without limitation if you breach the
								Terms. All provisions of the Terms which by their nature should
								survive termination shall survive termination, including,
								without limitation, ownership provisions, warranty disclaimers,
								indemnity, and limitations of liability.
							</p>
						</section>

						<section id='disclaimer' className='mb-6'>
							<h2 className='text-2xl font-semibold mb-4'>
								Disclaimer and Limitation of Liability
							</h2>
							<p className='mb-4'>
								Wallot and its services are provided on an "as is" and "as
								available" basis. Wallot expressly disclaims all warranties of
								any kind, whether express or implied, including, but not limited
								to, the implied warranties of merchantability, fitness for a
								particular purpose, and non-infringement. In no event shall
								Wallot, its affiliates, agents, directors, employees, suppliers,
								or licensors be liable for any indirect, punitive, incidental,
								special, consequential, or exemplary damages, including without
								limitation damages for loss of profits, goodwill, use, data, or
								other intangible losses that result from the use of, or
								inability to use, the service.
							</p>
						</section>

						<section id='governingLaw' className='mb-6'>
							<h2 className='text-2xl font-semibold mb-4'>Governing Law</h2>
							<p className='mb-4'>
								These Terms shall be governed and construed in accordance with
								the laws of the State of Tennessee, United States, without
								regard to its conflict of law provisions. Our failure to enforce
								any right or provision of these Terms will not be considered a
								waiver of those rights.
							</p>
						</section>

						<section id='contactInformation' className='mb-6'>
							<h2 className='text-2xl font-semibold mb-4'>
								Contact Information
							</h2>
							<p>
								If you have any questions about these Terms, please contact us
								at:
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
const ROUTE_STATIC_ID = 'HOME_SITE__/TERMS' as const;

// Route Query Params Type
type RouteQueryParams = HomeSiteRouteQueryParams[typeof ROUTE_STATIC_ID];

export const getStaticProps: GetStaticProps<PageStaticProps> = () => {
	// Route Static Props
	const ROUTE_STATIC_PROPS: PageStaticProps = {
		routeStaticId: ROUTE_STATIC_ID,
		title: 'Terms of Service',
	};
	return Promise.resolve({
		props: ROUTE_STATIC_PROPS,
	});
};
