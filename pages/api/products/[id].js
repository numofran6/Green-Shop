import db from '../../../utils/db';
import Product from '../../../models/Product';

export default async function handler(req, res) {
	await db.connect();
	const product = await Product.findById(req.query.id);
	await db.disconnect();

	res.send(product);
}
