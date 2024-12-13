import { useMutation } from '@tanstack/react-query';
import { createTeam } from '@wallot/react/src/features/teams/api/createTeam';
import {
	CreateTeamMutationData,
	CreateTeamMutationError,
	CreateTeamMutationParams,
	UseCreateTeamMutationOptions,
} from '@wallot/react/src/features/teams/types/TeamReactTypes';

export const useCreateTeamMutation = (
	options?: UseCreateTeamMutationOptions,
) => {
	return useMutation<
		CreateTeamMutationData,
		CreateTeamMutationError,
		CreateTeamMutationParams
	>(
		(params: CreateTeamMutationParams) =>
			createTeam(params),
		{
			onError: (error: CreateTeamMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateTeamMutationData) => {
				console.log('Create operation successful', data);
			},
			...options,
		},
	);
};
