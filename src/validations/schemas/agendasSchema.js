const joi = require('joi')

const agendasSchema = joi.object({
    agenda_name: joi.string().required(),
    agenda_type: joi.number().required(),
    procedure_type:joi.string().required(), 
    start_time: joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/), 
    end_time: joi.string().regex(/^([0-9]{2})\:([0-9]{2})$/), 
    date: joi.date().iso().required(), 
    slots_available: joi.number().required(), 
    additional_slots: joi.number().required(), 
    is_active: joi.boolean().invalid(true)
})

module.exports = agendasSchema