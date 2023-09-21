const {SampleModel} = require('../models')

class SampleRepository {

    async create(data) {
        return await SampleModel.create({
            fullName: data.fullName,
            msisdn: data.msisdn
        })
    }
}

module.exports = SampleRepository
