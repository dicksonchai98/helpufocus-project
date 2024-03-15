import Joi from 'joi'

import { EmailFormatError400, PasswordTooShortError400 } from '~/server/errors'

export const signUpSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .error((errors) => {
      errors.forEach((error) => {
        if (error.code === 'string.email') throw createError(EmailFormatError400)
      })
      return errors
    }),
  password: Joi.string()
    .min(4)
    .required()
    .error((errors) => {
      errors.forEach((error) => {
        if (error.code === 'string.min') throw createError(PasswordTooShortError400)
      })
      return errors
    }),
  name: Joi.string().required()
}).required()

export const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .error((errors) => {
      errors.forEach((error) => {
        if (error.code === 'string.email') throw createError(EmailFormatError400)
      })
      return errors
    }),
  password: Joi.string()
    .min(4)
    .required()
    .error((errors) => {
      errors.forEach((error) => {
        if (error.code === 'string.min') throw createError(PasswordTooShortError400)
      })
      return errors
    })
}).required()

export const refreshSchema = Joi.object({
  refresh_token: Joi.string().required()
}).required()
