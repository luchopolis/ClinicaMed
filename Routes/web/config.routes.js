const {medicos} = require('../../controllers/Medicos')

module.exports = (router) => {
    router.get('/config/medicos',async (req,res,next) => {
        let loadMedicos = await medicos();
        let medicosList = []

        loadMedicos.forEach(element => {
            let { Nombres,Apellidos,DUI,Telefono,id_Medico} = element
            medicosList.push([Nombres,Apellidos,DUI,Telefono,id_Medico])
            
        });


        res.render('../views/HorarioMedicos/index',{layout:"main",medicos:medicosList})
    })

    router.get('/config/medicos/:idMedico',async (req,res,next) => {
        let {idMedico} = req.params

        res.render('../views/HorarioMedicos/show',{layout:"main",medico:idMedico})
    })
}