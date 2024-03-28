import Joi from 'joi'

import { PasswordTooShortError400 } from '~/server/errors'

export const signUpSchema = Joi.object({
  username: Joi.string()
    .pattern(/~|,|:|;|\\|"|\||<|>|'|=|!|#|\$|%|\^|&|\*|\(|\)|-/, { invert: true })
    .required()
    .error((errors) => {
      errors.forEach((error) => {
        if (error.code === 'string.pattern.invert.base') throw createError()
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

export const loginSchema = Joi.object({
  username: Joi.string()
    .pattern(/~|,|:|;|\\|"|\||<|>|'|=|!|#|\$|%|\^|&|\*|\(|\)|-/, { invert: true })
    .required()
    .error((errors) => {
      errors.forEach((error) => {
        if (error.code === 'string.pattern.invert.base') throw createError()
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

export const changePasswordSchema = Joi.object({
  current_password: Joi.string().required(),
  new_password: Joi.string()
    .min(4)
    .required()
    .error((errors) => {
      errors.forEach((error) => {
        if (error.code === 'string.min') throw createError(PasswordTooShortError400)
      })
      return errors
    }),
  confirm_password: Joi.string().required()
}).required()

export const addBookSchema = Joi.object({
  book_name: Joi.string().required(),
  book_total_page: Joi.number().required()
}).required()

export const addNoteSchema = Joi.object({
  note_title: Joi.string().required(),
  note_content: Joi.string(),
  note_book_id: Joi.string().required()
}).required()

export const addPostSchema = Joi.object({
  post_content: Joi.string().required()
}).required()

export const patchPostSchema = Joi.object({
  post_likes: Joi.number().valid(1, -1).required()
}).required()
