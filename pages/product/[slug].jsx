import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { Store } from '../../utils/Store';
import db from '../../utils/db';
import Product from '../../models/Product';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { addToCart } from '../../utils/addToCart';
import { motion } from 'framer-motion';

export default function ProductScreen({ product }) {
	const { state, dispatch } = useContext(Store);

	if (!product) {
		return (
			<Layout title={'Product Not Found'}>
				<h1 className="text-2xl text-red-500">Product Not Found</h1>
			</Layout>
		);
	}

	return (
		<>
			<Layout title={product.name}>
				<div className="mb-2 flex">
					<Link href={'/'} className="font-semibold flex items-center">
						<BsFillArrowLeftCircleFill className="inline mr-2 lg:ml-10 w-5 h-5" />{' '}
						Back to Products
					</Link>
				</div>

				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					className="flex justify-center mt-2"
				>
					<div className="sm:flex sm:space-x-5">
						<Image
							src={product.image}
							alt={product.name}
							width={1080}
							height={1080}
							priority
							className="w-[350px] sm:w-[280px] md:w-[350px] lg:w-[400px] h-[450px] sm:h-[550px] object-cover rounded-md shadow-md border-2 border-emerald-700"
						/>

						<div className="flex flex-col space-y-5 sm:space-y-0 justify-between sm:w-[320px] md:w-[350px] lg:w-[500px] col-span-2 text-emerald-200">
							<ul className="space-y-2 text-md my-5 md:my-0 text-left md:text-left">
								<li className="text-4xl text-green-200 font-semibold mb-5">
									{product.name}
								</li>
								<li>
									<span className="font-bold text-lg">Category:</span>{' '}
									{product.category}
								</li>
								<li>
									<span className="font-bold text-lg">Brand:</span>{' '}
									{product.brand}
								</li>
								<li>
									<span className="font-bold text-lg">Description:</span>{' '}
									{product.description}
								</li>
							</ul>

							<div className="sm:card p-5 uppercase h-fit text-xl text-yellow-400 bg-emerald-800">
								<div className="mb-2 flex justify-between items-center">
									<p>Price:</p>
									<p className="font-bold">$ {product.price}</p>
								</div>

								<div className="flex justify-between items-center">
									<p>Availability:</p>
									<p className="font-bold">
										{product.countInStock > 0 ? 'In Stock' : 'Unavailable'}{' '}
									</p>
								</div>

								<button
									type="button"
									onClick={() => addToCart(product, state, dispatch)}
									className="primary-button w-full mt-8"
								>
									Add to Cart
								</button>
							</div>
						</div>
					</div>
				</motion.div>
			</Layout>
		</>
	);
}

export async function getServerSideProps(context) {
	const { slug } = context.params;

	await db.connect();
	const product = await Product.findOne({ slug }).lean();

	return {
		props: {
			product: product ? db.convertDocToObj(product) : null,
		},
	};
}
