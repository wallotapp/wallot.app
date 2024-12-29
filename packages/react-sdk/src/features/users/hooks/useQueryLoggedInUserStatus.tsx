import { useQueryLoggedInUser } from '@wallot/react/src/features/users/hooks/useQueryLoggedInUser';
import { UserExperienceState } from '@wallot/js';

export type LoggedInUserStatus = {
	isLoggedInUserStatusLoading: boolean;
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

export const useQueryLoggedInUserStatus = (): LoggedInUserStatus => {
	const {} = useQueryLoggedInUser();
	return {
		isLoggedInUserStatusLoading: true,
		state: null,
		tasks: [],
	};
};
