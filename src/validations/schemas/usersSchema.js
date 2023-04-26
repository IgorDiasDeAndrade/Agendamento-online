const joi = require('joi')
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

const usersSchema = joi.object({
    name: joi.string().required(),
    username: joi.string().alphanum().required(),
    password: joiPassword
    .string()
    .minOfSpecialCharacters(2)
    .minOfLowercase(2)
    .minOfUppercase(2)
    .minOfNumeric(2)
    .noWhiteSpaces()
    .onlyLatinCharacters()
    .required(),
    email: joi.string().email().required(),
    phone: joi.string().alphanum().length(9).required(),
    account_type_id: joi.number().required()
})

module.exports = usersSchema