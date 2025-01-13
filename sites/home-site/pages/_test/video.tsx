import type { NextPage } from 'next';

const videoSrc =
	'https://firebasestorage.googleapis.com/v0/b/app-wallot-production.appspot.com/o/_test%2FIMG_0297.mp4?alt=media&token=7ef0ecf4-c2e4-4336-852c-104c67b994d8';

const Page: NextPage = () => {
	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<div>
				<p>Here's a nice video</p>
			</div>
			<div className='lg:max-w-xl p-4'>
				<div className='my-l grid w-full grid-cols-12 max-w-container'>
					<div className='col-span-12'>
						<div className='gap-3xs grid h-full w-full grid-cols-1 m:grid-cols-1'>
							<div className='flex flex-col w-full mx-auto ease-curve-c duration-normal transition-opacity max-w-media relative'>
								<div className='relative w-full aspect-undefined'>
									<div
										tabIndex={0}
										className='group relative flex h-full w-full overflow-hidden outline-none aspect-16/9 rounded-s'
									>
										<div className='h-full w-full'>
											<video
												controls
												tabIndex={-1}
												className='aspect-16/9 min-h-full min-w-full rounded-lg'
												data-ready='true'
											>
												<source src={videoSrc} type='video/mp4' />
												{/* adjust MIME type as needed */}
												Your browser does not support the video tag.
											</video>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Page;
