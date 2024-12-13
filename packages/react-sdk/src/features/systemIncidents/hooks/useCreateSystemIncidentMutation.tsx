import { useMutation } from '@tanstack/react-query';
import { createSystemIncident } from '@wallot/react/src/features/systemIncidents/api/createSystemIncident';
import {
	CreateSystemIncidentMutationData,
	CreateSystemIncidentMutationError,
	CreateSystemIncidentMutationParams,
	UseCreateSystemIncidentMutationOptions,
} from '@wallot/react/src/features/systemIncidents/types/SystemIncidentReactTypes';

export const useCreateSystemIncidentMutation = (
	options?: UseCreateSystemIncidentMutationOptions,
) => {
	return useMutation<
		CreateSystemIncidentMutationData,
		CreateSystemIncidentMutationError,
		CreateSystemIncidentMutationParams
	>(
		(params: CreateSystemIncidentMutationParams) =>
			createSystemIncident(params),
		{
			onError: (error: CreateSystemIncidentMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateSystemIncidentMutationData) => {
				console.log('Create operation successful', data);
			},
			...options,
		},
	);
};
