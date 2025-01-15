import type { NextPage } from 'next';
import { Fragment, useState } from 'react';
import Image from 'next/image';
import { useIsMounted } from 'ergonomic-react/src/hooks/useIsMounted';
import { Skeleton } from 'ergonomic-react/src/components/ui/skeleton';
import { BsPlayCircleFill } from 'react-icons/bs';

const thumbnailSrc =
	'https://firebasestorage.googleapis.com/v0/b/app-wallot-production.appspot.com/o/_test%2Fthumbnail.png?alt=media&token=3b996e8a-421e-44d0-b6c7-e206fce01e57';
const videoSrc =
	'https://www.loom.com/embed/f07510d7faeb47f3917d9e3766589f4e' + '?autoplay=1';

const Page: NextPage = () => {
	const isMounted = useIsMounted();
	const [showVideo, setShowVideo] = useState(false);

	if (!isMounted) {
		return null;
	}

	return (
		<Fragment>
			<div className='p-10'>
				<div>
					<p>Here's a nice video</p>
				</div>
				<div className='relative max-h-96 h-96 max-w-[42.67rem] w-[42.67rem]'>
					{showVideo ? (
						<Fragment>
							<Skeleton className='absolute top-0 left-0 w-full h-full !bg-gray-400 rounded-xl z-[4]' />
							<iframe
								allow='autoplay; fullscreen; picture-in-picture'
								src={videoSrc}
								className='absolute top-0 left-0 max-h-96 h-96 max-w-[42.67rem] w-[42.67rem] rounded-xl z-[5]'
							/>
						</Fragment>
					) : (
						<Fragment>
							<Image
								src={thumbnailSrc}
								alt='Video Poster'
								layout='fill'
								objectFit='cover'
								className='absolute top-0 left-0 rounded-xl'
							/>
							{/* Dark overlay */}
							<div
								onClick={() => setShowVideo(true)}
								className='absolute top-0 left-0 w-full h-full bg-black opacity-20 rounded-xl cursor-pointer z-[5]'
							/>
							{/* Play button/icon */}
							<button
								onClick={() => setShowVideo(true)}
								className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10'
								aria-label='Play Video'
							>
								<BsPlayCircleFill className='text-7xl' />
							</button>
						</Fragment>
					)}
				</div>
				<div>
					<figcaption>Let us know if you like it!</figcaption>
				</div>
			</div>
		</Fragment>
	);
};

export default Page;
