const pg = require('pg')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const servicelist = require("./services/servicelist")
const serviceitem = require("./services/serviceitem")

const app = express()
app.use(bodyParser.urlencoded({ extended: false })) // URLEncoded form data
app.use(bodyParser.json()) // application/json
app.use(cors())
app.use(morgan('dev')); // toutes les requêtes HTTP dans le log du serveur

//const connectionString = "postgres://user:password@192.168.56.101/instance"
const connectionString = "postgres://tp_sql_user:azerty@localhost/tp_sql"
const db = new pg.Pool({ connectionString: connectionString })
const itemService = new serviceitem(db)
require('./api/item')(app, itemService)
require('./datamodel/seederitem')(itemService)
const listService = new servicelist(db)
require('./api/list')(app, listService)
require('./datamodel/seederlist')(listService)
    .then(app.listen(3333))