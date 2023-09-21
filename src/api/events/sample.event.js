const SampleService = require('../../services/sample.service')
const {subscribeMessage} = require('../../services/subcriptions')

module.exports = (channel) => {

    const service = new SampleService()

    subscribeMessage(channel, service)
}
