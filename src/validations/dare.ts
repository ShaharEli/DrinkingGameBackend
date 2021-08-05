import Joi from "joi";

export const dareValidationSchema = Joi.object({
  type: Joi.string().required().valid("question", "dare"),
  text: Joi.string().required().min(6).max(500),
  img: Joi.string().min(6).max(500).uri(),
  punishment: Joi.string().required().min(6).max(500),
});
