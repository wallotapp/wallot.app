import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { User } from '@wallot/js';
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from 'ergonomic-react/src/components/ui/avatar';

export type UserNameTagProps = BaseComponent & {
	user: User | undefined;
	showSubtitle?: 'email' | 'username' | false;
};
export const UserNameTag: React.FC<UserNameTagProps> = ({
	className = '',
	user,
	showSubtitle = false,
}) => {
	return (
		<div
			className={cn('flex items-center px-4 py-3 space-x-2 w-full', className)}
		>
			<div>
				<Avatar className='!h-7 !w-7'>
					<AvatarImage src={undefined} alt='User' />
					<AvatarFallback className='!bg-gradient-to-t !from-brand-light !to-brand-dark !text-white text-xs'>
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
							{user?.firebase_auth_emails?.[0]}
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
