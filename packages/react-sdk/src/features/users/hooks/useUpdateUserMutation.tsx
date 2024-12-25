import { useMutation } from '@tanstack/react-query';
import { updateUser } from '@wallot/react/src/features/users/api/updateUser';
import {
	UpdateUserMutationData,
	UpdateUserMutationError,
	UpdateUserMutationParams,
	UseUpdateUserMutationOptions,
} from '@wallot/react/src/features/users/types/UserReactTypes';

export const useUpdateUserMutation = (
	options?: UseUpdateUserMutationOptions,
) => {
	return useMutation<
		UpdateUserMutationData,
		UpdateUserMutationError,
		UpdateUserMutationParams
	>((params: UpdateUserMutationParams) => updateUser(params), {
		onError: (error: UpdateUserMutationError) => {
			console.error('Update operation failed:', error);
		},
		onSuccess: (data: UpdateUserMutationData) => {
			console.log('Update operation successful', data);
		},
		...(options ?? {}),
	});
};
