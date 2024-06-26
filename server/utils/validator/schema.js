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

export const patchBookSchema = Joi.object({
  book_read_page: Joi.number().required()
}).required()

export const addNoteSchema = Joi.object({
  note_title: Joi.string().required(),
  note_content: Joi.string(),
  note_book_id: Joi.string().required()
}).required()

export const patchNoteSchema = Joi.object({
  note_title: Joi.string().default(''),
  note_content: Joi.string().default('')
}).required()

export const likeNoteSchema = Joi.object({
  note_like: Joi.number().valid(1, 0).required()
}).required()

export const addPostSchema = Joi.object({
  post_title: Joi.string().required(),
  post_content: Joi.string().required()
}).required()

export const patchPostSchema = Joi.object({
  post_likes: Joi.number().valid(1, -1).required()
}).required()

export const postFollowSchema = Joi.object({
  follow_user_id: Joi.string().required(),
  follow_or_not: Joi.number().valid(1, 0).required()
}).required()

export const postCollectionSchema = Joi.object({
  collection_post_id: Joi.string().required(),
  collection_or_not: Joi.number().valid(1, 0).required()
}).required()
