import User from '../../../models/User';
import db from '../../../utils/db';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		return;
	}
	const { name, email, password } = req.body;
	if (
		!name ||
		!email ||
		!email.includes('@') ||
		!password ||
		password.trim().length < 6
	) {
		res.status(422).json({
			message: 'Validation error',
		});
		return;
	}

	await db.connect();

	const existingUser = await User.findOne({ email });
	if (existingUser) {
		res.status(422).json({ message: 'User already exists' });
		await db.disconnect();
		return;
	}

	const newUser = await User.create({
		name,
		email,
		password: bcrypt.hashSync(password),
		isAdmin: true,
	});

	await db.disconnect();

	res.status(201).send({
		message: 'Created user!',
		_id: newUser._id,
		name: newUser.name,
		email: newUser.email,
		isAdmin: newUser.isAdmin,
	});
}
