import type { NextPage } from 'next';
import { Fragment } from 'react';
import { useIsMounted } from 'ergonomic-react/src/hooks/useIsMounted';

const Page: NextPage = () => {
	const isMounted = useIsMounted();

	if (!isMounted) {
		return null;
	}

	return (
		<Fragment>
			<div className='p-10'>
				<div>
					<p>Here's some MDX</p>
				</div>
				<div>Let us know if you like it!</div>
			</div>
		</Fragment>
	);
};

export default Page;
