import mongoose from 'mongoose';

const connection = {};

async function connect() {
	if (connection.isConnected) {
		console.log('DB Already Connected');
		return;
	}
	if (mongoose.connections.length > 0) {
		connection.isConnected = mongoose.connections[0].readyState;
		if (connection.isConnected === 1) {
			console.log('Using previous DB connection');
			return;
		}
		await mongoose.disconnect();
	}

	const db = await mongoose
		.connect(process.env.MONGODB_URI)
		.then(console.log('DB Connected Successfully'))
		.catch((err) => console.log(err));
	connection.isConnected = db.connection.readyState;
}

async function disconnect() {
	if (connection.isConnected) {
		if (process.env.NODE_ENV === 'production') {
			await mongoose.disconnect();
			connection.isConnected = false;
			console.log('DB disconnected');
		} else {
			console.log('DB Not Disconnected');
		}
	}
}

function convertDocToObj(doc) {
	doc._id = doc._id.toString();
	doc.createdAt = doc.createdAt.toString();
	doc.updatedAt = doc.updatedAt.toString();
	return doc;
}

const db = { connect, disconnect, convertDocToObj };
export default db;
