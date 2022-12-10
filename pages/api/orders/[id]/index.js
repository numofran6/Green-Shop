import { getSession } from 'next-auth/react';
import db from '../../../../utils/db';
import Order from '../../../../models/Order';

export default async function handler(req, res) {
	const session = getSession({ req });

	if (!session) {
		return res.status(401).send('signin required');
	}

	await db.connect();
	const order = await Order.findById(req.query.id);
	await db.disconnect();

	res.send(order);
}
