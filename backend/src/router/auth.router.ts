import { Router } from "express";
import { createUser } from "../controller/user.controller";
import { signUpSchema } from "../validation/auth.validation";
import { validateRequest } from "../utils/validateRequest";

const authRouter = Router();

authRouter.post("/register", validateRequest(signUpSchema), createUser);

export default authRouter;
