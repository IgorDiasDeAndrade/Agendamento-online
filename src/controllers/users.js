const knex = require('../connection')

const showUsers = async (req, res) => {
    try {
        const allUsers = await knex('users')
        res.status(200).json({message: allUsers})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    showUsers
}