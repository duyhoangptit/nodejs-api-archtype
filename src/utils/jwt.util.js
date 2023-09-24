const jwt = require('jsonwebtoken')
const {APP_SECRET} = require('../config')

module.exports.validateSignature = async (req) => {
    try {
        const token = req.get('Authorization')
        console.log(token)

        req.user = await jwt.verify(token.split(' ')[1], APP_SECRET)

        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

module.exports.generateToken = async (payload, expireTime) => {
    try {
        return await jwt.sign(payload, APP_SECRET, {expiresIn: expireTime})
    } catch (err) {
        return err
    }
}
