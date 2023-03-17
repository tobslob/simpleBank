import Joi from '@hapi/joi'
import { JoiValidator } from '@app/data/util'
import { values } from 'lodash'
import { Currency } from '@app/data/account/account.model'

export const isUser = Joi.object({
  firstName: JoiValidator.validateString().required(),
  lastName: JoiValidator.validateString().required(),
  emailAddress: JoiValidator.validateEmail().required(),
  password: JoiValidator.validatePassword().required(),
  currency: JoiValidator.validateString().allow(values(Currency)).required()
})

export const isLogin = Joi.object({
  emailAddress: JoiValidator.validateEmail().required(),
  password: JoiValidator.validatePassword().required()
})
