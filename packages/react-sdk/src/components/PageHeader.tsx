import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { default as cn } from 'ergonomic-react/src/lib/cn';
import { FiMenu } from 'react-icons/fi';
import { Sheet, SheetContent, SheetTrigger } from 'ergonomic-react/src/components/ui/sheet';
import { Fragment } from 'react';
import { BlogLink } from './BlogLink';
import { HomeLink } from './HomeLink';
import { KnowledgeBaseLink } from './KnowledgeBaseLink';
import { LoginButton } from './LoginButton';
import { LoginLink } from './LoginLink';
import { LogoButton } from './LogoButton';
import { RegisterButton } from './RegisterButton';
import { SupportLink } from './SupportLink';

export type PageHeaderProps = BaseComponent & {
	getCustomLogoButton?: (props: BaseComponent) => JSX.Element;
	showHomeLink?: boolean;
};
export const PageHeader: React.FC<PageHeaderProps> = ({ className = '', getCustomLogoButton, showHomeLink = true }) => {
	// ==== Components ==== //
	const navbarComponents = [showHomeLink ? { Component: HomeLink, key: 'Home' } : null, { Component: KnowledgeBaseLink, key: 'Learn' }, { Component: SupportLink, key: 'Support' }, { Component: BlogLink, key: 'Blog' }].filter(
		(x): x is Exclude<typeof x, null> => x != null,
	);

	// ==== Render ==== //
	return (
		<div className={cn('border-b border-b-gray-300 dark:border-b-gray-800 flex h-12 items-center justify-between px-6 fixed top-0 left-0 w-full z-10', 'lg:px-28', 'bg-white dark:bg-[#020611]', className)}>
			<div className='flex items-center space-x-6'>
				<LogoButton getCustomLogoButton={getCustomLogoButton} />
				<div className={cn('hidden', 'lg:flex lg:items-center lg:w-fit lg:space-x-4')}>
					{navbarComponents.map(({ Component, key }) => {
						return <Component key={key} />;
					})}
				</div>
			</div>
			<div className={cn('hidden', 'lg:flex lg:items-center lg:w-fit lg:space-x-4')}>
				<LoginButton />
				<RegisterButton />
			</div>
			<Sheet>
				<SheetTrigger asChild>
					<div className='lg:hidden'>
						<FiMenu className='text-2xl text-gray-500 dark:text-gray-400 cursor-pointer' />
					</div>
				</SheetTrigger>
				<SheetContent>
					<div className='flex flex-col gap-4'>
						<LogoButton className='mb-4' getCustomLogoButton={getCustomLogoButton} />
						{navbarComponents.map(({ Component, key }) => {
							return (
								<Fragment key={key}>
									<Component />
									<hr />
								</Fragment>
							);
						})}
						<LoginLink />
						<hr />
						<RegisterButton />
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
};
