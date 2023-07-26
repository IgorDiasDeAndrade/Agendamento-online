const joi = require('joi')

const clientsSchema = joi.object({
  cnpj: joi.string().required(),
  legal_name: joi.string().required(),
  trade_name: joi.string(),
  type: joi.string(),
  establishment_date: joi.date(),
  registration_status: joi.string(),
  share_capital: joi.number(),
  legal_nature: joi.string(),
  is_mei: joi.boolean(),
  phone: joi.string(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  shareholder_structure: joi.string(),
  main_activity: joi.string(),
  secondary_activities: joi.array().items(joi.string())
})

module.exports = clientsSchema