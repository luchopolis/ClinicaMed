const {medicos} = require('../../controllers/Medicos')
const {isLoggedIn} = require('../../middlewares/auth/authLogin')

module.exports = (router) => {
    router.get('/config/medicos',isLoggedIn,async (req,res,next) => {
        let loadMedicos = await medicos();
        let medicosList = []

        loadMedicos.forEach(element => {
            let { Nombres,Apellidos,DUI,Telefono,id_Medico} = element
            medicosList.push([Nombres,Apellidos,DUI,Telefono,id_Medico])
            
        });


        res.render('../views/ConfigMedicos/index',{layout:"main",medicos:medicosList})
    })

    router.get('/config/medicos/:idMedico',async (req,res,next) => {
        let {idMedico} = req.params

        res.render('../views/ConfigMedicos/show',{layout:"main",medico:idMedico})
    })
}