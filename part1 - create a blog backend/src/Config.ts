import * as dotenv from 'dotenv'

dotenv.config()

export const MongoDBConfig = {
  url: process.env.MONGODB_URI,
  options: {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  },
}

export const ServiceConfig: {
  label: string
  host: string
  port: number
} = {
  label: 'BlogQL',
  host: 'localhost',
  port: 4000,
}
