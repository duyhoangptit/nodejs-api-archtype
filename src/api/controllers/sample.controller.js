const SampleService = require("../../services/sample.service");
const  UserAuth = require('../../middlewares/auth');
const catchAsync = require('../../helpers/catch.async')
const {OK} = require("../../exceptions/success.response");

module.exports = (app) => {
    // new service
    const service = new SampleService()

    app.get('/api/v1/sample', UserAuth, catchAsync(async (req, res) => {
        OK(res, 'Sample get success', await service.testApi())
    }))

    app.use('/api/v1/app-events', catchAsync(async (req, res) => {
        const {payload} = req.body

        console.log("Log payload::", payload)

        // handler subscribe events
        await service.listenEvent(payload);

        OK(res, 'Notified!!!', {})
    }))

}
