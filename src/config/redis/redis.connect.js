const redis = require('redis')
const {REDIS_HOST, REDIS_PORT} = require('../index')

class RedisConnect {
    constructor() {
        this.connect()
    }

    connect() {
        const client = redis.createClient({
            port: REDIS_PORT,
            host: REDIS_HOST,
        });

        client.on('connect', () => {
            console.log(`Connected: Redis connected host ${REDIS_HOST} port ${REDIS_PORT}!`)
        });

        client.on('error', () => {
            console.log(`Error: Redis connected host ${REDIS_HOST} port ${REDIS_PORT}!`)
        });
    }

    static getInstance() {
        if (!RedisConnect.instance) {
            RedisConnect.instance = new RedisConnect()
        }

        return RedisConnect.instance
    }
}

module.exports = RedisConnect
