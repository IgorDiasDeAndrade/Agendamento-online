const joi = require('joi')

const patientsSchema = joi.object({
    cpf: joi.string().length(11).required().regex(/^\d+$/),
    name: joi.string().required(),
    birthday: joi.date().iso().required(),
    mothers_name: joi.string().allow(''),
    fathers_name: joi.string().allow(''),
    contact_number_1: joi.string().length(11).required(),
    contact_number_2: joi.string().length(11).allow(''),
    obs: joi.string().allow(''),
    zip_code: joi.string().length(8).allow(''),
    address: joi.string().allow(''),
    complement: joi.string().allow(''),
    neighborhood: joi.string().allow(''),
    location: joi.string().allow(''),
    uf: joi.string().length(2).allow(''),
    number: joi.string().allow(''),
})

module.exports = patientsSchema