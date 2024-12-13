import { useMutation } from '@tanstack/react-query';
import { updateSystemIncidentUpdate } from '@wallot/react/src/features/systemIncidentUpdates/api/updateSystemIncidentUpdate';
import {
	UpdateSystemIncidentUpdateMutationData,
	UpdateSystemIncidentUpdateMutationError,
	UpdateSystemIncidentUpdateMutationParams,
	UseUpdateSystemIncidentUpdateMutationOptions,
} from '@wallot/react/src/features/systemIncidentUpdates/types/SystemIncidentUpdateReactTypes';

export const useUpdateSystemIncidentUpdateMutation = (
	options?: UseUpdateSystemIncidentUpdateMutationOptions,
) => {
	return useMutation<
		UpdateSystemIncidentUpdateMutationData,
		UpdateSystemIncidentUpdateMutationError,
		UpdateSystemIncidentUpdateMutationParams
	>(
		(params: UpdateSystemIncidentUpdateMutationParams) =>
			updateSystemIncidentUpdate(params),
		{
			onError: (error: UpdateSystemIncidentUpdateMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateSystemIncidentUpdateMutationData) => {
				console.log('Update operation successful', data);
			},
			...options,
		},
	);
};
