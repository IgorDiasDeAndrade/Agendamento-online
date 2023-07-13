const knex = require('../connection')

const createAddress = async (req, res) => {
    const {zip_code, address, complement, neighborhood, location, uf, patient_id} = req.body

    try {
        await knex('addresses').insert({
            zip_code,
            address,
            complement,
            neighborhood,
            location,
            uf,
            patient_id
        })
        return res.status(200).json()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const editAddress = async (req, res) => {
    const {patient_id} = req.params
    const {zip_code, address, complement, neighborhood, location, uf} = req.body
    try {
        await knex('addresses').update({
            zip_code,
            address, 
            complement, 
            neighborhood, 
            location, 
            uf
        }).where({patient_id: patient_id})
        return res.status(200).json()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const showPatientAndAddress = async (req, res) => {
    const {patient_id} = req.params
    try {
        const addressPatient = await knex('patients')
        .select(
          'patients.id',
          'patients.cpf',
          'patients.name',
          'patients.mothers_name',
          'patients.fathers_name',
          'patients.contact_number_1',
          'patients.contact_number_2',
          'patients.obs',
          'patients.birthday',
          'patients.user_id',
          'addresses.id as address_id',
          'addresses.zip_code',
          'addresses.address',
          'addresses.complement',
          'addresses.neighborhood',
          'addresses.location',
          'addresses.uf',
          'addresses.patient_id'
        )
        .join('addresses', 'patients.id', '=', 'addresses.patient_id')
        .where({patient_id: patient_id})

        return res.status(200).json({message: addressPatient})
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    createAddress,
    editAddress,
    showPatientAndAddress
}