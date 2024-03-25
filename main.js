const pg = require('pg')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(bodyParser.urlencoded({ extended: false })) // URLEncoded form data
app.use(bodyParser.json()) // application/json
app.use(cors())
app.use(morgan('dev')); // toutes les requêtes HTTP dans le log du serveur

const connectionString = "postgres://user:azerty@localhost/PROJEEEET"
const db = new pg.Pool({ connectionString: connectionString })


// const serviceacc = require("./services/useraccountservice")
// const serviceuaccount = new serviceacc(db)
// const jwt = require('./jwt')(serviceuaccount)
// require('./api/useraccount')(app, serviceuaccount,jwt)
// require('./datamodel/useraccount/useraccountseeder')(serviceuaccount)

const serviceutil = require("./services/serviceutilisateur")
const serviceutilisateur = new serviceutil(db)
require('./api/utilisateur')(app, serviceutilisateur)
require('./datamodel/utilisateur/utilisateurseeder')(serviceutilisateur)

const servicemess = require("./services/servicemessage")
const servicemessage = new servicemess(db)
require('./api/message')(app, servicemessage)
require('./datamodel/message/messageseeder')(servicemessage)

const serviceacti = require("./services/serviceactivite")
const serviceactivite = new serviceacti(db)
require('./api/activite')(app, serviceactivite)
require('./datamodel/activite/activiteseeder')(serviceactivite)

const serviceinte = require("./services/serviceinteret")
const serviceinteret = new serviceinte(db)
require('./api/interet')(app, serviceinteret)
require('./datamodel/interet/interetseeder')(serviceinteret)

const serviceam = require("./services/serviceami")
const serviceami = new serviceam(db)
require('./api/ami')(app, serviceami)
require('./datamodel/ami/amiseeder')(serviceami)
    .then(app.listen(3333))