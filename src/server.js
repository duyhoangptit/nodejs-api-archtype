const express = require('express')
const {PORT} = require('./config')
const {Database} = require('./database')
const RedisConnect = require('./config/redis/redis.connect')
const expressApp = require('./app')

const config = require('./config')
const {createChannel} = require("./config/rabbitmq/rabbitmq");
const {exit} = require("./utils/exits.util");
console.log("config:: ", config)

const startServer = async () => {
    const app = express();

    // connection database
    await Database.getInstance()

    // connection redis
    await RedisConnect.getInstance()

    // connect rabbitmq and create channel rabbit mq
    const channel = await createChannel()

    // setting express app
    await expressApp(app, channel);

    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        exit();
    })
    .on('close', () => {
        // close channel rabbit mq to here
        channel.close()
    })
}

startServer().then(() => {
    console.log("Server start DONE")
})
