require('dotenv').config()
const knex = require("../connection")
const jwt = require("jsonwebtoken")
const secretPassword = process.env.JWTKEY

const authentication = async (req, res, next) => {
    const {authorization} = req.headers

    if (!authorization) {
        return res.status(401).json({ message: "Not authorized." })
    }

    try {
        const token = authorization.split(" ")[1]

        const verified = jwt.verify(token, secretPassword)
        
        const userType = verified.userType;
        if (userType !== 'backoffice' && userType !== 'user' && userType !== 'client') {
          return res.status(403).json({ message: 'Not authorized.' });
        }
        

        if(userType == 'user'){
            const user = await knex('users').where({ id: verified.id }).returning('*')
    
            if (user.length === 0) {
                return res.status(401).json({ message: "Not authorized." })
            }

            const { password: _, ...userData } = user[0]
            req.user = userData
            req.userType = userType
        }

        if(userType == 'backoffice'){
            const backOfficeUser = await knex('backoffice').where({ id: verified.id }).returning('*')
    
            if (backOfficeUser.length === 0) {
                return res.status(401).json({ message: "Not authorized." })
            }

            const { password: _, ...userData } = backOfficeUser[0]
            req.backOfficeUser = userData
            req.userType = userType
        }

        if(userType == 'client'){
            const clientUser = await knex('clients').where({ id: verified.id }).returning('*')
    
            if (clientUser.length === 0) {
                return res.status(401).json({ message: "Not authorized." })
            }

            const { password: _, ...userData } = clientUser[0]
            req.clientUser = userData
            req.userType = userType
        }

        next()
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

module.exports = {
    authentication
}