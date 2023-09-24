const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
    APP_SECRET,
} = require("../config");

//Utility functions
module.exports.GenerateSalt = async () => {
    return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (
    enteredPassword,
    savedPassword,
    salt
) => {
    return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

module.exports.ValidateSignature = async (req) => {
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

module.exports.FormatData = (data) => {
    if (data) {
        return { data };
    } else {
        throw new Error("Data Not found!");
    }
};
