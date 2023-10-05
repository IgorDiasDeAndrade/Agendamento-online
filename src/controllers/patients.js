const knex = require('../connection')

const showPatients = async (req, res) => {
    try {
        const allPatients = await knex('patients')
        return res.status(200).json({ message: allPatients })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const createPatient = async (req, res) => {
    const { cpf, name, birthday, mothers_name, fathers_name, contact_number_1, contact_number_2, obs, zip_code, address, complement, neighborhood, location, number, uf } = req.body

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

        const newAddress = await knex('addresses').insert({
            zip_code,
            address,
            complement,
            neighborhood,
            location,
            number,
            uf,
            patient_id: newPatient[0].id,
        }).returning('*')



        return res.status(200).json({ newPatient, newAddress })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const removePatient = async (req, res) => {
    const { id } = req.params
    try {
        const isPatient = await knex('patients').where({ id })
        if (isPatient.length == 0) {
            return res.status(404).json({ message: 'Paciente não encontrado' })
        }
        await knex('addresses').where({ patient_id: id }).del()
        await knex('patients').where({ id: id }).del()
        return res.status(200).json()
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const showSpecificPatient = async (req, res) => {
    const { id } = req.params
    try {
        const specificPatient = await knex('patients').where({ id: id })
        return res.status(200).json({ message: specificPatient })
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

const editPatients = async (req, res) => {
    const { id } = req.params
    const { cpf, name, birthday, mothers_name, fathers_name, contact_number_1, contact_number_2, obs } = req.body
    try {
        const isPatient = await knex('patients').where({ id })
        if (isPatient.length == 0) {
            return res.status(404).json({ message: 'Paciente não encontrado' })
        }

        await knex('patients').update({
            cpf,
            name,
            birthday,
            mothers_name,
            fathers_name,
            contact_number_1,
            contact_number_2,
            obs
        }).where({ id: id })
        return res.status(200).json()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}


module.exports = {
    showPatients,
    createPatient,
    removePatient,
    editPatients,
    showSpecificPatient
}