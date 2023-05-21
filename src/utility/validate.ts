import Joi from "joi";

export const workerInputSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  lastName: Joi.string().required(),
  firstName: Joi.string().required(),
  role: Joi.string().required(),
  //   salt: Joi.string().required(),
});
