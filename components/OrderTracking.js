import { useEffect, useReducer } from 'react';
import Layout from './Layout';
import axios from 'axios';
import { errorHandler } from '../utils/errorHandler';
import Link from 'next/link';
import Image from 'next/image';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { Order } from '../utils/Order';
import ReactLoading from 'react-loading';
import { motion } from 'framer-motion';

export default function OrderTracking({ orderId }) {
	const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
	const { state, dispatch } = useContext(Order);

	const { loading, error, order, successPay, loadingPay } = state;

	useEffect(() => {
		const fetchOrder = async () => {
			try {
				dispatch({ type: 'FETCH_REQUEST' });
				const { data } = await axios.get(`/api/orders/${orderId}`);
				dispatch({ type: 'FETCH_SUCCESS', payload: data });
			} catch (err) {
				dispatch({ type: 'FETCH_FAIL', payload: errorHandler(err) });
			}
		};
		if (!order._id || successPay || (order._id && order._id !== orderId)) {
			fetchOrder();
			if (successPay) {
				dispatch({ type: 'PAY_REQUEST' });
			}
		} else {
			// PAYPAL HANDLER
			// paypal wrapper added to _app to load manually
			const loadPaypalScript = async () => {
				const { data: clientId } = await axios.get('/api/keys/paypal');
				paypalDispatch({
					type: 'resetOptions',
					value: {
						'client-id': clientId,
						currency: 'USD',
					},
				});
				paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
				loadPaypalScript();
			};
		}
	}, [orderId, order, paypalDispatch, successPay]);

	const {
		shippingAddress,
		paymentMethod,
		orderItems,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		isPaid,
		paidAt,
		isDelivered,
		deliveredAt,
	} = order;

	// PAYPAL ACTIONS
	const createOrder = (data, actions) => {
		return actions.order
			.create({
				purchase_units: [
					{
						amount: { value: totalPrice },
					},
				],
			})
			.then((orderID) => {
				return orderID;
			});
	};

	const onApprove = (data, actions) => {
		return actions.order.capture().then(async (details) => {
			try {
				dispatch({ type: 'PAY_REQUEST' });
				const {} = await axios.post(`/api/orders/${order._id}/pay`, details);
				toast.success('Order is paid successfully');
			} catch (err) {
				dispatch({ type: 'PAY_FAIL', payload: errorHandler(err) });
				toast.error(errorHandler(err));
			}
		});
	};

	const onError = (err) => {
		toast.error(errorHandler(err));
	};
	// console.log({ track: state });

	return (
		<>
			<Layout title={'Order'}>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="p-5"
				>
					<h1 className="tracking-wide text-2xl md:text-3xl text-emerald-900 uppercase text-center font-bold mt-14 mb-14">
						Order Tracking
					</h1>
					{loading ? (
						<div className="flex flex-col h-[50vh] items-center justify-center">
							<ReactLoading
								type="spin"
								color="#7abc7fee"
								height={100}
								width={50}
							/>
						</div>
					) : error ? (
						<div className="alert-error">{error}</div>
					) : (
						<div className="grid lg:grid-cols-4 gap-5 mb-14">
							<div className="overflow-x-auto border border-gray-500 lg:col-span-3 space-y-5">
								<div className=" p-5 rounded-none">
									<h2 className="mb-2 md:text-xl text-gray-800 uppercase font-bold border-b border-gray-400">
										Shipping Address
									</h2>
									<div className="text-emerald-900 text-xs md:text-md">
										{shippingAddress.fullName}, {shippingAddress.address},{' '}
										{shippingAddress.city}, {shippingAddress.postalCode},{' '}
										{shippingAddress.country},
									</div>
									{isDelivered ? (
										<div className="alert-success">
											Delivered at {deliveredAt}{' '}
										</div>
									) : (
										<div className="alert-error uppercase text-sm">
											Not delivered
										</div>
									)}
								</div>

								<div className=" p-5 rounded-none">
									<h2 className="mb-2 text-gray-800 md:text-xl uppercase font-bold border-b border-gray-400">
										Payment Method
									</h2>
									<div className="text-emerald-900 text-xs md:text-md">
										{paymentMethod}{' '}
									</div>
									{isPaid ? (
										<div className="alert-success">Paid at {paidAt} </div>
									) : (
										<div className="alert-error uppercase text-sm">
											Not paid
										</div>
									)}
								</div>

								<div className=" p-5 overflow-x-auto">
									<h2 className="mb-2 text-gray-800 md:text-xl uppercase font-bold border-b border-gray-400">
										Order Items
									</h2>
									<table className="min-w-full text-emerald-900 text-xs md:text-md">
										<thead className="border-b">
											<tr>
												<th className="px-5 text-left">Item</th>
												<th className="p-5 text-right">Quantity</th>
												<th className="p-5 text-right">Price</th>
												<th className="p-5 text-right">Subtotal</th>
											</tr>
										</thead>

										<tbody>
											{orderItems.map((item) => (
												<tr
													key={item._id}
													className=" text-emerald-900 border-b bg-stone-100"
												>
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
																className="w-auto h-auto"
															/>
															&nbsp;
															{item.name}
														</Link>
													</td>

													<td className="p-5 text-right">{item.quantity} </td>
													<td className="p-5 text-right">{item.price} </td>
													<td className="p-5 text-right">
														${item.price * item.quantity}{' '}
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>

							<div className=" py-5 flex flex-col justify-between h-fit border-2 border-emerald-900 rounded-none bg-emerald-900 text-green-50">
								<h2 className="mb-2 border-b-2 border-emerald-50 text-2xl font-semibold text-center uppercase">
									Order Summary
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
									<li className="uppercase text-xl font-bold mb-10">
										<div className="mb-2 flex justify-between text-white">
											<div>Total</div>
											<div>$ {totalPrice}</div>
										</div>
									</li>

									{!isPaid && (
										<li className="z-0 flex justify-center">
											{isPending ? (
												<div>
													<ReactLoading
														type="spin"
														color="#7abc7fee"
														height={100}
														width={50}
													/>
												</div>
											) : (
												<div className="w-full">
													<PayPalButtons
														createOrder={createOrder}
														onApprove={onApprove}
														onError={onError}
													></PayPalButtons>
												</div>
											)}
											{loadingPay && (
												<div>
													<ReactLoading
														type="spin"
														color="#7abc7fee"
														height={100}
														width={50}
													/>
												</div>
											)}
										</li>
									)}
								</ul>
							</div>
						</div>
					)}
				</motion.div>
			</Layout>
		</>
	);
}
