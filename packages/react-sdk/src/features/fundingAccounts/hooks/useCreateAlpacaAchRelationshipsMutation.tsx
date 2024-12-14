import { useContext } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import {
	CreateAlpacaAchRelationshipsParams,
	AlpacaAchRelationship,
} from '@wallot/js';
import { createAlpacaAchRelationships } from '@wallot/react/src/features/fundingAccounts/api/createAlpacaAchRelationships';
import { GeneralizedResponse } from 'ergonomic';

export const useCreateAlpacaAchRelationshipsMutation = (
	options?: UseMutationOptions<
		GeneralizedResponse<AlpacaAchRelationship>,
		GeneralizedResponse,
		CreateAlpacaAchRelationshipsParams
	>,
) => {
	const { user: firebaseUser } = useContext(AuthContext);
	return useMutation<
		GeneralizedResponse<AlpacaAchRelationship>,
		GeneralizedResponse,
		CreateAlpacaAchRelationshipsParams
	>(
		(params: CreateAlpacaAchRelationshipsParams) =>
			createAlpacaAchRelationships(firebaseUser, params),
		{
			onError: (error: GeneralizedResponse) => {
				console.error('CreateAlpacaAchRelationships operation failed:', error);
			},
			onSuccess: (data: GeneralizedResponse<AlpacaAchRelationship>) => {
				console.log('CreateAlpacaAchRelationships operation successful', data);
			},
			...options,
		},
	);
};
