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

module.exports = {
    createAddress
}