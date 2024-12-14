import { GeneralizedResponse } from 'ergonomic';
import { Button } from 'ergonomic-react/src/components/ui/button';
import { stripePromise } from 'ergonomic-react/src/lib/stripe';
import { useCreateStripeFinancialConnectionSessionMutation } from '@wallot/react/src/features/fundingAccounts/hooks/useCreateStripeFinancialConnectionSessionMutation';
import { StripeFinancialConnectionSession } from '@wallot/js';

export const ConnectBankAccountButton = () => {
	const {
		mutate: createStripeFinancialConnectionSession,
		isLoading: isCreateStripeFinancialConnectionSessionRunning,
	} = useCreateStripeFinancialConnectionSessionMutation({
		onSuccess: async ({
			data,
		}: GeneralizedResponse<StripeFinancialConnectionSession>) => {
			const clientSecret = data[0]?.client_secret as string;
			const stripe = await stripePromise;
			if (!stripe) return; // handle error
			const { financialConnectionsSession } =
				await stripe.collectFinancialConnectionsAccounts({
					clientSecret,
				});
			if (!financialConnectionsSession) {
				throw new Error('Failed to collect financial connections accounts');
			}
			const { accounts } = financialConnectionsSession;
			const accountIds: string[] = accounts.map((account) => account.id);
			// Pass the list of account IDs to the backend to establish the Alpaca ACH relationship
			console.log(accountIds);
		},
	});

	return (
		<Button
			onClick={() => createStripeFinancialConnectionSession({})}
			disabled={isCreateStripeFinancialConnectionSessionRunning}
		>
			{isCreateStripeFinancialConnectionSessionRunning
				? 'Connecting...'
				: 'Connect your bank account'}
		</Button>
	);
};
