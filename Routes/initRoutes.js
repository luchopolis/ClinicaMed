const express = require('express')
const router = express.Router()


const { isLoggedIn } = require('../middlewares/auth/authLogin')
//Routes
//Set the router for the routes
//Para usar el router en las otros archivos

// router.get('/home',isLoggedIn,(req,res,next) => {
    
//     res.render('home',{layout:"main"})
// })



require('./Pacientes.Routes')(router)
require('./CitasRoute')(router)
require('./GrupoSanguineoRoute')(router)
require('./Expedientes.routes')(router)
require('./auth/auth.routes')(router)

//WEB ROUTES
require('./web/login.routes')(router)
require('./web/home.routes')(router)

let initApiRoutes = (app) => {
    
    app.use('/',router);
}

module.exports = {initApiRoutes};


