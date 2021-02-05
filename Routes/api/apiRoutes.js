const express = require('express')
const router = express.Router()

//Routes
//Set the router for the routes
//Para usar el router en las otros archivos

require('./PacientesRoute')(router)






let initApiRoutes = (app) => {
    app.use('/api/',router);
}

module.exports = {initApiRoutes};


