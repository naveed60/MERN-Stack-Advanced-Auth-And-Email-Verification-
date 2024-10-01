import mongoose from "mongoose";

export const connectDB = async () => {
	const MONGO_URI ="mongodb+srv://imnaveed60:mna12345@cluster0.kzc40.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
	try {
		console.log("mongo_uri: ", MONGO_URI);
		const conn = await mongoose.connect(MONGO_URI);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.log("Error connection to MongoDB: ", error.message);
		process.exit(1); // 1 is failure, 0 status code is success
	}
};