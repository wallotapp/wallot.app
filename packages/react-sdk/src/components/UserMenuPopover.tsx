import { signOut } from 'firebase/auth';
import { firebaseAuthInstance } from 'ergonomic-react/src/lib/firebase';
import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from 'ergonomic-react/src/components/ui/popover';
import cn from 'ergonomic-react/src/lib/cn';
import { Separator } from 'ergonomic-react/src/components/ui/separator';
import { useQueryCurrentUser } from '@wallot/react/src/features/users';
import { useQueryCurrentAuthCredential } from '@wallot/react/src/features/authCredentials';
import Link from 'next/link';
import { useState } from 'react';
import { getHomeWebAppRoute } from '@wallot/js';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';

export type UserMenuPopover = BaseComponent & {
	TriggerComponent: React.ReactNode;
};
export const UserMenuPopover: React.FC<UserMenuPopover> = ({
	TriggerComponent,
	className = '',
}) => {
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const { currentAuthCredential } = useQueryCurrentAuthCredential();
	const { currentUser } = useQueryCurrentUser();
	// Site Origin by Target
	const siteOriginByTarget = useSiteOriginByTarget();
	const onLogOut = () => {
		return void (async () => {
			try {
				setIsLoggingOut(true);

				// Sign out of Firebase Auth
				await signOut(firebaseAuthInstance);
			} catch (err) {
				console.error(err);
			} finally {
				setIsLoggingOut(false);
			}
		})();
	};
	return (
		<Popover>
			<PopoverTrigger asChild>{TriggerComponent}</PopoverTrigger>
			<PopoverContent className={cn('!p-0 w-fit', className)}>
				<div className='p-3'>
					<div>
						<p className='font-semibold'>
							{currentUser?.alpaca_account_identity?.given_name ||
								currentUser?.username}
						</p>
					</div>
					<div>
						<p className='text-gray-500 text-[0.66rem]'>
							{currentAuthCredential?.emails?.[0]}
						</p>
					</div>
				</div>
				<div>
					<Separator className='my-0.5' />
				</div>
				<div>
					{[
						{
							href: getHomeWebAppRoute({
								includeOrigin: true,
								origin: siteOriginByTarget['HOME_WEB_APP'],
								queryParams: {},
								routeStaticId: 'HOME_WEB_APP__/INDEX',
							}),
							title: 'Terms of Service',
						},
						{
							href: getHomeWebAppRoute({
								includeOrigin: true,
								origin: siteOriginByTarget['HOME_WEB_APP'],
								queryParams: {},
								routeStaticId: 'HOME_WEB_APP__/INDEX',
							}),
							title: 'Privacy Policy',
						},
					].map(({ href, title }) => {
						return (
							<Link href={href} key={href} target='_blank'>
								<div
									className={cn(
										'group hover:bg-orange-50 px-3 py-1',
										'duration-200 ease-in-out transition-all',
									)}
								>
									<p
										className={cn(
											'group-hover:font-medium text-sm',
											'duration-200 ease-in-out transition-all',
										)}
									>
										{title}
									</p>
								</div>
							</Link>
						);
					})}
				</div>
				<div>
					<Separator className='my-0.5' />
				</div>
				<div className=''>
					<button
						className={cn(
							'group hover:bg-orange-50 w-full text-left px-3 py-1.5',
							'duration-200 ease-in-out transition-all',
						)}
						disabled={false}
						type='button'
						onClick={onLogOut}
					>
						<div>
							{isLoggingOut ? (
								<>
									<div className='flex items-center space-x-2'>
										<div
											className={cn(
												'w-4 h-4 border-2 border-gray-200 rounded-full animate-spin',
												'border-t-brand border-r-brand border-b-brand',
											)}
										></div>
									</div>
								</>
							) : (
								<p
									className={cn(
										'group-hover:font-medium text-sm',
										'duration-200 ease-in-out transition-all',
									)}
								>
									Log Out
								</p>
							)}
						</div>
					</button>
				</div>
			</PopoverContent>
		</Popover>
	);
};
