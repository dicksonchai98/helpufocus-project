import logger from './logger'

export default function defineWrappedErrorHandler(handler) {
  return defineEventHandler(async (event) => {
    try {
      const response = await handler(event)
      return response
    } catch (error) {
      logger.error(`${error.stack}`)
      if (!error.statusCode) {
        throw createError({
          statusCode: 500,
          statusMessage: 'Internal Server Error'
        })
      } else {
        throw error
      }
    }
  })
}
