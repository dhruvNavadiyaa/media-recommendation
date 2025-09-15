import { RequestHandler } from "express";
import User from "../model/user.model";
import { AppError } from "../utils/AppError";
import { successResponse, errorResponse } from "../utils/response";

const createUser: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const findeUser = await User.findOne({ email });

    if (findeUser) {
      throw new AppError("User already exists", 400);
    }

    const user = await User.create({ name, email, password });

    

    return successResponse(res, 201, "User created successfully", user);
  } catch (error) {
    return errorResponse(res, 500, "internal server error", {});
  }
};

export { createUser };
