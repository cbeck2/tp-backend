require('dotenv').config();
const pg = require('pg')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'));

const connectionString = process.env.DATABASE_URL
const db = new pg.Pool({ connectionString: connectionString })

const serviceutil = require("./services/serviceutilisateur")
const serviceutilisateur = new serviceutil(db)
const jwt = require('./jwt')(serviceutilisateur)

const servicemess = require("./services/servicemessage")
const servicemessage = new servicemess(db)

const serviceam = require("./services/serviceami")
const serviceami = new serviceam(db)

/*const serviceacti = require("./services/serviceactivite")
const serviceactivite = new serviceacti(db)
require('./api/activite')(app, serviceactivite)

const serviceinte = require("./services/serviceinteret")
const serviceinteret = new serviceinte(db)
require('./api/interet')(app, serviceinteret)*/

require('./api/utilisateur')(app, serviceutilisateur,jwt)
require('./api/message')(app, servicemessage)
require('./api/ami')(app, serviceami, jwt)
require('./datamodel/seeder')(serviceutilisateur,servicemessage/*,serviceinteret,serviceactivite*/,serviceami)
    .then(app.listen(3333))
