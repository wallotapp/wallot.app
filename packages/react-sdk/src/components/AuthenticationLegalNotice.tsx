import Link from 'next/link';

export const AuthenticationLegalNotice: React.FC = () => {
	return (
		<div className='text-center mt-5 mx-auto'>
			<p className='text-gray-400 text-sm'>
				By clicking continue, you agree to our{' '}
				<Link href='https://wallot.app/terms' rel='noopener noreferrer' target='_blank'>
					<span className='underline'>Terms of Service</span>
				</Link>{' '}
				and{' '}
				<Link href='https://wallot.app/privacy' rel='noopener noreferrer' target='_blank'>
					<span className='underline'>Privacy Policy</span>
				</Link>
			</p>
		</div>
	);
};
