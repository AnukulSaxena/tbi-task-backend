// Import necessary modules
import dotenv from "dotenv";
import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// Load environment variables from .env file
dotenv.config({
  path: ".env",
});

// Function to establish connection with MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using provided URI and database name
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log("MongoDB Connected");
  } catch (err) {
    // Log error if connection fails and exit the process
    console.log("MongoDB ERROR : ", err);
    process.exit(1);
  }
};

// Export the connectDB function
export default connectDB;
