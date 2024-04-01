// Import necessary modules
import dotenv from "dotenv";
import connectDB from "./src/db/index.js";
import { app } from "./src/app.js";

// Load environment variables from .env file
dotenv.config({
  path: "./.env",
});

// Connect to MongoDB
connectDB()
  .then(() => {
    // Log any errors that occur during app execution
    app.on("error", (error) => {
      console.log("Error", error);
      throw error;
    });

    // Start the server
    app.listen(process.env.PORT || 4000, () => {
      console.log("listening on " + process.env.PORT || 4000);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed ", err);
  });
