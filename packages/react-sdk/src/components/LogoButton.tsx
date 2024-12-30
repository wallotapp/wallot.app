import Link from 'next/link';
import { PlatformLogo } from 'ergonomic-react/src/components/brand/PlatformLogo';
import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { OPEN_GRAPH_CONFIG } from 'ergonomic-react/src/config/openGraphConfig';

export function LogoButton({
	className = '',
	getCustomLogoButton,
}: BaseComponent & {
	getCustomLogoButton?: (props: BaseComponent) => JSX.Element;
}) {
	const darkModeSrc = OPEN_GRAPH_CONFIG.siteBrandLogoDarkMode as string;
	const lightModeSrc = OPEN_GRAPH_CONFIG.siteBrandLogoLightMode as string;
	if (getCustomLogoButton == null)
		return (
			<Link className={className} href='/'>
				<PlatformLogo
					height={380}
					size='md'
					srcMap={{
						dark: darkModeSrc,
						light: lightModeSrc,
					}}
					width={2048}
				/>
			</Link>
		);

	return getCustomLogoButton({ className });
}
