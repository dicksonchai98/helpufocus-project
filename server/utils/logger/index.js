import { createLogger, transports, format } from 'winston'

const { combine, timestamp, errors, printf, colorize, prettyPrint } = format

const myFormat = printf(({ level, message, stack, timestamp: ts }) => {
  if (message instanceof Error) {
    return `${ts} - ${level}: ${message} : ${stack}`
  }
  return `${ts} - ${level}: ${message}`
})

const accessLogger = createLogger({
  levels: {
    access: 0
  },
  transports: [
    new transports.Console({
      level: 'access',
      format: combine(
        timestamp(),
        colorize({
          colors: {
            access: 'grey'
          }
        }),
        myFormat
      )
    })
  ]
})

const debugLogger = createLogger({
  levels: {
    debug: 0
  },
  transports: [
    new transports.Console({
      level: 'debug',
      format: combine(
        timestamp(),
        colorize({
          colors: {
            debug: 'blue'
          }
        }),
        myFormat
      )
    })
  ]
})

const infoLogger = createLogger({
  levels: {
    info: 0
  },
  transports: [
    new transports.Console({
      level: 'info',
      format: combine(
        timestamp(),
        colorize({
          colors: {
            info: 'green'
          }
        }),
        myFormat
      )
    })
  ]
})

const warnLogger = createLogger({
  levels: {
    warn: 0
  },
  transports: [
    new transports.Console({
      level: 'warn',
      format: combine(
        timestamp(),
        colorize({
          colors: {
            warn: 'yellow'
          }
        }),
        myFormat
      )
    })
  ]
})

const errorLogger = createLogger({
  levels: {
    error: 0
  },
  transports: [
    new transports.Console({
      level: 'error',
      format: combine(
        errors({ stack: true }),
        timestamp(),
        colorize({
          colors: {
            error: 'red'
          }
        }),
        prettyPrint(),
        myFormat
      )
    })
  ]
})

export default {
  access: (message) => {
    accessLogger.log({
      level: 'access',
      message
    })
  },
  info: (message) => {
    infoLogger.log({
      level: 'info',
      message
    })
  },
  warn: (message) => {
    warnLogger.log({
      level: 'warn',
      message
    })
  },
  debug: (message) => {
    debugLogger.log({
      level: 'debug',
      message
    })
  },
  error: (message) => {
    errorLogger.log({
      level: 'error',
      message
    })
  }
}
