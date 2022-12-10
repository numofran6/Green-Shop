import { getSession } from 'next-auth/react';

export default function handler(req, res) {
	const session = getSession({ req });

	if (!session) {
		return res.status(401).send('signin required');
	}

	res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
}
