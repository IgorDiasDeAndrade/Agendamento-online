const express = require('express')
const routes = express()
const {showUsers} = require('./controllers/users')

routes.get('/', (req, res)=>{
    res.send('Server up')
})

routes.get('/users', showUsers)

module.exports = routes