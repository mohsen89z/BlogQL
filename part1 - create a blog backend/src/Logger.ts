import { format, Logger, transports, createLogger } from 'winston'
import { ServiceConfig } from './Config'

const { combine, timestamp, label, printf } = format

const serviceLogFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${
    typeof info.message === 'object'
      ? JSON.stringify(info.message)
      : info.message
  }`
})

export const logger: Logger = createLogger({
  transports: [
    // Console Logger Settings
    new transports.Console({
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
      handleExceptions: true,
      format: combine(
        format.colorize(),
        label({ label: ServiceConfig.label }),
        timestamp(),
        serviceLogFormat,
      ),
    }),
  ],
  exitOnError: false,
})
