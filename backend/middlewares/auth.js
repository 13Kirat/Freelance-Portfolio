import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // const { token } = req.cookies;
  // console.log(token)
  // if (!token) {
  req.user = await User.findById("69076682c3404c301e494b6d");
  // next();
  // return next(new ErrorHandler("User not Authenticated!", 400));
  // }
  // const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  // console.log(decoded)
  // req.user = await User.findById(decoded.id);
  // console.log(req.user)
  next();
});
