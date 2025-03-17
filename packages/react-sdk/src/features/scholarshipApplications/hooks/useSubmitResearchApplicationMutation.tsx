import { useContext } from 'react';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { GeneralizedError } from 'ergonomic';
import { AuthContext } from 'ergonomic-react/src/features/authentication/providers/AuthProvider';
import {
	ResearchApplicationFormDataParams,
	ResearchApplicationFormDataResponse,
} from '@wallot/js';
import { submitResearchApplication } from '@wallot/react/src/features/scholarshipApplications/api/submitResearchApplication';

export function useSubmitResearchApplicationMutation(
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
			submitResearchApplication(firebaseUser, scholarshipApplicationId, params),
		{
			onError: (error: GeneralizedError) => {
				console.error('submitResearchApplication operation failed:', error);
			},
			onSuccess: (data: ResearchApplicationFormDataResponse) => {
				console.log('submitResearchApplication operation successful', data);
			},
			...(options ?? {}),
		},
	);
}
