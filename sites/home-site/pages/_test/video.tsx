import type { NextPage } from 'next';
import { Fragment } from 'react';
import { useIsMounted } from 'ergonomic-react/src/hooks/useIsMounted';
const videoSrc =
	'https://firebasestorage.googleapis.com/v0/b/app-wallot-production.appspot.com/o/_test%2FIMG_0297.mp4?alt=media&token=7ef0ecf4-c2e4-4336-852c-104c67b994d8';

const Page: NextPage = () => {
	const isMounted = useIsMounted();

	if (!isMounted) {
		return null;
	}

	return (
		<Fragment>
			<div className=''>
				<div>
					<p>Here's a nice video</p>
				</div>
				<div className=''>
					<video
						controls
						tabIndex={-1}
						className='!rounded-lg video-js max-h-96 h-96 max-w-[42.67rem] w-[42.67rem]'
						data-ready='true'
						data-setup='{}'
					>
						<source src={videoSrc} type='video/mp4' />
						{/* adjust MIME type as needed */}
						<p className='vjs-no-js'>
							To view this video please enable JavaScript, and consider
							upgrading to a web browser that
							<a
								href='https://videojs.com/html5-video-support/'
								target='_blank'
							>
								supports HTML5 video
							</a>
						</p>
					</video>
				</div>
			</div>
		</Fragment>
	);
};

export default Page;
