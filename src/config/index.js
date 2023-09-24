const dotEnv = require('dotenv')

const nodeEnv = process.env.NODE_ENV;

if (nodeEnv !== 'prod') {
    const configFile = `./.env.${nodeEnv}`
    dotEnv.config({ path: configFile })
} else {
    dotEnv.config()
}

module.exports = {
    PORT: process.env.PORT ?? 3000,
    APP_SECRET: process.env.APP_SECRET ?? '',
    SERVICE_NAME: process.env.SERVICE_NAME ?? '',
    DB_URL: process.env.MONGODB_URI ?? '',
    MSG_QUEUE_URL: process.env.MSG_QUEUE_URL ?? '',
    EXCHANGE_NAME: process.env.EXCHANGE_NAME ?? '',
    REDIS_HOST: process.env.REDIS_HOST ?? '',
    REDIS_PORT: process.env.REDIS_PORT ?? '',
}
