import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import { addToCart } from '../utils/addToCart';
import { motion } from 'framer-motion';

function FeaturedItem({ product }) {
	const { state, dispatch } = useContext(Store);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			whileInView={{ opacity: 1 }}
			transition={{ duration: 1 }}
			className="flex-shrink-0"
		>
			<Link href={`/product/${product.slug}`} className="bg-emerald-700">
				<Image
					src={product.image}
					alt={product.name}
					width={1080}
					height={1080}
					priority
					className="w-full h-[250px] sm:h-[300px] object-cover hover:opacity-80 active:opacity-50 transition ease-out duration-300 rounded-t-md"
				/>
			</Link>

			<div className="flex justify-between items-center space-x-7 text-gray-700">
				<div className="text-left font-bold">
					<p>Brand: {product.brand} </p>
					<p>$ {product.price} </p>
				</div>

				<div className="text-right">
					<button
						type="button"
						onClick={() => addToCart(product, state, dispatch)}
						className="newprimarybtn"
					>
						Add to Cart
					</button>
				</div>
			</div>
		</motion.div>
	);
}

export default FeaturedItem;
