const catchAsync = require('../../helpers/catch.async')
const {OK} = require("../../exceptions/success.response");

module.exports = (app) => {
    app.get('/api/heath-check', catchAsync(async (req, res) => {
        const healthcheck = {
            uptime: process.uptime(),
            message: 'OK',
            timestamp: Date.now()
        }

        OK(res, 'Health check is OK', healthcheck)
    }))

}
