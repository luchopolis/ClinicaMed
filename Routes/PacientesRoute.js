const {pacientes,create,update} = require(`../controllers/PacientesC`)

module.exports = (router) => {

    router.get('/pacientes',async (req,res,next) => {
        try {
            let data = await pacientes()
            res.status(200).json(data)
            //res.render('../views/Pacientes/Pacientes',{layout:"main"})
        } catch (error) {
            if(error) throw error;
        }
        
    })

    router.post('/pacientes',async (req,res,next) => {
        try {
           
           
            let pacienteObj = {...req.body}

            let result = await create(pacienteObj)

            if(result.insertId === 1){
                res.status(200).json({"message":"Registro creado"})
            }
            
            
            
        } catch (error) {
            if(error) throw error;
        }
    })

    //Route to update paciente
    router.put('/pacientes/:idPaciente',async (req,res,next) => {
        try {
            let id = req.params.idPaciente;
            let data = {...req.body}
            await update(id,data)
        } catch (error) {
            if(error) throw error;
        }
    })

    //Route to get by id
    router.get('/pacientes/:idPaciente',async (req,res,next) => {
        try {
            
        } catch (error) {
            
        }
    })

    

}
