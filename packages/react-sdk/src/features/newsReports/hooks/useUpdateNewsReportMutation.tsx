import { useMutation } from '@tanstack/react-query';
import { updateNewsReport } from '@wallot/react/src/features/newsReports/api/updateNewsReport';
import {
	UpdateNewsReportMutationData,
	UpdateNewsReportMutationError,
	UpdateNewsReportMutationParams,
	UseUpdateNewsReportMutationOptions,
} from '@wallot/react/src/features/newsReports/types/NewsReportReactTypes';

export const useUpdateNewsReportMutation = (
	options?: UseUpdateNewsReportMutationOptions,
) => {
	return useMutation<
		UpdateNewsReportMutationData,
		UpdateNewsReportMutationError,
		UpdateNewsReportMutationParams
	>((params: UpdateNewsReportMutationParams) => updateNewsReport(params), {
		onError: (error: UpdateNewsReportMutationError) => {
			console.error('Update operation failed:', error);
		},
		onSuccess: (data: UpdateNewsReportMutationData) => {
			console.log('Update operation successful', data);
		},
		...options,
	});
};
