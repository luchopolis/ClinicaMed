const {actualHorarioMedico} = require('../../controllers/Horarios.Controller')

module.exports = (router) => {
    router.get('/Horarios',async (req,res,next) => {
        try {
          
            //res.setHeader('content-type', 'application/json');
            //res.send((parseData);
            res.render('../views/Horarios/index',{layout:"main"})


        } catch (error) {
            next(error)
        }
    })

    router.get('/Horarios/Medico/:idMedico',async (req,res,next) => {
        try {
            let data = await actualHorarioMedico(req.params.idMedico)

            res.send(data)
        } catch (error) {
            next(error)
        }
    })

   
}