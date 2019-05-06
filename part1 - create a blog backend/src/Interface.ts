import { MongoDBConfig } from './Config'
import * as mongoose from 'mongoose'
import * as bluebird from 'bluebird'
import { logger } from './Logger'

export enum ConnectionStatus {
  DISCONNECTED = 'DISCONNECTED',
  CONNECTED = 'CONNECTED',
  ERROR = 'ERROR',
}

export interface ConnectionManager {
  connection: any
  connectionStatus: string
  label: string

  connect: () => void
  disconnect: () => void
}

export class MongoDBConnectionManager implements ConnectionManager {
  label = 'MongoDB'
  connectionStatus = ConnectionStatus.DISCONNECTED

  connection: mongoose.Connection
  private connected: () => void
  private error: (err: any) => void
  private disconnected: (err: any) => void

  constructor(
    connected = () => {},
    error = err => {},
    disconnected = err => {},
  ) {
    this.connected = connected
    this.error = error
    this.disconnected = disconnected
  }

  connect() {
    ;(mongoose as any).Promise = bluebird

    mongoose.set('debug', true)
    mongoose.connect(MongoDBConfig.url, MongoDBConfig.options)

    mongoose.connection.on('connected', () => {
      logger.info('MongoDB Connected')
      this.connectionStatus = ConnectionStatus.CONNECTED
      this.connected()
    })

    mongoose.connection.on('error', err => {
      logger.error('MongoDB Error')
      this.connectionStatus = ConnectionStatus.ERROR
      this.error(err)
    })

    mongoose.connection.on('disconnected', err => {
      logger.info('MongoDB Disconnected')
      this.connectionStatus = ConnectionStatus.DISCONNECTED
      this.disconnected(err)
    })

    this.connection = mongoose.connection
  }

  disconnect() {
    this.connection.close()
  }
}

export const ApplicationDependencies: {
  [index: string]: ConnectionManager
} = {
  MongoDB: new MongoDBConnectionManager(),
}
