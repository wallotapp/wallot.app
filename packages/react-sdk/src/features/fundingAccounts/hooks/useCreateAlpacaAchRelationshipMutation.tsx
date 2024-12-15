import { useContext } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import { createAlpacaAchRelationship } from '@wallot/react/src/features/fundingAccounts/api/createAlpacaAchRelationship';
import { GeneralizedResponse } from 'ergonomic';

export const useCreateAlpacaAchRelationshipMutation = (
	options?: UseMutationOptions<
		GeneralizedResponse<unknown>,
		GeneralizedResponse,
		unknown
	>,
) => {
	const { user: firebaseUser } = useContext(AuthContext);
	return useMutation<
		GeneralizedResponse<unknown>,
		GeneralizedResponse,
		unknown
	>((params: unknown) => createAlpacaAchRelationship(firebaseUser, params), {
		onError: (error: GeneralizedResponse) => {
			console.error('CreateAlpacaAchRelationship operation failed:', error);
		},
		onSuccess: (data: GeneralizedResponse<unknown>) => {
			console.log('CreateAlpacaAchRelationship operation successful', data);
		},
		...options,
	});
};
