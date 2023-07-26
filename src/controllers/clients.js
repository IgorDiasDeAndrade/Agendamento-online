const knex = require('../connection')
const secretPassword = process.env.JWTKEY
const bcrypt = require('bcrypt')

const newClient = async (req, res) => {
    const { cnpj, 
        legal_name, 
        trade_name, 
        type, 
        establishment_date, 
        registration_status, 
        share_capital, 
        legal_nature, 
        is_mei, 
        phone, 
        email, 
        password, 
        shareholder_structure,
        main_activity, 
        secondary_activities 
    } = req.body

    try {
        if(req.userType !== 'backoffice'){
            return res.status(401).json({ message: 'Invalid user credentials' })
        }

        const encryptedPassword = await bcrypt.hash(password, 10)
        await knex('clients').insert({
            cnpj, 
            legal_name, 
            trade_name, 
            type, 
            establishment_date, 
            registration_status, 
            share_capital, 
            legal_nature, 
            is_mei, 
            phone, 
            email, 
            password: encryptedPassword, 
            shareholder_structure,
            main_activity, 
            secondary_activities
        })

        return res.status(200).json()

    } catch (error) {
        return res.status(500).json(error.message)
    }

}

module.exports = {
    newClient
}