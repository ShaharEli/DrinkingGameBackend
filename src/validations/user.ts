import Joi from "joi";

export const userValidationSchema = Joi.object({
  email: Joi.string().required().email(),
  firstName: Joi.string().required().min(2),
  lastName: Joi.string().required().min(2),
  avatar: Joi.string(),
  password: Joi.string().required().min(6),
  language: Joi.string().required(),
});
