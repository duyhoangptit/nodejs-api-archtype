const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SampleSchema = new Schema({
    fullName: {type: String, require: true},
    msisdn: {type: String},
});

module.exports = mongoose.model('sample', SampleSchema)
