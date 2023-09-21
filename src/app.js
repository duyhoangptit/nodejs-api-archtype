const express = require('express')
const cors = require('cors')
const {createChannel} = require("./message-brocker/rabbitmq");
const {sampleApi, healthApi} = require('./api')
const sampleEvent = require('./api/events/sample.event')

module.exports = async (app) => {
    app.use(express.json())
    app.use(cors())
    app.use(express.static(__dirname + '/public'))

    // health check
    healthApi(app)

    // api
    sampleApi(app)

    // create channel rabbit mq
    const channel = await createChannel()

    // event
    sampleEvent(channel)
}
