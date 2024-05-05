import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// export const signup = async (req, res, next) => {
//   const { username, email, password } = req.body;
//   const hashPass = bcryptjs.hashSync(password, 10);
//   const user = new User({ username, email, password: hashPass });

//   try {
//     await user.save();
//     res.status(201).send("User created successfully");
//   } catch (error) {
//     next(errorHandler(500, error));
//   }

// };
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (!userExist) return next(errorHandler(404, "No user"));
    const checkPassword = bcryptjs.compareSync(password, userExist.password);
    if (!checkPassword)
      return next(errorHandler(401, "wrong user or password "));

    const token = jwt.sign({ id: userExist._id }, process.env.JWT_KEY);
    const { password: pass, ...rest } = userExist._doc;

    //save token as a cookie
    res.cookie("accessToken", token, { httpOnly: true }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("accessToken", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-8),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("accessToken", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};



export const signOut = async(req,res,next)=>{
  try {
    res.clearCookie('accessToken')
    res.status(200).json('User logged out')
  } catch (error) {
    next(error);

  }
}