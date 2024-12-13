import { useMutation } from '@tanstack/react-query';
import { updateSystemIncident } from '@wallot/react/src/features/systemIncidents/api/updateSystemIncident';
import {
	UpdateSystemIncidentMutationData,
	UpdateSystemIncidentMutationError,
	UpdateSystemIncidentMutationParams,
	UseUpdateSystemIncidentMutationOptions,
} from '@wallot/react/src/features/systemIncidents/types/SystemIncidentReactTypes';

export const useUpdateSystemIncidentMutation = (
	options?: UseUpdateSystemIncidentMutationOptions,
) => {
	return useMutation<
		UpdateSystemIncidentMutationData,
		UpdateSystemIncidentMutationError,
		UpdateSystemIncidentMutationParams
	>(
		(params: UpdateSystemIncidentMutationParams) =>
			updateSystemIncident(params),
		{
			onError: (error: UpdateSystemIncidentMutationError) => {
				console.error('Update operation failed:', error);
			},
			onSuccess: (data: UpdateSystemIncidentMutationData) => {
				console.log('Update operation successful', data);
			},
			...options,
		},
	);
};
