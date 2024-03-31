import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173", "https://tbi-task.netlify.app"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import

import userRouter from "./routes/user.routes.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";

app.get("/", (req, res) => {
  res.send("Initial Page");
});

app.use("/api/v1/users", userRouter);

app.use(errorHandler);
export { app };
