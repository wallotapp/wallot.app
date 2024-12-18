import { useMutation } from '@tanstack/react-query';
import { updateForecast } from '@wallot/react/src/features/forecasts/api/updateForecast';
import {
	UpdateForecastMutationData,
	UpdateForecastMutationError,
	UpdateForecastMutationParams,
	UseUpdateForecastMutationOptions,
} from '@wallot/react/src/features/forecasts/types/ForecastReactTypes';

export const useUpdateForecastMutation = (
	options?: UseUpdateForecastMutationOptions,
) => {
	return useMutation<
		UpdateForecastMutationData,
		UpdateForecastMutationError,
		UpdateForecastMutationParams
	>((params: UpdateForecastMutationParams) => updateForecast(params), {
		onError: (error: UpdateForecastMutationError) => {
			console.error('Update operation failed:', error);
		},
		onSuccess: (data: UpdateForecastMutationData) => {
			console.log('Update operation successful', data);
		},
		...(options ?? {}),
	});
};
