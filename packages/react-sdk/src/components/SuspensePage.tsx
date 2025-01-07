export function SuspensePage() {
	return (
		<div className='flex items-center justify-center h-screen'>
			<div className='relative h-20 w-20'>
				<div className='absolute inset-0 rounded-full border-4 border-gray-300 opacity-20' />
				<div className='absolute inset-0 rounded-full border-4 border-t-gray-900 border-r-gray-900 animate-spin' />
			</div>
		</div>
	);
}
