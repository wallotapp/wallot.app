import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from 'ergonomic-react/src/components/ui/popover';
import cn from 'ergonomic-react/src/lib/cn';
import { SITE_ORIGIN } from 'ergonomic-react/src/config/originConfig';
import { Separator } from 'ergonomic-react/src/components/ui/separator';
import { useQueryLoggedInUser } from '@wallot/react/src/features/users/hooks/useQueryLoggedInUser';
import Link from 'next/link';
import { getHomeSiteRoute } from '@wallot/js';
import { useSiteOriginByTarget } from '@wallot/react/src/hooks/useSiteOriginByTarget';
import { useRouter } from 'next/router';

export type UserMenuPopover = BaseComponent & {
	TriggerComponent: React.ReactNode;
};
export function UserMenuPopover({
	TriggerComponent,
	className = '',
}: UserMenuPopover) {
	// const [isLoggingOut, setIsLoggingOut] = useState(false);
	const { loggedInUser } = useQueryLoggedInUser();
	// Router
	const router = useRouter();
	// Site Origin by Target
	const siteOriginByTarget = useSiteOriginByTarget();
	const homeSiteOrigin = siteOriginByTarget.HOME_SITE;
	const includeOrigin = SITE_ORIGIN === homeSiteOrigin;
	const onLogOut = () => void router.replace('/logout');

	return (
		<Popover>
			<PopoverTrigger asChild>{TriggerComponent}</PopoverTrigger>
			<PopoverContent className={cn('!p-0 w-fit', className)}>
				<div className='p-3'>
					<div>
						<p className='font-semibold'>
							{loggedInUser?.alpaca_account_identity?.given_name ||
								loggedInUser?.username}
						</p>
					</div>
					<div>
						<p className='text-gray-500 text-[0.66rem]'>
							{loggedInUser?.firebase_auth_email ?? ''}
						</p>
					</div>
				</div>
				<div>
					<Separator className='my-0.5' />
				</div>
				<div>
					{[
						{
							href: getHomeSiteRoute({
								includeOrigin,
								origin: homeSiteOrigin,
								queryParams: {},
								routeStaticId: 'HOME_SITE__/ACCOUNT/OVERVIEW',
							}),
							target: '_self',
							title: 'Account',
						},
						{
							href: getHomeSiteRoute({
								includeOrigin,
								origin: homeSiteOrigin,
								queryParams: {},
								routeStaticId: 'HOME_SITE__/TERMS',
							}),
							target: '_blank',
							title: 'Terms of Service',
						},
						{
							href: getHomeSiteRoute({
								includeOrigin,
								origin: homeSiteOrigin,
								queryParams: {},
								routeStaticId: 'HOME_SITE__/PRIVACY',
							}),
							target: '_blank',
							title: 'Privacy Policy',
						},
					].map(({ href, target, title }) => {
						return (
							<Link href={href} key={href} target={target}>
								<div
									className={cn(
										'group hover:bg-purple-50 px-3 py-1',
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
							'group hover:bg-purple-50 w-full text-left px-3 py-1.5',
							'duration-200 ease-in-out transition-all',
						)}
						disabled={false}
						type='button'
						onClick={onLogOut}
					>
						<div>
							<p
								className={cn(
									'group-hover:font-medium text-sm',
									'duration-200 ease-in-out transition-all',
								)}
							>
								Log Out
							</p>
						</div>
					</button>
				</div>
			</PopoverContent>
		</Popover>
	);
}
