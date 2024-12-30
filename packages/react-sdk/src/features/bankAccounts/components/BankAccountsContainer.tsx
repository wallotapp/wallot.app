import * as R from 'ramda';
import { Fragment, useEffect, useState } from 'react';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { getSsoSiteRoute, isBankAccountTokenized } from '@wallot/js';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { Separator } from 'ergonomic-react/src/components/ui/separator';
import { useQueryLoggedInUser } from '@wallot/react/src/features/users/hooks/useQueryLoggedInUser';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import { GoCheckCircleFill, GoPlus } from 'react-icons/go';
import { useQueryBankAccountsForLoggedInUser } from '@wallot/react/src/features/bankAccounts/hooks/useQueryBankAccountsForLoggedInUser';
import { Skeleton } from 'ergonomic-react/src/components/ui/skeleton';
import { stripePromise } from 'ergonomic-react/src/lib/stripe';
import { useAuthenticatedRouteRedirect } from 'ergonomic-react/src/features/authentication/hooks/useAuthenticatedRouteRedirect';
import { BsFillCaretDownFill, BsFillCaretRightFill } from 'react-icons/bs';
import { BankIcon } from '@wallot/react/src/components/BankIcon';
import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { BankAccountManager } from '@wallot/react/src/features/bankAccounts/components/BankAccountManager';
import { useCreateStripeFinancialConnectionsSessionMutation } from '@wallot/react/src/features/bankAccounts/hooks/useCreateStripeFinancialConnectionsSessionMutation';
import { useConnectBankAccountsMutation } from '@wallot/react/src/features/bankAccounts/hooks/useConnectBankAccountsMutation';

