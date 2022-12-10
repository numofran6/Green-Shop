import { useContext } from 'react';
import { Store } from '../utils/Store';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import XCircleIcon from '@heroicons/react/20/solid/XCircleIcon';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function CartScreen() {
	const { push } = useRouter();
	const { state, dispatch } = useContext(Store);
	const {
		cart: { cartItems },
	} = state;

	const removeItemHandler = (item) => {
		dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
	};

	const updateCartHandler = async (item, qty) => {
		const quantity = Number(qty);
		const { data } = await axios.get(`/api/products/${item._id}`);

		if (data.countInStock < quantity) {
			return toast.error(`Sorry! ${item.name} is out of Stock`);
		}

		dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
		toast.success('Cart Updated');
	};

	return (
		<>
			<Layout title={'Cart'}>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
					className="lg:px-16"
				>
					{cartItems.length === 0 ? (
						<h1 className="text-xl text-center mt-56">
							No items in Cart.{' '}
							<span>
								<Link
									href={'/'}
									className="text-green-100 hover:text-green-300 active:text-green-100"
								>
									Go Shopping
								</Link>
							</span>
						</h1>
					) : (
						<>
							<div className="text-center mb-10">
								<h1 className="uppercase text-6xl font-bold mt-5">Your Cart</h1>
								<p className="italic">happy shopping</p>
							</div>
							<table className="min-w-full">
								<thead className="border-b uppercase">
									<tr className="text-center">
										<th className="px-10 text-left">Item</th>
										<th>Quantity</th>
										<th>Price</th>
										<th className="hidden sm:inline-table">Remove</th>
									</tr>
								</thead>
								{cartItems.map((item) => (
									<tbody key={item.slug} className="">
										<tr className="text-center border-b bg-[#363636]/50">
											<td className="text-left">
												<Link
													href={`/product/${item.slug}`}
													className="flex items-center "
												>
													<Image
														src={item.image}
														alt={item.name}
														width={50}
														height={50}
														className="pr-3 hidden sm:inline-flex"
													/>

													{item.name}
												</Link>
											</td>
											<td>
												<select
													value={item.quantity}
													onChange={(e) =>
														updateCartHandler(item, e.target.value)
													}
												>
													{[...Array(item.countInStock).keys()].map((x) => (
														<option key={x + 1} value={x + 1}>
															{x + 1}
														</option>
													))}
												</select>
											</td>
											<td>{item.price}</td>
											<td>
												<button
													type="button"
													onClick={() => removeItemHandler(item)}
												>
													<XCircleIcon className="h-5 w-5"></XCircleIcon>
												</button>
											</td>
										</tr>
									</tbody>
								))}
							</table>

							<div className="mt-20 space-y-5 text-center">
								<h1 className="text-3xl font-bold uppercase">Total</h1>
								<div className="flex justify-center border-b border-gray-400/80 space-x-16 text-lg mb-5">
									<h2>
										Quantity: {cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
									</h2>

									<h3 className="font-semibold">
										$ {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
									</h3>
								</div>

								<button
									onClick={() => push('/login?redirect=/shipping')}
									className="primary-button"
								>
									Check Out
								</button>
							</div>
						</>
					)}
				</motion.div>
			</Layout>
		</>
	);
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
