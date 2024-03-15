import Joi from 'joi'

import { InputDataError400 } from '../../errors'

export default class Validator {
  constructor({ schema }) {
    this.schema = schema
  }

  async validate(validateValue) {
    try {
      const value = await this.schema.validateAsync(validateValue)
      return value
    } catch (error) {
      if (Joi.isError(error)) throw createError(InputDataError400)
      throw error
    }
  }
}
