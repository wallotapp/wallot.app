import { useQueryCurrentUser } from '@wallot/react/src/features/users/hooks/useQueryCurrentUser';
import { UserExperienceState } from '@wallot/js';

export type CurrentUserStatus = {
	isCurrentUserStatusLoading: boolean;
	state: UserExperienceState | null;
	tasks:
		| {
				ctaHref: string;
				ctaText: string;
				subtitle: string;
				title: string;
		  }[]
		| null;
};

export const useQueryCurrentUserStatus = (): CurrentUserStatus => {
	const {} = useQueryCurrentUser();
	return {
		isCurrentUserStatusLoading: true,
		state: null,
		tasks: [],
	};
};
