import { Router } from "express";
import { signIn, signUp, verifyOTP } from "../controller/user.controller";
import {
  signInSchema,
  signUpSchema,
  verifyOtpSchema,
} from "../validation/auth.validation";
import { validateRequest } from "../utils/validateRequest";

const authRouter = Router();

authRouter.post("/signup", validateRequest(signUpSchema), signUp);
authRouter.post("/verify", validateRequest(verifyOtpSchema), verifyOTP);
authRouter.post("/signin", validateRequest(signInSchema), signIn);

export default authRouter;
