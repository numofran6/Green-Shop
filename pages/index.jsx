import Layout from '../components/Layout';
import ProductItem from '../components/ProductItem';
import db from '../utils/db';
import Product from '../models/Product';
import { motion } from 'framer-motion';

export default function Home({ products }) {
	return (
		<>
			<Head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#000000" />
				<meta
					name="description"
					content="E-Commerce App. Project of Francis Numo. A Front-End Developer who specializes in building elegant user interface with the aim to create an exceptional digital experience"
				/>
				<meta
					name="keywords"
					content="Frontend Developer, Mobile Developer, Open Source, Freelance Web Developer, Freelance Mobile Developer, React Native Developer, Developer Portfolio, React Developer, Web Developer, React Frontend Developer"
				/>

				<meta name="description" content="Page description" />
				<meta property="og:title" content="Green Shop" />
				<meta
					property="og:description"
					content="E-Commerce App. Project of Francis Numo. A Front-End Developer who specializes in building elegant user interface with the aim to create exceptional digital experience"
				/>
				<meta property="og:image" content="../public/images/shirt1.jpg" />

				<meta property="og:image:alt" content="Green Shop" />
				<meta property="og:locale" content="en_GB" />
				<meta property="og:type" content="website" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta
					property="og:url"
					content="https://www.greenshopping.vercel.app/"
				/>
				<meta name="twitter:card" content="summary" />
				<meta name="theme-color" content="#000000" />
				<meta name="robots" content="index, follow" />
			</Head>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<Layout>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:px-16 px-5 sm:px-0">
						{products.map((product) => (
							<ProductItem product={product} key={product.slug} />
						))}
					</div>
				</Layout>
			</motion.div>
		</>
	);
}

export async function getServerSideProps() {
	await db.connect();
	const products = await Product.find().lean();

	return {
		props: {
			products: products.map(db.convertDocToObj),
		},
	};
}
