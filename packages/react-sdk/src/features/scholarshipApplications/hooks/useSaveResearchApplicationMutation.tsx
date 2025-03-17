import { useContext } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { GeneralizedError } from 'ergonomic';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import {
	ResearchApplicationFormDataParams,
	ResearchApplicationFormDataResponse,
} from '@wallot/js';
import { saveResearchApplication } from '@wallot/react/src/features/scholarshipApplications/api/saveResearchApplication';

export function useSaveResearchApplicationMutation(
	scholarshipApplicationId: string | null,
	options?: UseMutationOptions<
		ResearchApplicationFormDataResponse,
		GeneralizedError,
		ResearchApplicationFormDataParams
	>,
) {
	const { user: firebaseUser } = useContext(AuthContext);
	return useMutation<
		ResearchApplicationFormDataResponse,
		GeneralizedError,
		ResearchApplicationFormDataParams
	>(
		(params: ResearchApplicationFormDataParams) =>
			saveResearchApplication(firebaseUser, scholarshipApplicationId, params),
		{
			onError: (error: GeneralizedError) => {
				console.error('saveResearchApplication operation failed:', error);
			},
			onSuccess: (data: ResearchApplicationFormDataResponse) => {
				console.log('saveResearchApplication operation successful', data);
			},
			...(options ?? {}),
		},
	);
}
