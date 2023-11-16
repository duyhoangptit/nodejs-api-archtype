const {Api403Error} = require("../../exceptions/error.response");
const WHITE_LIST = ['http://localhost:4200'];

module.exports = (origin, callback) => {
    if (WHITE_LIST.indexOf(origin) !== -1) {
        callback(null, true);
    } else {
        callback(new Api403Error('Not Allowed by CORS'));
    }
}
