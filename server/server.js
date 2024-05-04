import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";
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


app.post("/api/auth/signup",async (req, res, next) => {
  const { username, email, password } = req.body;

  const newUser = new User({ username, email, password});
  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
} );

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


app.use("api/user", userRouter);
app.use("api/auth", authRouter);