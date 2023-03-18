import { JoiValidator } from "@app/data/util";
import Joi from "@hapi/joi";

export const isTransfer = Joi.object({
  toAccountId: JoiValidator.validateString()
    .regex(/^[0-9]{8}$/)
    .required(),
  amount: JoiValidator.validateNumber().required(),
});
