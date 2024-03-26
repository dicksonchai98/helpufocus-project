import logger from './logger'

export default function errorHandler(handler) {
  return defineEventHandler(async (event) => {
    try {
      const response = await handler(event)
      return response
    } catch (error) {
      logger.error(`${error.stack}`)
      if (!error.statusCode) {
        throw createError({
          data: {
            errorCode: '-1',
            errorMessage: 'Internal Server Error'
          },
          statusCode: 500,
          statusMessage: 'Internal Server Error'
        })
      } else {
        throw error
      }
    }
  })
}
