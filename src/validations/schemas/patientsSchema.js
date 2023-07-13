const joi = require('joi')

const patientsSchema = joi.object({
    cpf: joi.string().length(11).required().regex(/^\d+$/),
    name: joi.string().required(),
    birthday: joi.date().iso().required(),
    mothers_name: joi.string(),
    fathers_name: joi.string(),
    contact_number_1: joi.string().length(11).required(),
    contact_number_2: joi.string().length(11),
    obs: joi.string()
})

module.exports = patientsSchema