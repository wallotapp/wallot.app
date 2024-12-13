import '@stripe/stripe-js';
import '@wallot/blog-web-app/styles/globals.css';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Elements } from '@stripe/react-stripe-js';
import { Toaster } from 'ergonomic-react/src/components/ui/toaster';
import { AuthProvider } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import { RouteStateProvider } from 'ergonomic-react/src/providers/RouteStateProvider';
import { InitializeGoogleAnalytics } from 'ergonomic-react/src/components/analytics/InitializeGoogleAnalytics';
import { queryClient } from 'ergonomic-react/src/lib/tanstackQuery';
import { NODE_ENV } from 'ergonomic-react/src/config/nodeEnv';
import { stripePromise } from 'ergonomic-react/src/lib/stripe';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<AuthProvider>
			<RouteStateProvider>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider
						disableTransitionOnChange
						attribute='class'
					>
						<Elements stripe={stripePromise} options={undefined}>
							<>
								<InitializeGoogleAnalytics />
								<a
									href='#main'
									className='fixed p-2 top-0 left-0 -translate-y-full focus:translate-y-0'
								>
									Skip to main content
								</a>
								<div>
									<main id='main'>
										<Component {...pageProps} />
									</main>
								</div>
								<Toaster />
								{NODE_ENV !== 'test' && (
									<ReactQueryDevtools
										position={
											(process.env
												.NEXT_PUBLIC_REACT_QUERY_DEVTOOLS_POSITION as
												| 'top-right'
												| 'bottom-right'
												| 'top-left'
												| 'bottom-left'
												| undefined) ?? 'bottom-right'
										}
									/>
								)}
							</>
						</Elements>
					</ThemeProvider>
				</QueryClientProvider>
			</RouteStateProvider>
		</AuthProvider>
	);
};

export default MyApp;
