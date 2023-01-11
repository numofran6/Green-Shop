import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

export default function Unauthorized() {
	const {
		query: { message },
	} = useRouter();
	return (
		<Layout title={'Unauthorized Page'}>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				className="text-center"
			>
				<h1 className="text-lg md:text-xl font-bold">Access Denied</h1>
				{message && (
					<h1 className=" text-red-500 font-bold uppercase text-lg md:text-xl">
						{message}
					</h1>
				)}
			</motion.div>
		</Layout>
	);
}
