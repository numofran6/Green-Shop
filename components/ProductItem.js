import Link from 'next/link';
import Image from 'next/image';
import { useContext } from 'react';
import { Store } from '../utils/Store';
import { addToCart } from '../utils/addToCart';

function ProductItem({ product }) {
	const { state, dispatch } = useContext(Store);

	return (
		<div className=" relative border-8 border-emerald-700">
			<Link href={`/product/${product.slug}`}>
				<Image
					src={product.image}
					alt={product.name}
					width={1080}
					height={1080}
					priority
					className="rounded shadow w-full h-[350px] object-cover hover:opacity-80 active:opacity-50 transition ease-out duration-300"
				/>
			</Link>

			<div className="flex flex-col items-center text-center p-5 absolute bottom-0 bg-slate-500 text-white bg-opacity-40 left-[50%] translate-x-[-50%] w-full">
				<Link
					href={`/product/${product.slug}`}
					className="text-xl font-bold text-emerald-100 hover:text-emerald-300 active:text-emerald-100"
				>
					{product.name}
				</Link>

				<p>{product.brand} </p>
				<p className="mb-2">{product.price} </p>

				<button
					type="button"
					onClick={() => addToCart(product, state, dispatch)}
					className="primary-button"
				>
					Add to Cart
				</button>
			</div>
		</div>
	);
}

export default ProductItem;
