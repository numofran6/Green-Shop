import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';

export default function Unauthorized() {
	const {
		query: { message },
	} = useRouter();
	return (
		<Layout title={'Unauthorized Page'}>
			<div className="text-center mt-52">
				<h1 className="text-xl font-bold">Access Denied</h1>
				{message && (
					<h1 className="mb-4 text-red-500 font-bold uppercase text-2xl">
						{message}
					</h1>
				)}
			</div>
		</Layout>
	);
}
