import {  RequestHandler } from "express";
import User from "../model/user.model";
import { AppError } from "../utils/AppError";
import { success } from "../utils/response";

const createUser : RequestHandler  = async (req,res) => {
    const { name, email, password } = req.body;
    const findeUser = await User.findOne({ email });

    if(findeUser) {
         throw new AppError("User already exists", 400);
    }
    const user = await User.create({ name, email, password });
    success(res, user, "User created successfully", 201);
}

export { createUser };
