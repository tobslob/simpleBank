import Joi from "@hapi/joi";
import { JoiValidator } from "@app/data/util";

export const isUser = Joi.object({
  firstName: JoiValidator.validateString().required(),
  lastName: JoiValidator.validateString().required(),
  emailAddress: JoiValidator.validateEmail().required(),
  password: JoiValidator.validatePassword().required(),
  currency: JoiValidator.validateString().valid(["GBP", "USD"]).required(),
});

export const isLogin = Joi.object({
  emailAddress: JoiValidator.validateEmail().required(),
  password: JoiValidator.validatePassword().required(),
});

export const isID = Joi.object({
  id: JoiValidator.validateID().required(),
});
