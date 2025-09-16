import Joi from "joi";

const signUpSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
}).required();

const verifyOtpSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  otp: Joi.string()
    .length(6)
    .pattern(/^[0-9]+$/)
    .required(),
}).required();

const signInSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
}).required();

export { signUpSchema, verifyOtpSchema, signInSchema };
