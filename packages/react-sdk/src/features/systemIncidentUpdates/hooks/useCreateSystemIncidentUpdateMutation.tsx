import { useMutation } from '@tanstack/react-query';
import { createSystemIncidentUpdate } from '@wallot/react/src/features/systemIncidentUpdates/api/createSystemIncidentUpdate';
import {
	CreateSystemIncidentUpdateMutationData,
	CreateSystemIncidentUpdateMutationError,
	CreateSystemIncidentUpdateMutationParams,
	UseCreateSystemIncidentUpdateMutationOptions,
} from '@wallot/react/src/features/systemIncidentUpdates/types/SystemIncidentUpdateReactTypes';

export const useCreateSystemIncidentUpdateMutation = (
	options?: UseCreateSystemIncidentUpdateMutationOptions,
) => {
	return useMutation<
		CreateSystemIncidentUpdateMutationData,
		CreateSystemIncidentUpdateMutationError,
		CreateSystemIncidentUpdateMutationParams
	>(
		(params: CreateSystemIncidentUpdateMutationParams) =>
			createSystemIncidentUpdate(params),
		{
			onError: (error: CreateSystemIncidentUpdateMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateSystemIncidentUpdateMutationData) => {
				console.log('Create operation successful', data);
			},
			...options,
		},
	);
};
