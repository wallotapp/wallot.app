import { Fragment, useState } from 'react';
import Image from 'next/image';
import { useIsMounted } from 'ergonomic-react/src/hooks/useIsMounted';
import { Skeleton } from 'ergonomic-react/src/components/ui/skeleton';
import { BsPlayCircleFill } from 'react-icons/bs';
import { BaseComponent } from 'ergonomic-react/src/types/BaseComponentTypes';
import { default as cn } from 'ergonomic-react/src/lib/cn';

export type LoomVideoProps = BaseComponent & {
	embedId: string;
	thumbnail: string;
	title: string;
};
export const LoomVideo: React.FC<LoomVideoProps> = ({
	className = '',
	embedId,
	thumbnail,
	title,
}) => {
	const isMounted = useIsMounted();
	const [showVideo, setShowVideo] = useState(false);

	const videoSrc = 'https://www.loom.com/embed/' + embedId + '?autoplay=1';

	if (!isMounted) {
		return null;
	}

	return (
		<div className={cn('relative aspect-video w-full', className)}>
			{showVideo ? (
				<Fragment>
					<Skeleton className='absolute top-0 left-0 h-96 w-full !bg-gray-400 rounded-xl z-[4]' />
					<iframe
						allow='autoplay; fullscreen; picture-in-picture'
						src={videoSrc}
						className='absolute top-0 left-0 h-96 w-full rounded-xl z-[5]'
					/>
				</Fragment>
			) : (
				<Fragment>
					<Image
						src={thumbnail}
						alt={title}
						layout='responsive'
						width={1920}
						height={1080}
						className='absolute top-0 left-0 rounded-xl !mt-0 !mb'
						priority
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
	);
};
