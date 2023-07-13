const joi = require('joi')

const addressSchema = joi.object({
    zip_code: joi.string().length(8).required(),
    address: joi.string().required(),
    complement: joi.string().required(),
    neighborhood: joi.string().required(),
    location: joi.string().required(),
    uf: joi.string().length(2).required(),
    patient_id: joi.number()
})

module.exports = addressSchema