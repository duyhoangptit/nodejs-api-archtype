const {EXCHANGE_NAME, SERVICE_NAME}  =require('../../config')

module.exports.subscribeMessage = async (channel, service) => {
    await channel.assertExchange(EXCHANGE_NAME, 'direct', {durable: true})
    const q = await channel.assertQueue('', {exclusive: true})
    console.log(`waiting for messages in queue: ${q.queue}`)

    channel.bindQueue(q.queue, EXCHANGE_NAME, SERVICE_NAME)

    channel.consume(
        q.queue,
        (msg) => {
            if (msg.content) {
                const msgContent = msg.content.toString()
                console.log('Message is:: ', msgContent)
                service.listenEvent(msgContent)
            }
            console.log('Message X received')
        },{
            noAck: true
        }
    )
}

module.exports.publishMessage = (channel, service, msg) => {
    channel.publish(EXCHANGE_NAME, service, Buffer.from(msg))
    console.log("Sent:: ", msg)
}
