require('dotenv').config()
const knex = require("../connection")
const jwt = require("jsonwebtoken")
const secretPassword = process.env.JWTKEY

const authentication = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ mensagem: "Não autorizado." })
    }

    try {
        const token = authorization.split(" ")[1]

        const { id } = jwt.verify(token, secretPassword)

        const user = await knex('users').where({ id: id }).returning('*')

        if (user.length === 0) {
            return res.status(401).json({ mensagem: "Nao autorizado." })
        }

        const { password: _, ...userData } = user[0]
        req.user = userData

        next()
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {
    authentication
}