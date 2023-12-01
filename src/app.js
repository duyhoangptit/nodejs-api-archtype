const express = require('express')
const cors = require('cors')
const corsOptions = require('./config/cors/cors.config')
const {sampleApi, healthApi} = require('./api')
const sampleEvent = require('./api/events/sample.event')
const errorHandler = require('./exceptions/error-handler')
const {openApi} = require('./config/swagger/swagger.config')

module.exports = async (app, channel) => {
    app.use(express.json())
    app.use(cors({
        origin: corsOptions
    }))
    app.use(express.static(__dirname + '/public'))

    // swagger, open api
    openApi(app)

    // health check
    healthApi(app)

    // api
    sampleApi(app)

    // handler errors global
    app.use(errorHandler)

    // event
    sampleEvent(channel)

}
