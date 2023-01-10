import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import { addToCart } from '../utils/addToCart';

function ProductItem({ product }) {
	const { state, dispatch } = useContext(Store);

	return (
		<div className="">
			<Link href={`/product/${product.slug}`}>
				<Image
					src={product.image}
					alt={product.name}
					width={1080}
					height={1080}
					priority
					className="w-full h-[350px] sm:h-[450px] object-cover hover:opacity-80 active:opacity-50 transition ease-out duration-300"
				/>
			</Link>

			<div className="flex justify-between items-center text-black">
				<div className="text-left font-bold">
					<Link
						href={`/product/${product.slug}`}
						className="text-lg text-black hover:text-emerald-300 active:text-emerald-100"
					>
						{product.name}
					</Link>
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
		</div>
	);
}

export default ProductItem;
