const bcrypt = require('bcrypt')

exports.passwordHash = async function (password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

exports.checkPassword = async function (reqPassword, dbPassword) {
    const validPassword = await bcrypt.compare(reqPassword, dbPassword)
    return validPassword;
}
