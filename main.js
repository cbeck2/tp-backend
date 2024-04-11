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

const serviceutil = require("./services/serviceutilisateur")
const serviceutilisateur = new serviceutil(db)
const jwt = require('./jwt')(serviceutilisateur)
require('./api/utilisateur')(app, serviceutilisateur,jwt)

const servicemess = require("./services/servicemessage")
const servicemessage = new servicemess(db)
require('./api/message')(app, servicemessage)

const serviceacti = require("./services/serviceactivite")
const serviceactivite = new serviceacti(db)
require('./api/activite')(app, serviceactivite)

const serviceinte = require("./services/serviceinteret")
const serviceinteret = new serviceinte(db)
require('./api/interet')(app, serviceinteret)

const serviceam = require("./services/serviceami")
const serviceami = new serviceam(db)
require('./api/ami')(app, serviceami)

require('./datamodel/seeder')(serviceutilisateur,servicemessage,serviceinteret,serviceami,serviceactivite)
    .then(app.listen(3333))