const express = require('express')
const routes = express()
const {showUsers, userSignUp, userLogin, userListing, updateUser, editAccountType} = require('./controllers/users')
const validateBodyRequisition = require('./middlewares/validateBodyRequisition')
const usersSchema = require('./validations/schemas/usersSchema')
const patientsSchema = require('./validations/schemas/patientsSchema')
const { authentication } = require('./middlewares/authentication')
const { createPatient, showPatients, removePatient, editPatients } = require('./controllers/patients')
const { createAddress } = require('./controllers/addresses')
const addressSchema = require('./validations/schemas/addressSchema')

routes.get('/', (req, res)=>{
    res.send('Server up')
})

routes.get('/users', showUsers)
routes.post('/signup', validateBodyRequisition(usersSchema), userSignUp)
routes.post('/login', userLogin)

routes.use(authentication)

routes.get('/user', userListing)
routes.put('/user', updateUser)
routes.patch('/user/:id', editAccountType)
routes.post('/patient', validateBodyRequisition(patientsSchema), createPatient)
routes.get('/patients', showPatients)
routes.delete('/patient/:id', removePatient)
routes.put('/patient/:id', validateBodyRequisition(patientsSchema), editPatients)
routes.post('/patient/address', validateBodyRequisition(addressSchema), createAddress)


module.exports = routes