export type BankAccountsContainerProps = BaseComponent & {
	/** Should each Institutions accordion begin in their open state, defaults to `true` */
	defaultInstitutionAccordionsOpen?: boolean;
	/** Use this for instance if the parent component has a form that is submitting */
	disableConnectionCallback: boolean;
};
export function BankAccountsContainer({
	className = '',
	defaultInstitutionAccordionsOpen = true,
	disableConnectionCallback,
}: BankAccountsContainerProps) {
	// ==== Hooks ==== //

	// Site Origin by Target
	const siteOriginByTarget = useSiteOriginByTarget();

	// Auth
	useAuthenticatedRouteRedirect({
		authSiteOrigin: siteOriginByTarget.SSO_SITE,
		loginRoutePath: getSsoSiteRoute({
			includeOrigin: false,
			origin: null,
			queryParams: {},
			routeStaticId: 'SSO_SITE__/LOGIN',
		}),
		shouldPauseFirebaseAuthRedirects: false,
	});

	// Toaster
	const { toast } = useToast();

	// Current User
	const { loggedInUser, isLoggedInUserLoading } = useQueryLoggedInUser();
	const defaultBankAccountId = loggedInUser?.default_bank_account ?? 'null';

	// Bank Accounts for Logged In User
	const {
		resourcesForLoggedInUser: bankAccountsForLoggedInUserUnsorted,
		isResourcePageLoading: isBankAccountPageLoading,
		refetch: refetchBankAccountsForLoggedInUser,
	} = useQueryBankAccountsForLoggedInUser();
	const bankAccountsForLoggedInUser =
		bankAccountsForLoggedInUserUnsorted.toSorted(
			// Put the default bank account first
			(a, b) => {
				if (a._id === defaultBankAccountId) {
					return -1;
				}
				if (b._id === defaultBankAccountId) {
					return 1;
				}
				return 0;
			},
		);
	const userHasAtLeastOneBankAccount = bankAccountsForLoggedInUser.length > 0;
	const defaultBankAccount = bankAccountsForLoggedInUser.find(
		({ _id }) => _id === defaultBankAccountId,
	);
	const isDefaultBankAccountTokenized =
		defaultBankAccount != null && isBankAccountTokenized(defaultBankAccount);
	const [institutionAccordionsClosed, setInstitutionAccordionsClosed] =
		useState<string[]>([]);
	const isInstitutionAccordionClosed = (institutionName: string) => {
		return institutionAccordionsClosed.includes(institutionName);
	};
	const toggleInstitutionAccordion = (institutionName: string) => () => {
		setInstitutionAccordionsClosed((prev) =>
			prev.includes(institutionName)
				? prev.filter((x) => x !== institutionName)
				: [...prev, institutionName],
		);
	};
	const bankAccountsByInstitution = R.groupBy(
		({ institution_name }) => institution_name ?? 'Bank',
		bankAccountsForLoggedInUser,
	);
	const [
		bankAccountIdsWithTokenizationFormShown,
		setBankAccountIdsWithTokenizationFormShown,
	] = useState<string[]>([]);
	const isTokenizationFormShown = (bankAccountId: string) => {
		return bankAccountIdsWithTokenizationFormShown.includes(bankAccountId);
	};
	const toggleTokenizationFormShown = (bankAccountId: string) => () => {
		setBankAccountIdsWithTokenizationFormShown((prev) =>
			prev.includes(bankAccountId)
				? prev.filter((x) => x !== bankAccountId)
				: [...prev, bankAccountId],
		);
	};
	const [
		bankAccountIdsWithRoutingNumberShown,
		setBankAccountIdsWithRoutingNumberShown,
	] = useState<string[]>([]);
	const isRoutingNumberShown = (bankAccountId: string) => {
		return bankAccountIdsWithRoutingNumberShown.includes(bankAccountId);
	};
	const toggleRoutingNumberShown = (bankAccountId: string) => () => {
		setBankAccountIdsWithRoutingNumberShown((prev) =>
			prev.includes(bankAccountId)
				? prev.filter((x) => x !== bankAccountId)
				: [...prev, bankAccountId],
		);
	};

	// Mutation
	const {
		mutate: connectBankAccounts,
		isLoading: isConnectBankAccountsRunning,
	} = useConnectBankAccountsMutation({
		onError: ({ error: { message } }) => {
			// Show the error message
			toast({
				title: 'Error connecting to your bank account',
				description: message,
			});
		},
		onSuccess: async () => {
			// Refetch the bank accounts
			await refetchBankAccountsForLoggedInUser();

			// Show success toast
			toast({
				title: 'Success',
				description: 'Connecting your bank accounts...',
			});
		},
	});
	const {
		mutate: createStripeFinancialConnectionSession,
		isLoading: isCreateStripeFinancialConnectionSessionRunning,
	} = useCreateStripeFinancialConnectionsSessionMutation({
		onError: ({ error: { message } }) => {
			// Show the error message
			toast({
				title: 'Error connecting to your bank account',
				description: message,
			});
		},
		onSuccess: async ({ client_secret: clientSecret }) => {
			const stripe = await stripePromise;
			if (!stripe) {
				toast({
					title: 'Error',
					description: 'Failed to connect to Stripe',
				});
				return;
			}
			const { financialConnectionsSession } =
				await stripe.collectFinancialConnectionsAccounts({
					clientSecret,
				});
			if (!financialConnectionsSession) {
				throw new Error('Failed to collect financial connections accounts');
			}
			console.log(
				'Financial connections session:',
				financialConnectionsSession,
			);
			connectBankAccounts({
				stripe_financial_connections_accounts:
					financialConnectionsSession.accounts,
			});
		},
	});

	// Form
	const isConnectBankButtonDisabled =
		disableConnectionCallback ||
		isConnectBankAccountsRunning ||
		isCreateStripeFinancialConnectionSessionRunning;

	// ==== Effects ==== //
	const [
		isBankAccountInterfaceInitialized,
		setIsBankAccountInterfaceInitialized,
	] = useState(false);
	useEffect(() => {
		if (isBankAccountInterfaceInitialized) return;
		if (isBankAccountPageLoading) return;
		if (isLoggedInUserLoading) return;
		if (defaultBankAccount == null) return;

		setIsBankAccountInterfaceInitialized(true);

		if (!defaultInstitutionAccordionsOpen) {
			setInstitutionAccordionsClosed(() =>
				Object.keys(bankAccountsByInstitution),
			);
		}

		if (isDefaultBankAccountTokenized) return;

		setBankAccountIdsWithTokenizationFormShown([defaultBankAccount._id]);
	}, [
		defaultInstitutionAccordionsOpen,
		isLoggedInUserLoading,
		isBankAccountPageLoading,
		defaultBankAccount,
		isDefaultBankAccountTokenized,
		isBankAccountInterfaceInitialized,
	]);

	return (
		<div
			className={cn(
				'rounded-xl bg-white border px-5 py-6 w-full text-left',
				isDefaultBankAccountTokenized ? 'border-slate-400' : 'border-slate-200',
				className,
			)}
		>
			<div className='flex justify-between'>
				<div className='flex items-center space-x-2'>
					{isDefaultBankAccountTokenized && (
						<div>
							<GoCheckCircleFill className='text-2xl text-slate-700 font-semibold' />
						</div>
					)}
					<div>
						<p className='font-semibold text-xl'>Payment</p>
					</div>
				</div>
				{isBankAccountPageLoading ? (
					<div>
						<Skeleton className='w-36 h-8' />
					</div>
				) : (
					<div>
						<button
							className={cn(
								'bg-slate-50 border border-slate-300',
								'flex items-center justify-center space-x-2',
								'rounded-md text-center p-2 w-fit',
							)}
							type='button'
							disabled={isConnectBankButtonDisabled}
							onClick={() => createStripeFinancialConnectionSession({})}
						>
							<Fragment>
								<div>
									<GoPlus />
								</div>
								<div>
									<p className='font-normal text-sm'>
										Add
										{userHasAtLeastOneBankAccount ? ' another' : ' a'} bank
										account
									</p>
								</div>
							</Fragment>
						</button>
					</div>
				)}
			</div>
			{userHasAtLeastOneBankAccount && (
				<Fragment>
					<Separator className='my-5' />
					<div className=''>
						<div>
							<p className='font-semibold text-base'>Linked Accounts</p>
						</div>
						<div>
							<p className='font-light text-sm'>
								Manage the linked accounts that fund your Wallot account
							</p>
						</div>
						<div className='mt-4'>
							{Object.entries(bankAccountsByInstitution).map(
								([institutionName, bankAccounts = []], institutionGroupIdx) => {
									const isInstitutionAccordionOpen =
										!isInstitutionAccordionClosed(institutionName);
									return (
										<div
											className={cn(institutionGroupIdx > 0 ? 'mt-6' : '')}
											key={institutionName}
										>
											<div
												className={cn(
													'flex items-center space-x-3',
													'cursor-pointer',
												)}
												onClick={toggleInstitutionAccordion(institutionName)}
											>
												<div>
													{isInstitutionAccordionOpen ? (
														<BsFillCaretDownFill className='text-gray-400 text-xs' />
													) : (
														<BsFillCaretRightFill className='text-gray-400 text-xs' />
													)}
												</div>
												<div>
													<BankIcon
														bankName={institutionName}
														showBankNameAsTitle
														subtitle={`${bankAccounts.length} linked account${
															bankAccounts.length > 1 ? 's' : ''
														}`}
													/>
												</div>
											</div>
											<div
												className={cn(
													'overflow-hidden mt-4 px-6',
													isInstitutionAccordionOpen ? '' : 'hidden',
												)}
											>
												{bankAccounts.map((bankAccount) => {
													return (
														<BankAccountManager
															bankAccount={bankAccount}
															isRoutingNumberShown={isRoutingNumberShown}
															isTokenizationFormShown={isTokenizationFormShown}
															key={bankAccount._id}
															refetchBankAccountsForLoggedInUser={
																refetchBankAccountsForLoggedInUser
															}
															toggleRoutingNumberShown={
																toggleRoutingNumberShown
															}
															toggleTokenizationFormShown={
																toggleTokenizationFormShown
															}
														/>
													);
												})}
											</div>
										</div>
									);
								},
							)}
						</div>
					</div>
				</Fragment>
			)}
		</div>
	);
}
