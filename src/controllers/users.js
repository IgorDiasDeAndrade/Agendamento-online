require('dotenv').config()
const knex = require('../connection')
const jwt = require("jsonwebtoken")
const secretPassword = process.env.JWTKEY
const bcrypt = require('bcrypt')

const showUsers = async (req, res) => {
    try {
        const allUsers = await knex.select('id', 'name', 'username', 'email', 'phone', 'account_type_id')
        .from('users')
        return res.status(200).json({message: allUsers})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const userSignUp = async (req, res) => {
    const { name, username, password, email, phone} = req.body

    try {

        const encryptedPassword = await bcrypt.hash(password, 10)
        const account_type_id = 3
        
        await knex('users').insert({
            name,
            username,
            password: encryptedPassword,
            email,
            phone,
            account_type_id: account_type_id
        })

        return res.status(200).json()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

const userLogin = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({ message: "Campos obrigatórios em branco" })
    }

    try {
        const userType = 'user'
        const user = await knex('users').where({ email: email }).returning('*')

        if (user.length === 0) {
            return res.status(400).json({ message: "E-mail ou senha incorretos." })
        }

        const correctPassword = await bcrypt.compare(password, user[0].password)

        if (!correctPassword) {
            return res.status(400).json({ message: "E-mail ou senha incorretos." })
        }

        const token = jwt.sign({ id: user[0].id, userType }, secretPassword, { expiresIn: '8h' })

        const { password: _, ...userData } = user[0]

        return res.status(200).json({
            user: userData,
            token
        })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const userListing = async (req, res) => {
    try {
        if (req.userType !== 'user') {
            return res.status(401).json({ message: 'Invalid user credentials' })
        }
        const { password: _, ...currentUser } = req.user
        return res.status(200).json(currentUser)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const updateUser = async (req, res) => {
    const {name, password, email, phone} = req.body
    try {
        const encryptedPassword = await bcrypt.hash(password, 10)

        await knex('users').update({
            name: name,
            email: email,
            password: encryptedPassword,
            phone: phone
        }).where({ id: req.user.id })
        
        return res.status(200).json()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const editAccountType = async (req, res) =>{
    const { id } = req.params
    const { account_type_id } = req.body

    try {
        if(req.user.account_type_id != 2){
            return res.status(401).json({message: "Apenas Administradores podem alterar tipos de contas de outros usuários"})
        }

        await knex('users').update({
            account_type_id: account_type_id
        }).where({id: id})

        return res.status(200).json()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    showUsers,
    userSignUp,
    userLogin,
    userListing,
    updateUser,
    editAccountType
}