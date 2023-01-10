import { useContext } from 'react';
import { Store } from '../utils/Store';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import Router from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { errorHandler } from '../utils/errorHandler';
import axios from 'axios';
import { AiFillEdit } from 'react-icons/ai';
import ReactLoading from 'react-loading';
import { TbShoppingCartX } from 'react-icons/tb';

export const OrderSummary = () => {
	const {
		state: { cart },
		dispatch,
	} = useContext(Store);
	const { cartItems, shippingAddress, paymentMethod } = cart;
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!paymentMethod) {
			return Router.push('/payment');
		}
	}, [paymentMethod]);

	const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

	const itemsPrice = round2(
		cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
	);
	const shippingPrice = itemsPrice > 200 ? 0 : 15;
	const taxPrice = round2(itemsPrice * 0.15);
	const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

	const placeOrderHandler = async () => {
		try {
			setLoading(true);
			const { data } = await axios.post('/api/orders', {
				orderItems: cartItems,
				shippingAddress,
				paymentMethod,
				itemsPrice,
				shippingPrice,
				taxPrice,
				totalPrice,
			});
			// setLoading(false);
			dispatch({ type: 'CART_CLEAR_ITEMS' });

			Router.push(`/order/${data._id}`);
		} catch (err) {
			setLoading(false);
			toast.error('Something went wrong');
		}
	};

	return (
		<div className="px-5">
			<h1 className="tracking-wide my-5 text-3xl text-emerald-900 uppercase text-center font-bold mt-10">
				Review Order
			</h1>
			{cartItems.length === 0 ? (
				<div>
					{loading ? (
						<div className="flex flex-col space-y-3 justify-center items-center font-bold text-sm">
							<ReactLoading
								type="spin"
								color="#7abc7fee"
								height={100}
								width={50}
							/>

							<h1>Redirecting you to Order Tracking...</h1>
						</div>
					) : (
						<div className="flex flex-col justify-center items-center">
							<h1 className="flex items-center text-lg">
								No items in Cart <TbShoppingCartX className="ml-2 w-6 h-6" />{' '}
							</h1>
							<div>
								<Link
									href={'/'}
									className="text-green-500 text-sm hover:text-green-300 active:text-green-500"
								>
									Go Shopping
								</Link>
							</div>
						</div>
					)}
				</div>
			) : (
				<div className="grid lg:grid-cols-4 gap-5">
					<div className="overflow-x-auto border lg:col-span-3 space-y-5">
						<div className="p-5 rounded-none">
							<h2 className="mb-2 text-gray-800 text-xl uppercase font-bold border-b">
								Shipping Address
							</h2>
							<div>
								<div className="text-emerald-900">
									{shippingAddress.fullName}, {shippingAddress.address},{' '}
									{shippingAddress.city}, {shippingAddress.postalCode},{' '}
									{shippingAddress.country},
								</div>

								<Link
									href={'/shipping'}
									className="flex items-center text-md uppercase text-green-600 hover:text-green-400 active:text-green-600"
								>
									<AiFillEdit />
									<div>Edit</div>
								</Link>
							</div>
						</div>

						<div className=" p-5 rounded-none">
							<h2 className="mb-2 text-gray-800 text-xl uppercase font-bold border-b">
								Payment Method
							</h2>

							<div>
								<div className="text-emerald-900">{paymentMethod}</div>
								<Link
									href={'/payment'}
									className="flex items-center text-md uppercase text-green-600 hover:text-green-400 active:text-green-600"
								>
									<AiFillEdit />
									<div>Edit</div>
								</Link>
							</div>
						</div>

						<div className=" overflow-x-auto p-5 ">
							<h2 className="mb-2 text-gray-800 text-xl uppercase border-b font-bold">
								Your Items
							</h2>
							<table className="min-w-full text-emerald-900">
								<thead className="border-b">
									<tr>
										<th className="px-5 text-left">Item</th>
										<th className="p-5 text-right">Quantity</th>
										<th className="p-5 text-right">Price</th>
										<th className="p-5">Subtotal ($) </th>
									</tr>
								</thead>

								<tbody>
									{cartItems.map((item) => (
										<tr key={item._id} className="border-b bg-stone-100">
											<td>
												<Link
													href={`/product/${item.slug}`}
													className="flex items-center text-emerald-900"
												>
													<Image
														src={item.image}
														alt={item.name}
														width={40}
														height={40}
														className="h-auto w-auto"
													/>
													&nbsp;
													{item.name}
												</Link>
											</td>
											<td className="p-5 text-right">{item.quantity}</td>
											<td className="p-5 text-right">{item.price} </td>
											<td className="p-5 text-center">
												{item.quantity * item.price}
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<Link
								href={'/cart'}
								className="flex items-center text-md uppercase text-green-600 hover:text-green-400 active:text-green-600"
							>
								<AiFillEdit />
								<div>Edit</div>
							</Link>
						</div>
					</div>

					<div className=" py-5 flex flex-col justify-between h-fit border-2 border-emerald-900 rounded-none bg-emerald-900 text-green-50">
						<h2 className="mb-2 border-b-2 border-emerald-50 text-2xl font-semibold text-center uppercase">
							Summary
						</h2>

						<ul className="my-10 font-semibold text-emerald-200 px-10">
							<li>
								<div className="mb-2 flex justify-between">
									<div>Items</div>
									<div>$ {itemsPrice}</div>
								</div>
							</li>
							<li>
								<div className="mb-2 flex justify-between">
									<div>Tax</div>
									<div>$ {taxPrice}</div>
								</div>
							</li>
							<li className="border-b border-green-50">
								<div className="mb-2 flex justify-between">
									<div>Shipping</div>
									<div>$ {shippingPrice}</div>
								</div>
							</li>
							<li className="uppercase text-xl font-bold">
								<div className="mb-2 flex justify-between text-white">
									<div>Total</div>
									<div>$ {totalPrice}</div>
								</div>
							</li>
						</ul>

						<div className="flex justify-center px-5">
							<button
								disabled={loading}
								onClick={placeOrderHandler}
								className="newprimarybtn rounded-none py-3 w-full"
							>
								{loading ? 'Loading...' : 'Place Order'}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
