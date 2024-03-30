//require('dotenv').config()
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import connectDB from "./src/db/index.js";
import { app } from "./src/app.js";

console.log(process.env.PORT);

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("err", error);
      throw error;
    });

    app.listen(process.env.PORT || 4000, () => {
      console.log("listening on " + process.env.PORT || 4000);
    });
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed ", err);
  });
