const amqplib = require('amqplib')
const {
    MSG_QUEUE_URL,
    EXCHANGE_NAME
} = require("../config");

module.exports.createChannel = async () => {
    try {
        const connection = await amqplib.connect(MSG_QUEUE_URL)
        const channel = await connection.createChannel()
        await channel.assertQueue(EXCHANGE_NAME, 'direct', {durable: true})
        return channel
    } catch (err) {
        throw err
    }
}
