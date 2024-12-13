import { useMutation } from '@tanstack/react-query';
import { updateTeam } from '@wallot/react/src/features/teams/api/updateTeam';
import {
	UpdateTeamMutationData,
	UpdateTeamMutationError,
	UpdateTeamMutationParams,
	UseUpdateTeamMutationOptions,
} from '@wallot/react/src/features/teams/types/TeamReactTypes';

export const useUpdateTeamMutation = (
	options?: UseUpdateTeamMutationOptions,
) => {
	return useMutation<
		UpdateTeamMutationData,
		UpdateTeamMutationError,
		UpdateTeamMutationParams
	>((params: UpdateTeamMutationParams) => updateTeam(params), {
		onError: (error: UpdateTeamMutationError) => {
			console.error('Update operation failed:', error);
		},
		onSuccess: (data: UpdateTeamMutationData) => {
			console.log('Update operation successful', data);
		},
		...options,
	});
};
