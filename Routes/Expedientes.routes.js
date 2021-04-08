const {getPacienteExpediente,getIdExpediente,updateExpediente} = require('../controllers/Expediente.controller')
const {asignarPadecimientos} = require('../controllers/Padecimientos.controller')
const {asignarAlergias} = require('../controllers/Alergias.Controller')


module.exports = (router) => {


    router.post('/api/expedientes/:idPaciente',async (req,res,next) => {
        let idPaciente = req.params.idPaciente;
        let data = {...req.body}

        let padecimientos = data.padecimientos
        let alergias = data.alergias
    
        try {
            
            let create = await getPacienteExpediente(idPaciente,data);

            if(create.affectedRows === 1){
                let expedienteId = create.insertId

                let createPadecimientos = await asignarPadecimientos(expedienteId,padecimientos)
                let createAlergias = await asignarAlergias(expedienteId,alergias)

                Promise.all([createPadecimientos,createAlergias]).then(data => {
                    
                    if(data[0].affectedRows === 1 && data[1].affectedRows === 1){
                        res.status(200).json({"message":"Expediente creado"})
                    }else if(!data[0].affectedRows){
                        res.status(400).json({"message":"Error en crear padecimientos"})

                        //Quizas luego hay que borrar el registro de expediente ya que no se completó padecimientos
                    }else if(!data[1].affectedRows){
                        res.status(400).json({"message":"Error en crear alergias"})
                    }
                   
                }).catch((error) => {
                    console.log(error)
                })

               
            }else{
                res.status(204).json({"message":"Problema en crear el registro"})
            }           

        } catch (error) {
            next(error)
        }
    });

    router.post('/api/expedientes/update/:idPaciente',async function(req,res,next){
        
        let paciente_id = req.params.idPaciente;
        let data = {...req.body}
        try {
            let Expediente = await getIdExpediente(paciente_id)
            let idExpediente = Expediente[0].id_Expediente
            
            let update = await updateExpediente(idExpediente,data)
            //aplicar el promise all para actualizar alergias y padecimientos
            if(update.affectedRows == 1){
                req.flash('successlogin',`Datos actualizados correctamente`)
                res.redirect('back');
            }else{
                req.flash('loginwrong','Erro en actualizar datos, intente de nuevo')
            }

        } catch (error) {
            next(error)
        }
    })
}