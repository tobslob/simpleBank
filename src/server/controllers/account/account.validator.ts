import Joi from "@hapi/joi";
import { JoiValidator } from "@app/data/util";

export const isAccount = Joi.object({
  currency: JoiValidator.validateString().valid(["GBP", "USD"]).required(),
});

export const isAccountNumber = Joi.object({
  account: JoiValidator.validateString().regex(/^[0-9]{8}$/),
});

export const isBalance = Joi.object({
  balance: JoiValidator.validateNumber().required(),
});
