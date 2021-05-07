const { isLoggedIn } = require('../../middlewares/auth/authLogin')

const {dailyPacientes,allDailyPacientes} = require(`../../controllers/CitasC`)
const usuariosMedicos = require('../../models/usuariosMedicos.model')

module.exports = (router) => {

    router.get('/home',isLoggedIn,async (req,res,next) => {
        let {id_Usuario} = req.user
        let Rol = req.user.Rol
        if(Rol === "Recepcion"){
            
            let citasRecepcion = await allDailyPacientes();
            
            res.render('homeRecepcion',{layout:"main",pacientesDiarios:citasRecepcion})

        }else if(Rol === "Medico"){
            let medico = new usuariosMedicos()
            let data = await medico.getMedicoByUserId(id_Usuario)
            let id_Medico = data[0].id_Medico
            
            let citas = await dailyPacientes(id_Medico)
            
            
            res.render('home',{layout:"main",citasDiarias:citas,medico:id_Medico})
        }
  
    })
}