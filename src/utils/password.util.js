const bcrypt = require('bcrypt')

module.exports.generateSalt = () => {
    return bcrypt.genSalt();
}

module.exports.generatePassword = async (password, salt) => {
    return await bcrypt.hash(password, salt);
}

module.exports.ValidatePassword = async (
    enteredPassword,
    savedPassword,
    salt
) => {
    return await this.generatePassword(enteredPassword, salt) === savedPassword
}
