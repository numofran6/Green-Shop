import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import ReactLoading from 'react-loading';
import Layout from './Layout';

export const ShippingAuth = ({ children }) => {
	const { push } = useRouter();
	const { status } = useSession({
		required: true,
		onUnauthenticated: () => {
			push('/unauthorized?message=login required');
		},
	});

	if (status === 'loading') {
		return (
			<Layout>
				<div className="h-[50vh] flex flex-col justify-center items-center">
					<ReactLoading type="spin" color="#7abc7fee" height={100} width={50} />
				</div>
			</Layout>
		);
	}

	return children;
};
