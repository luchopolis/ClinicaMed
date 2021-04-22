const { isLoggedIn } = require('../../middlewares/auth/authLogin')

const {dailyPacientes} = require(`../../controllers/CitasC`)
const usuariosMedicos = require('../../models/usuariosMedicos.model')

module.exports = (router) => {

    router.get('/home',isLoggedIn,async (req,res,next) => {
        let {id_Usuario} = req.user
        let medico = new usuariosMedicos()
        let data = await medico.getMedicoByUserId(id_Usuario)
        let id_Medico = data[0].id_Medico
        
        let citas = await dailyPacientes(id_Medico)
        
        console.log(req.user)
        res.render('home',{layout:"main",citasDiarias:citas,medico:id_Medico})
    })
}