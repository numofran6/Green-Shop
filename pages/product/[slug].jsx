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
import { BsSuitHeart, BsShare } from 'react-icons/bs';
import FeaturedItem from '../../components/FeaturedItem';

export default function ProductScreen({ products, product }) {
	const { state, dispatch } = useContext(Store);

	const variants = {
		visible: (i) => ({
			opacity: 1,
			transition: {
				delay: i * 0.3,
			},
		}),
		hidden: { opacity: 0 },
	};

	if (!product) {
		return (
			<Layout title={'Product Not Found'}>
				<h1 className="text-2xl min-h-[50vh] flex items-center justify-center">
					Product Not Found
				</h1>
			</Layout>
		);
	}

	return (
		<>
			<Layout title={product.name}>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<div className="mt-12 pb-7 flex pl-5 lg:pl-0 border-b border-emerald-800">
						<Link
							href={'/shop'}
							className="font-semibold flex items-center text-green-800"
						>
							<BsFillArrowLeftCircleFill className="inline mr-2 lg:ml-10 w-5 h-5" />{' '}
							Back to Products
						</Link>
					</div>

					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						className="flex justify-center my-10"
					>
						<div className="flex flex-col lg:flex-row items-center lg:space-x-10">
							<div className="">
								<Image
									src={product.image}
									alt={product.name}
									width={1080}
									height={1080}
									priority
									className="w-[90vw] lg:w-[35vw] h-[60vh] sm:h-[70vh] object-cover"
								/>
							</div>

							<div className="text-center lg:text-left max-w-lg flex flex-col space-y-5 col-span-2 px-8 mx-2 lg:mx-0 lg:px-5 bg-stone-100 md:bg-stone-100 my-5 py-5 lg:my-0 lg:py-10 w-[90vw] lg:min-w-[35vw] min-h-[60vh] sm:min-h-[70vh] ">
								<ul className="space-y-3 text-sm my-5">
									<li className="text-md font-semibold">{product.brand}</li>

									<li className="text-4xl font-bold">{product.name}</li>
									<li className="font-bold text-4xl text-green-800">
										$ {product.price}
									</li>
									<li className="font-bold text-lg text-gray-700">
										{product.countInStock > 0 ? 'In Stock' : 'Unavailable'}{' '}
									</li>
								</ul>

								<p>{product.description}</p>

								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-3">
										<span>Add To Wishlist</span>
										<BsSuitHeart className="w-6 h-6" />
									</div>
									<div className="flex items-center space-x-3">
										<span>Share</span> <BsShare className="w-6 h-6" />
									</div>
								</div>

								<h1 className="font-bold text-xl">
									Category:{' '}
									<span className="font-normal text-lg text-gray-700">
										{product.category}
									</span>
								</h1>

								<div className=" flex justify-center">
									<button
										type="button"
										onClick={() => addToCart(product, state, dispatch)}
										className="newprimarybtn px-5 p-3"
									>
										Add to Cart
									</button>
								</div>
							</div>
						</div>
					</motion.div>

					<div className="py-10 px-5 border-t  border-emerald-800">
						<h1 className="font-bold text-3xl mb-5">Related Items</h1>
						<div className="flex items-center space-x-7 lg:space-x-10 overflow-x-auto">
							{products?.slice(0, 4).map((product, i) => (
								<motion.div
									custom={i}
									whileInView="visible"
									key={product.slug}
									variants={variants}
								>
									<FeaturedItem product={product} />
								</motion.div>
							))}
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
	const products = await Product.find().lean();
	const product = await Product.findOne({ slug }).lean();

	return {
		props: {
			product: product ? db.convertDocToObj(product) : null,
			products: products.map(db.convertDocToObj),
		},
	};
}
