const express = require('express')
const routes = express()
const {showUsers, userSignUp, userLogin, userListing, updateUser, editAccountType} = require('./controllers/users')
const validateBodyRequisition = require('./middlewares/validateBodyRequisition')
const usersSchema = require('./validations/schemas/usersSchema')
const patientsSchema = require('./validations/schemas/patientsSchema')
const { authentication } = require('./middlewares/authentication')
const { createPatient, showPatients, removePatient, editPatients, showSpecificPatient } = require('./controllers/patients')
const { createAddress, editAddress, showPatientAndAddress } = require('./controllers/addresses')
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
routes.get('/patient/:id', showSpecificPatient)
routes.put('/patient/:id', validateBodyRequisition(patientsSchema), editPatients)
routes.post('/patient/address', validateBodyRequisition(addressSchema), createAddress)
routes.put('/patient/:patient_id/address', validateBodyRequisition(addressSchema), editAddress)
routes.get('/patient/:patient_id/address', showPatientAndAddress)


module.exports = routes