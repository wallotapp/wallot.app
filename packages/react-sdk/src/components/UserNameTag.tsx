import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { User } from '@wallot/js';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from 'ergonomic-react/src/components/ui/avatar';
import { useQueryAuthCredentialPage } from '@wallot/react/src/features/authCredentials';

export type UserNameTagProps = BaseComponent & {
	user: User | undefined;
	showSubtitle?: 'email' | 'username' | false;
};
export const UserNameTag: React.FC<UserNameTagProps> = ({
	className = '',
	user,
	showSubtitle = false,
}) => {
	// User Auth Credential
	const { data: userAuthCredential } = useQueryAuthCredentialPage({
		firestoreQueryOptions: {
			whereClauses: [['user', '==', user?._id]],
		},
		reactQueryOptions: {
			enabled: user?._id != null && showSubtitle === 'email',
		},
	});

	return (
		<div
			className={cn(
				'flex items-center px-4 py-3 space-x-2 w-full',
				// ''
				className,
			)}
		>
			<div>
				<Avatar className='!h-7 !w-7'>
					<AvatarImage src={undefined} alt='User' />
					<AvatarFallback className='!bg-gray-700 !text-white text-xs'>
						{(
							user?.alpaca_account_identity?.given_name?.[0] ??
							user?.username?.[0] ??
							''
						).toUpperCase() || <>&nbsp;</>}
					</AvatarFallback>
				</Avatar>
			</div>
			<div>
				<div>
					<p className='font-semibold text-sm'>
						{user?.alpaca_account_identity?.given_name ??
							user?.username ??
							'User'}
					</p>
				</div>
				{showSubtitle === 'email' && (
					<div>
						<p className={cn('text-gray-500 text-[0.75rem]')}>
							{userAuthCredential?.documents?.[0]?.emails?.[0]}
						</p>
					</div>
				)}
				{showSubtitle === 'username' && (
					<div>
						<p className={cn('text-gray-500 text-[0.75rem]')}>
							{user?.username}
						</p>
					</div>
				)}
			</div>
		</div>
	);
};
