// Dependencies
const mongoose = require('mongoose');

// ============
// Database configuration
// ============

// Native promises in Mongoose
mongoose.Promise = Promise;

async function removeAllCollections() {
	const collections = Object.keys(mongoose.connection.collections);
	for (const collectionName of collections) {
		const collection = mongoose.connection.collections[collectionName];
		await collection.deleteMany({});
	}
}

async function dropAllCollections() {
	const collections = Object.keys(mongoose.connection.collections);
	for (const collectionName of collections) {
		const collection = mongoose.connection.collections[collectionName];
		try {
			await collection.drop();
		} catch (error) {
			// Sometimes this error happens, but you can safely ignore it
			if (error.message === "ns not found") return;
			// This error occurs when you use it.todo. You can
			// safely ignore this error too
			if (error.message.includes("a background operation is currently running"))
				return;
			console.log(error.message);
		}
	}
}

module.exports = {
	setupDB(databaseName, deleteAfterEach = true) {
		// Connect to Mongoose
		beforeAll(async () => {
			// TODO: Configure database in better way
			await mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`, {
				useUnifiedTopology: true,
				useNewUrlParser: true,
				poolSize: 10
			});
		});

		// Cleans up database between each test
		afterEach(async () => {
			if (deleteAfterEach) {
				await removeAllCollections();
			}
		});

		// Disconnect Mongoose
		afterAll(async () => {
			await dropAllCollections();
			await mongoose.connection.close();
		});
	}
};
