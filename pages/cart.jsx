import { useContext } from 'react';
import { Store } from '../utils/Store';
import Layout from '../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { AiOutlineClose } from 'react-icons/ai';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { TbShoppingCartX } from 'react-icons/tb';

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
					className="px-5"
				>
					{cartItems.length === 0 ? (
						<div className="flex flex-col justify-center items-center">
							<h1 className="flex items-center text-lg">
								No items in Cart <TbShoppingCartX className="ml-2 w-6 h-6" />{' '}
							</h1>
							<div>
								<Link
									href={'/shop'}
									className="text-green-500 text-sm hover:text-green-300 active:text-green-500"
								>
									Go Shopping
								</Link>
							</div>
						</div>
					) : (
						<div className="pb-24">
							<h1 className="py-12 text-gray-500 flex items-center justify-center text-sm">
								thank you for shopping
								<span className="text-green-600 ml-1 font-bold"> GREEN.</span>
							</h1>

							<div className="md:grid md:grid-cols-4 gap-5">
								<div className="col-span-3">
									<h1 className="text-xl md:text-3xl text-gray-700 font-bold mb-5">
										Shopping Bag
									</h1>

									<table className="min-w-full">
										<thead className="border uppercase">
											<tr className="text-center">
												<th className="px-10 text-left">Item</th>
												<th>Qty</th>
												<th>Price</th>
											</tr>
										</thead>
										{cartItems.map((item) => (
											<tbody key={item.slug} className="">
												<tr className="text-center border text-sm md:text-lg">
													<td className="text-left">
														<div className="flex items-center text-emerald-600 p-5 ">
															<button
																type="button"
																onClick={() => removeItemHandler(item)}
																className="text-gray-500 hover:text-red-600 mr-5 md:mr-0"
															>
																<AiOutlineClose className="h-5 w-5"></AiOutlineClose>
															</button>

															<Link
																href={`/product/${item.slug}`}
																className="flex items-center text-emerald-600 p-5 "
															>
																<Image
																	src={item.image}
																	alt={item.name}
																	width={150}
																	height={150}
																	className="px-5 hidden sm:inline-flex"
																/>

																{item.name}
															</Link>
														</div>
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
													<td>$ {item.price}</td>
												</tr>
											</tbody>
										))}
									</table>
								</div>

								<div className="mt-10 md:mt-0">
									<h1 className="text-xl md:text-3xl text-gray-700 font-bold mb-5">
										Cart Totals
									</h1>

									<div className="border p-5 flex items-center justify-between">
										<h1>Quantity</h1>

										<h3 className="font-semibold md:text-xl">
											{cartItems.reduce((a, c) => a + c.quantity, 0)} items
										</h3>
									</div>

									<div className="border p-5 space-y-5">
										<div className="flex items-center justify-between">
											<h1 className="uppercase font-semibold">Total</h1>
											<h3 className="font-bold sm:text-2xl">
												${' '}
												{cartItems.reduce(
													(a, c) => a + c.quantity * c.price,
													0
												)}
											</h3>
										</div>

										<button
											onClick={() => push('/login?redirect=/shipping')}
											className="newprimarybtn w-full py-4 rounded-none"
										>
											Check Out
										</button>
									</div>

									<div className="flex flex-col space-y-3 items-center mt-10">
										<input
											type="text"
											placeholder="Enter coupon here"
											className="p-2 bg-stone-100 placeholder:text-gray-300 border-b-2 border-green-100/20 focus:border-green-400 focus:bg-stone-200 text-black outline-none w-full"
										/>

										<button
											onClick={() => push('/login?redirect=/shipping')}
											className="newprimarybtn py-4 rounded-none"
										>
											Apply Coupon
										</button>
									</div>
								</div>
							</div>
						</div>
					)}
				</motion.div>
			</Layout>
		</>
	);
}

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
