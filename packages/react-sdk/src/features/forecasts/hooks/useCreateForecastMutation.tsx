import { useMutation } from '@tanstack/react-query';
import { createForecast } from '@wallot/react/src/features/forecasts/api/createForecast';
import {
	CreateForecastMutationData,
	CreateForecastMutationError,
	CreateForecastMutationParams,
	UseCreateForecastMutationOptions,
} from '@wallot/react/src/features/forecasts/types/ForecastReactTypes';

export const useCreateForecastMutation = (
	options?: UseCreateForecastMutationOptions,
) => {
	return useMutation<
		CreateForecastMutationData,
		CreateForecastMutationError,
		CreateForecastMutationParams
	>(
		(params: CreateForecastMutationParams) =>
			createForecast(params),
		{
			onError: (error: CreateForecastMutationError) => {
				console.error('Create operation failed:', error);
			},
			onSuccess: (data: CreateForecastMutationData) => {
				console.log('Create operation successful', data);
			},
			...options,
		},
	);
};
