const knex = require('../connection')

const createPatient = async (req, res) => {
    const {cpf, name, birthday, mothers_name, fathers_name, contact_number_1, contact_number_2, obs} = req.body

    try {
        const newPatient = await knex('patients').insert({
            cpf,
            name,
            birthday,
            mothers_name,
            fathers_name,
            contact_number_1,
            contact_number_2,
            obs,
            user_id: req.user.id
        }).returning('*')
        
        return res.status(200).json({newPatient})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const showPatients = async (req, res) => {
    try {
        const allPatients = await knex('patients')
        return res.status(200).json({ message: allPatients})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

module.exports = {
    createPatient,
    showPatients
}