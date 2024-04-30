// Import necessary modules
import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

// Create Express app
const app = express();

// CORS options
const corsOptions = {
  origin: ["http://localhost:5173", "https://tbi-task.netlify.app", "http://localhost:4200"],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware to enable CORS
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json({ limit: "16kb" }));

// Middleware to parse URL-encoded requests
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Middleware to parse cookies
app.use(cookieParser());

// Import routes
import userRouter from "./routes/user.routes.js"; // User routes
import errorHandler from "./middlewares/errorHandler.middleware.js"; // Error handling middleware

// Default route
app.get("/", (req, res) => {
  res.send("Initial Page");
});

// Use userRouter for routes starting with '/api/v1/users'
app.use("/api/v1/users", userRouter);

// Error handling middleware
app.use(errorHandler);

// Export Express app
export { app };
