import Layout from '../components/Layout';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { Order } from '../utils/Order';
import Router from 'next/router';
import { useState } from 'react';

function OrderHistory() {
	const {
		state: { order },
	} = useContext(Order);
	const [check, setCheck] = useState(true);

	// useEffect(() => {
	// 	if (!order && check) {
	// 		setCheck(false);
	// 		Router.reload();
	// 	}
	// }, [check]);

	return (
		<>
			<Layout title={'Order History'}>
				<h1 className="my-5 text-3xl text-green-200 uppercase tracking-wide text-center font-bold mt-14 mb-10">
					Order History
				</h1>

				{order ? (
					<div className="overflow-x-auto">
						<table className="min-w-full">
							<thead>
								<tr className="text-emerald-500 text-left">
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
									<tr
										className="border-b bg-[#363636]/60 text-left"
										key={item._id}
									>
										<td className="p-5">{item.name} </td>
										<td className="p-5">{order.createdAt.substring(0, 10)} </td>
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
					<div className="text-center mt-16">
						<h1>
							Please go shopping first to be able to view shopping history
						</h1>
						<Link href={'/'}>Go Shopping</Link>
					</div>
				)}
			</Layout>
		</>
	);
}

OrderHistory.auth = true;
export default OrderHistory;
