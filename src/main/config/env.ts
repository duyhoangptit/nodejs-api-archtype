import * as dotEnv from 'dotenv'

const nodeEnv = process.env.NODE_ENV ?? 'dev'

if (nodeEnv !== 'prod') {
  const configFile = `./environments/.env.${nodeEnv}`
  dotEnv.config({ path: configFile })
} else {
  dotEnv.config()
}

export default {
  PORT: process.env.PORT ?? 3000,
  DB_URL: process.env.MONGODB_URI ?? 'mongodb://mongodb:27017/catalog',
  APP_SECRET: process.env.APP_SECRET,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  MSG_QUEUE_URL: process.env.MSG_QUEUE_URL,
  CUSTOMER_SERVICE: 'customer_service',
  SHOPPING_SERVICE: 'shopping_service',
}
