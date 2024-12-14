import { useContext } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import {
	CreateAlpacaAchRelationshipParams,
	AlpacaAchRelationship,
} from '@wallot/js';
import { createAlpacaAchRelationship } from '@wallot/react/src/features/fundingAccounts/api/createAlpacaAchRelationship';
import { GeneralizedResponse } from 'ergonomic';

export const useCreateAlpacaAchRelationshipMutation = (
	options?: UseMutationOptions<
		GeneralizedResponse<AlpacaAchRelationship>,
		GeneralizedResponse,
		CreateAlpacaAchRelationshipParams[]
	>,
) => {
	const { user: firebaseUser } = useContext(AuthContext);
	return useMutation<
		GeneralizedResponse<AlpacaAchRelationship>,
		GeneralizedResponse,
		CreateAlpacaAchRelationshipParams[]
	>(
		(params: CreateAlpacaAchRelationshipParams[]) =>
			createAlpacaAchRelationship(firebaseUser, params),
		{
			onError: (error: GeneralizedResponse) => {
				console.error('CreateAlpacaAchRelationship operation failed:', error);
			},
			onSuccess: (data: GeneralizedResponse<AlpacaAchRelationship>) => {
				console.log('CreateAlpacaAchRelationship operation successful', data);
			},
			...options,
		},
	);
};
