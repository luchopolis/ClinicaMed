const express = require('express')
const router = express.Router()

//Routes
//Set the router for the routes
//Para usar el router en las otros archivos
router.get('/login',(req,res,next) => {
    res.render('login',{layout:""})
})

require('./PacientesRoute')(router)
require('./CitasRoute')(router)


let initApiRoutes = (app) => {
    
    app.use('/',router);
}

module.exports = {initApiRoutes};


