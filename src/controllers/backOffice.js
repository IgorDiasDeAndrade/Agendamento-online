require('dotenv').config()
const knex = require('../connection')
const jwt = require("jsonwebtoken")
const secretPassword = process.env.JWTKEY
const bcrypt = require('bcrypt')

const newBackOffice = async (req, res) => {
    const {name, username, email, password, phone} = req.body

    try {
        const encryptedPassword = await bcrypt.hash(password, 10)
        
        await knex('backoffice').insert({
            name,
            username,
            password: encryptedPassword,
            email,
            phone
        })

        return res.status(200).json()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const backOfficeLogin = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "Campos obrigatórios em branco" })
    }

    try {
        const backOfficeUser = await knex('backoffice').where({ email: email }).returning('*')

        if (backOfficeUser.length === 0) {
            return res.status(400).json({ message: "E-mail ou senha incorretos." })
        }

        const correctPassword = await bcrypt.compare(password, backOfficeUser[0].password)

        if (!correctPassword) {
            return res.status(400).json({ message: "E-mail ou senha incorretos." })
        }

        const token = jwt.sign({ id: backOfficeUser[0].id }, secretPassword, { expiresIn: '8h' })

        const { password: _, ...userData } = backOfficeUser[0]

        return res.status(200).json({
            backoffice: userData,
            token
        })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    newBackOffice,
    backOfficeLogin
}