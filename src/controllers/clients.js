const knex = require('../connection')
const secretPassword = process.env.JWTKEY
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

const clientLogin = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "Required fields are blank" })
    }

    try {
        const userType = 'client'
        const client = await knex('clients').where({ email: email }).returning('*')

        if (client.length === 0) {
            return res.status(400).json({ message: "Incorrect cnpj or password." })
        }

        const correctPassword = await bcrypt.compare(password, client[0].password)

        if (!correctPassword) {
            return res.status(400).json({ message: "Incorrect cnpj or password." })
        }

        const token = jwt.sign({ id: client[0].id, userType }, secretPassword, { expiresIn: '8h' })

        const { password: _, ...clientData } = client[0]

        return res.status(200).json({
            client: clientData,
            token
        })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    newClient,
    clientLogin
}