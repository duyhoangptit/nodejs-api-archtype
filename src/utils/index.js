const jwt = require("jsonwebtoken");

const {
    APP_SECRET,
} = require("../config");
const {Types} = require("mongoose");

module.exports.validateSignature = async (req) => {
    try {
        const signature = req.get("Authorization");
        console.log(signature);
        req.user = await jwt.verify(signature.split(" ")[1], APP_SECRET);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

module.exports.formatData = (data) => {
    if (data) {
        return { data };
    } else {
        throw new Error("Data Not found!");
    }
};


module.exports.unGetSelectData = (select = []) => {
    return Object.fromEntries(select.map((el => [el, 0])))
}

module.exports.convert2ObjectId = id => {
    return new Types.ObjectId(id)
}
