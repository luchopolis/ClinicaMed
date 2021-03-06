const {actualHorarioMedico,updateMedicoHorario} = require('../../controllers/Horarios.Controller')

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

    router.post('/Horarios/Medico/:idHorario',async (req,res,next) => {
        let {idHorario} = req.params
        let {Jornada} = req.body

        let updateSchedule = await updateMedicoHorario(idHorario,Jornada)
        if(updateSchedule){
            res.status(200).json({ message:"Horario actualizado"})

        }else{
            res.status(204).json({ message:"Problema en actualizar datos"})
        }

    })

   
}