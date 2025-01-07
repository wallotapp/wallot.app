import { useMutation } from '@tanstack/react-query';
import { createNewsReport } from '@wallot/react/src/features/newsReports/api/createNewsReport';
import {
	CreateNewsReportMutationData,
	CreateNewsReportMutationError,
	CreateNewsReportMutationParams,
	UseCreateNewsReportMutationOptions,
} from '@wallot/react/src/features/newsReports/types/NewsReportReactTypes';

export function useCreateNewsReportMutation(
	options?: UseCreateNewsReportMutationOptions,
) {
	return useMutation<
		CreateNewsReportMutationData,
		CreateNewsReportMutationError,
		CreateNewsReportMutationParams
	>((params: CreateNewsReportMutationParams) => createNewsReport(params), {
		onError: (error: CreateNewsReportMutationError) => {
			console.error('Create operation failed:', error);
		},
		onSuccess: (data: CreateNewsReportMutationData) => {
			console.log('Create operation successful', data);
		},
		...(options ?? {}),
	});
}
