import { default as cn } from 'ergonomic-react/src/lib/cn';
import { BaseComponentWithChildren } from 'ergonomic-react/src/types/BaseComponentTypes';
import { AuthenticatedPageHeader } from '@wallot/react/src/components/AuthenticatedPageHeader';
import { PageActionHeader } from '@wallot/react/src/components/PageActionHeader';

export type AccountDashboardPageProps = BaseComponentWithChildren;
export const AccountDashboardPage: React.FC<AccountDashboardPageProps> = ({
	children,
}) => {
	const accountSettings = [
		'Overview',
		'Positions',
		'Transactions',
		'Statements',
		'Billing Information',
		'Plans',
		'Bank Accounts',
	];
	return (
		<div className={cn('flex flex-col min-h-screen min-w-screen relative')}>
			<AuthenticatedPageHeader showHomeLink={false} />
			<PageActionHeader />
			<div
				className={cn('min-h-[95vh] w-full', 'py-40 px-6', 'lg:py-40 lg:px-28')}
			>
				<div>
					<p className='font-semibold text-3xl'>Account</p>
				</div>
				<div className={cn('mt-4', 'lg:flex lg:items-center lg:space-x-12')}>
					{accountSettings.map((setting) => {
						return (
							<div key={setting} className='flex items-center'>
								<p className='text-sm'>{setting}</p>
							</div>
						);
					})}
				</div>
				<div className='mt-4'>{children}</div>
			</div>
		</div>
	);
};
