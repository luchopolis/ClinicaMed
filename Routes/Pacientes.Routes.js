const {pacientes,create,update,getPaciente,getPacienteExpediente} = require(`../controllers/PacientesC`)



module.exports = (router) => {

    router.get('/pacientes',async (req,res,next) => {
        try {
            let data = await pacientes()
            //res.status(200).json(data)
            res.render('../views/Pacientes/Pacientes',{layout:"main",pacientes:data,total:data.length})
        } catch (error) {
           next(error)
        }
        
    })

    router.post('/pacientes',async (req,res,next) => {
        try {
           
           
            let pacienteObj = {...req.body}

            let result = await create(pacienteObj)

  
            if(result.affectedRows === 1){
                res.status(200).json({"message":"Registro creado"})
            }else{
                res.status(204).json({"message":"Problema en crear el registro"})
            }
            
            
            
        } catch (error) {
            next(error)
        }
    })

    //Route to update paciente
    router.put('/pacientes/:idPaciente',async (req,res,next) => {
        try {
            let id = req.params.idPaciente;
            let data = {...req.body}
            let checkUpdated = await update(id,data)

            if(checkUpdated){
                res.status(200).json({message:"Registro actualizado"})
            }else{
                res.status(204).json({message:"Registro no actualizado"})
            }
            
        } catch (error) {
            next(error)
        }
    })

    //Route to get by id
    router.get('/pacientes/:idPaciente',async (req,res,next) => {
        try {
            
            let paciente = await getPaciente(req.params.idPaciente)
            if(paciente.length === 0){
                res.status(200).json({message:"No hay datos",paciente})
            }else{
                res.status(200).json(paciente)
            }
            
        } catch (error) {
            
            next(error)
        }
    })

    //Expediente del paciente
    router.get('/pacientes/expediente/:idPaciente',async (req,res,next) => {

        let id = req.params.idPaciente
        try {
            let expediente = await getPacienteExpediente(id)

            res.status(200).json(expediente)
        } catch (error) {
            next(error)
        }
    })

    

}
