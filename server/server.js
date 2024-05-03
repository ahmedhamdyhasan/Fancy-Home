import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected to DB"))
  .catch((e) => console.log(e));

const app = express();
app.listen(3000, () => {
  console.log("Server is running on port 3000 ");
});
