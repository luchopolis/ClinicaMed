const express = require('express')
const router = express.Router()


const { isLoggedIn } = require('../middlewares/auth/authLogin')

require('./Pacientes.Routes')(router)
require('./CitasRoute')(router)
require('./GrupoSanguineoRoute')(router)
require('./Expedientes.routes')(router)
require('./HorariosControl.routes')(router)
require('./auth/auth.routes')(router)

//WEB ROUTES
require('./web/login.routes')(router)
require('./web/home.routes')(router)
require('./web/citas.routes')(router)
require('./web/usuarios.routes')(router)
require('./web/pacientesWeb.Routes')(router)
require('./web/empleados.routes')(router)
require('./web/Horarios.routes')(router)
require('./web/receta.route.js')(router)
require('./web/config.routes')(router)
require('./web/profile.routes')(router)
//Para verificar si las citas vencieron
let {citasToClose} = require('../controllers/CitasC')

async function checkCitas(){
    
    await citasToClose()
     
   
}

let initApiRoutes = (app) => {
    
    //Actualiza cada 10 segundos y verifica si las citas ya vencieron
    setInterval(() => {
        app.locals.checkCitas = "Estado de citas actualizados"
        checkCitas()
    }, 10000);
    
    app.get('/',function(req,res,next){
        
        res.redirect('/login')
    })
    app.use('/',router);
   
}

module.exports = {initApiRoutes,checkCitas};


