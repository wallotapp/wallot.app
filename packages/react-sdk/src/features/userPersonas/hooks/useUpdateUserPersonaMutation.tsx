import { useMutation } from '@tanstack/react-query';
import { updateUserPersona } from '@wallot/react/src/features/userPersonas/api/updateUserPersona';
import {
	UpdateUserPersonaMutationData,
	UpdateUserPersonaMutationError,
	UpdateUserPersonaMutationParams,
	UseUpdateUserPersonaMutationOptions,
} from '@wallot/react/src/features/userPersonas/types/UserPersonaReactTypes';

export const useUpdateUserPersonaMutation = (
	options?: UseUpdateUserPersonaMutationOptions,
) => {
	return useMutation<
		UpdateUserPersonaMutationData,
		UpdateUserPersonaMutationError,
		UpdateUserPersonaMutationParams
	>((params: UpdateUserPersonaMutationParams) => updateUserPersona(params), {
		onError: (error: UpdateUserPersonaMutationError) => {
			console.error('Update operation failed:', error);
		},
		onSuccess: (data: UpdateUserPersonaMutationData) => {
			console.log('Update operation successful', data);
		},
		...options,
	});
};
