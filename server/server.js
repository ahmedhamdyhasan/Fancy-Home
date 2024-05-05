import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
import listingRoute from './routes/listingRoute.js'
import cookieParser from "cookie-parser";
import cors from 'cors'


import User from "./models/userModel.js";




dotenv.config();
mongoose
  .connect(
    process.env.MONGO_CONNECTION
  )
  .then(() => console.log("Connected to DB"))
  .catch((e) => console.log(e));

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors())




app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
   success:false,
    statusCode,
    message,
  });
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT} `);
});


app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRoute);
