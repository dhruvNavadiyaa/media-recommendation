import { RequestHandler } from "express";
import User from "../model/user.model";
import { AppError } from "../utils/AppError";
import { successResponse } from "../utils/response";
import jwt from "jsonwebtoken";
import { TOKEN_EXPIRES, TOKEN_SECRATE } from "../config/env";

const signUp: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;
  const findeUser = await User.findOne({ email });

  if (findeUser) {
    throw new AppError("User already exists", 400);
  }

  const user = await User.create({ name, email, password });

  return successResponse(res, 201, "OTP sent successfully", user);
};

const verifyOTP: RequestHandler = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new AppError("User not found", 400);

  if (!user.otp || !user.otp.code) throw new AppError("OTP not sent", 400);

  if (user.otp.code !== otp) throw new AppError("Invalid OTP", 400);

  const now = new Date();

  if (
    user.otp.sendAt &&
    now.getTime() - user.otp.sendAt.getTime() > 5 * 60 * 1000
  )
    throw new AppError("OTP expired", 400);

  user.isVerified = true;
  user.otp = { code: null, sendAt: null };

  await user.save();

  return successResponse(res, 200, "Email verified successfully", {
    user,
  });
};

const signIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new AppError("User not found.", 404);

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) throw new AppError("Invalid credentials.", 400);

  if (!user.isVerified)
    throw new AppError("Please verify your email before logging in.", 403);

  const token = jwt.sign({ id: user._id, email: user.email }, TOKEN_SECRATE, {
    expiresIn: TOKEN_EXPIRES,
  });

  successResponse(res, 200, "Login successful", {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  });
};

export { signUp, verifyOTP, signIn };
