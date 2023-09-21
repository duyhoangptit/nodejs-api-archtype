const {SampleRepository} = require('../database')

class SampleService {

    constructor() {
        this.repository = new SampleRepository()
    }

    async testApi() {
        return await this.repository.create({
            fullName: 'sample',
            msisdn: '84xxxxxxxxx'
        })
    }


    async listenEvent(payloadStr) {
        const payload = JSON.parse(payloadStr)
        const {event, data} = payload

        switch (event) {
            case 'sample1':
                break;
            default:
                break;
        }
    }
}

module.exports = SampleService;

