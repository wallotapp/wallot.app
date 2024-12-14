import { GeneralizedResponse } from 'ergonomic';
import { Button } from 'ergonomic-react/src/components/ui/button';
import { stripePromise } from 'ergonomic-react/src/lib/stripe';
import { useToast } from 'ergonomic-react/src/components/ui/use-toast';
import {
	AlpacaAchRelationship,
	StripeFinancialConnectionSession,
} from '@wallot/js';
import { useCreateAlpacaAchRelationshipsMutation } from '@wallot/react/src/features/fundingAccounts/hooks/useCreateAlpacaAchRelationshipsMutation';
import { useCreateStripeFinancialConnectionSessionMutation } from '@wallot/react/src/features/fundingAccounts/hooks/useCreateStripeFinancialConnectionSessionMutation';
import { useState } from 'react';

const defaultErrorMessage =
	'We ran into a problem connecting your bank account';

export const ConnectBankAccountButton = () => {
	// Toaster
	const { toast } = useToast();

	// Alpaca ACH relationships
	const [alpacaAchRelationships, setAlpacaAchRelationships] = useState<
		AlpacaAchRelationship[]
	>([]);

	const {
		mutate: createAlpacaAchRelationships,
		isLoading: isCreateAlpacaAchRelationshipsRunning,
	} = useCreateAlpacaAchRelationshipsMutation({
		onError: ({ errors }: GeneralizedResponse) => {
			const error = errors[0]?.error.message || defaultErrorMessage;
			toast({
				title: 'Error',
				description: error,
			});
		},
		onSuccess: ({ data }: GeneralizedResponse<AlpacaAchRelationship>) => {
			setAlpacaAchRelationships(() => data);
			toast({
				title: 'Success',
				description: 'Bank account connected',
			});
			console.log('Alpaca ACH relationships created:', data);
		},
	});

	const {
		mutate: createStripeFinancialConnectionSession,
		isLoading: isCreateStripeFinancialConnectionSessionRunning,
	} = useCreateStripeFinancialConnectionSessionMutation({
		onError: ({ errors }: GeneralizedResponse) => {
			const error = errors[0]?.error.message || defaultErrorMessage;
			toast({
				title: 'Error',
				description: error,
			});
		},
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
			console.log(
				'Financial connections session:',
				financialConnectionsSession,
			);
			const { accounts } = financialConnectionsSession;
			const accountIds: string[] = accounts.map((account) => account.id);
			createAlpacaAchRelationships({
				stripe_financial_account_ids: accountIds,
			});
		},
	});

	const operationState =
		isCreateAlpacaAchRelationshipsRunning ||
		isCreateStripeFinancialConnectionSessionRunning
			? 'running'
			: 'idle';
	const isRunning = operationState === 'running';

	if (alpacaAchRelationships.length) {
		return (
			<Button disabled>
				{alpacaAchRelationships.length} bank account
				{alpacaAchRelationships.length > 1 ? 's' : ''} connected
			</Button>
		);
	}

	return (
		<Button
			onClick={() => createStripeFinancialConnectionSession({})}
			disabled={isRunning}
		>
			{isRunning ? 'Connecting...' : 'Connect your bank account'}
		</Button>
	);
};
