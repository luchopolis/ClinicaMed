const express = require('express')
const router = express.Router()


const { isLoggedIn } = require('../middlewares/auth/authLogin')

require('./Pacientes.Routes')(router)
require('./CitasRoute')(router)
require('./GrupoSanguineoRoute')(router)
require('./Expedientes.routes')(router)
require('./auth/auth.routes')(router)

//WEB ROUTES
require('./web/login.routes')(router)
require('./web/home.routes')(router)
require('./web/citas.routes')(router)

let initApiRoutes = (app) => {
    
    app.use('/',router);
   
}

module.exports = {initApiRoutes};


