import Layout from '../components/Layout';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { Order } from '../utils/Order';
import Image from 'next/image';
import { motion } from 'framer-motion';

function OrderHistory() {
	const {
		state: { order },
	} = useContext(Order);

	return (
		<>
			<Layout title={'Order History'}>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="min-h-[60vh]"
				>
					<h1 className="text-2xl md:text-3xl text-green-900 uppercase tracking-wide text-center font-bold mt-14 mb-20">
						Order History
					</h1>

					{order ? (
						<div className="overflow-x-auto mx-5 mb-14">
							<table className="min-w-full text-emerald-900 border text-sm md:text-md">
								<thead>
									<tr className="text-gray-700 text-left border-b">
										<th className="px-5">ITEM</th>
										<th className="p-5">ORDER DATE</th>
										<th className="p-5">PRICE ($)</th>
										<th className="p-5">PAID</th>
										<th className="p-5">DELIVERED</th>
										<th className="p-5">ACTION</th>
									</tr>
								</thead>

								<tbody>
									{order.orderItems?.map((item) => (
										<tr className="border-b text-left" key={item._id}>
											<td className="p-5">
												<Image
													src={item.image}
													alt={item.name}
													width={150}
													height={150}
													className="px-5 hidden sm:inline-flex"
												/>
												{item.name}
											</td>
											<td className="p-5">
												{order.createdAt.substring(0, 10)}{' '}
											</td>
											<td className="p-5">{item.price * item.quantity} </td>
											<td className="p-5">
												{order.isPaid ? (
													`${order.paidAt.substring(0, 10)}`
												) : (
													<p className="text-red-500">NOT PAID</p>
												)}
											</td>
											<td className="p-5">
												{order.isDelivered ? (
													`${order.deliveredAt.substring(0, 10)}`
												) : (
													<p className="text-red-500">NOT DELIVERED</p>
												)}
											</td>
											<td className="p-5">
												<Link
													href={`/order/${order._id}`}
													className="text-green-400 hover:text-green-500 active:text-green-400"
												>
													View Details
												</Link>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					) : (
						<div className="text-center">
							<h1>
								Please go shopping first to be able to view shopping history
							</h1>
							<Link
								href={'/shop'}
								className="text-green-500 text-sm hover:text-green-300 active:text-green-500"
							>
								Go Shopping
							</Link>
						</div>
					)}
				</motion.div>
			</Layout>
		</>
	);
}

OrderHistory.auth = true;
export default OrderHistory;
