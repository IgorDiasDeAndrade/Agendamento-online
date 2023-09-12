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
const { newAgenda, showAgendas, insertPatient, showAgendaPatients, showAgendaById } = require('./controllers/agendas')
const agendasSchema = require('./validations/schemas/agendasSchema')
const { backOfficeLogin, newBackOffice } = require('./controllers/backoffice')
const clientsSchema = require('./validations/schemas/clientsSchema')
const { newClient, clientLogin } = require('./controllers/clients')

routes.get('/', (req, res)=>{
    res.send('Server up')
})

routes.get('/users', showUsers)
routes.post('/login', userLogin)
routes.post('/backoffice-login', backOfficeLogin)
routes.post('/client-login', clientLogin)

routes.use(authentication)
routes.post('/backoffice-signin', newBackOffice)
routes.post('/client', validateBodyRequisition(clientsSchema), newClient)

routes.post('/signup', validateBodyRequisition(usersSchema), userSignUp)
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

routes.get('/agendas', showAgendas)
routes.post('/agenda', validateBodyRequisition(agendasSchema), newAgenda)
routes.post('/agenda/patient/insert', insertPatient)
routes.get('/agenda/patients/:id', showAgendaPatients)
routes.get('/agenda/:id', showAgendaById)


module.exports = routes