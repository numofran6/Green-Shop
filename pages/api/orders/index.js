import { getSession } from 'next-auth/react';
import db from '../../../utils/db';
import Order from '../../../models/Order';

export default async function handler(req, res) {
	const session = await getSession({ req });

	if (!session) {
		return req.status(401).send('sigin required');
	}

	const user = session;
	await db.connect();
	const newOrder = new Order({ ...req.body, user: user.id });

	const order = await newOrder.save();
	res.status(201).send(order);
}
