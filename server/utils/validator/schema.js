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

<<<<<<< HEAD
=======
export const patchBookSchema = Joi.object({
  book_read_page: Joi.number().required()
}).required()

>>>>>>> b3a99cb2d0a4769b2ead1c85383e8f7a42693f64
export const addNoteSchema = Joi.object({
  note_title: Joi.string().required(),
  note_content: Joi.string(),
  note_book_id: Joi.string().required()
}).required()

<<<<<<< HEAD
export const addPostSchema = Joi.object({
=======
export const patchNoteSchema = Joi.object({
  note_title: Joi.string().default(''),
  note_content: Joi.string().default(''),
}).required()

export const likeNoteSchema = Joi.object({
  note_like: Joi.number().valid(1, 0).required()
}).required()

export const addPostSchema = Joi.object({
  post_title: Joi.string().required(),
>>>>>>> b3a99cb2d0a4769b2ead1c85383e8f7a42693f64
  post_content: Joi.string().required()
}).required()

export const patchPostSchema = Joi.object({
  post_likes: Joi.number().valid(1, -1).required()
}).required()
