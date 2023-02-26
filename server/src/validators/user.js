const Joi = require('joi')
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
    min: 5,
    max: 20,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 5,
};

module.exports = function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(5).max(15).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: passwordComplexity(complexityOptions).required(),
        isVerified: Joi.boolean()
    })
    return schema.validate(user);
}
