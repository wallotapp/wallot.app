import type { NextPage } from 'next';
import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { firebaseAuthInstance as auth } from 'ergonomic-react/src/lib/firebase';
import { useRouter } from 'next/router';
import { SuspensePage } from '@wallot/react/src/components/SuspensePage';

const Page: NextPage = () => {
	const router = useRouter();

	useEffect(
		() =>
			void (async () => {
				await signOut(auth);
				// Wait 1 second
				await new Promise((resolve) => setTimeout(resolve, 1000));
				await router.replace('/login');
			})(),
		[],
	);

	return <SuspensePage />;
};

export default Page;
