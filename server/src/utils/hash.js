const bcrypt = require('bcrypt')


const passwordHash = async function (password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

const checkPassword = async function (reqPassword, dbPassword) {
    const validPassword = await bcrypt.compare(reqPassword, dbPassword)
    return validPassword;
}

module.exports = {
    passwordHash,
    checkPassword
}