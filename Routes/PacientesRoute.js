const pacientesC = require(`../controllers/PacientesC`)

module.exports = (router) => {

    router.get('/Pacientes',async (req,res,next) => {
        try {
            let data = await pacientesC.pacientesController()
            res.status(200).json(data)
            //res.render('../views/Pacientes/Pacientes',{layout:"main"})
        } catch (error) {
            if(error) throw error;
        }
        
    })

    











}
