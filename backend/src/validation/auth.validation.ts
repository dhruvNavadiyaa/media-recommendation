import Joi from "joi";

const signUpSchema = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(6).required(),
  }).required();



  export { signUpSchema };