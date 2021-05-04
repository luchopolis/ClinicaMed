const {getPacienteExpediente,getIdExpediente,updateExpediente} = require('../controllers/Expediente.controller')
const {asignarPadecimientos,updatePadecimientos} = require('../controllers/Padecimientos.controller')
const {asignarAlergias,updateAlergias} = require('../controllers/Alergias.Controller')

const {update} = require('../controllers/PacientesC');


module.exports = (router) => {


    router.post('/api/expedientes/:idPaciente',async (req,res,next) => {
        let idPaciente = req.params.idPaciente;
        let data = {...req.body}

        let padecimientos = data.padecimientos
        let alergias = data.alergias
    
        try {
            //Crea un expediente, y retorna el id del expediente creado
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
                    next(error)
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
        
            
            let padecimientos = await updatePadecimientos(idExpediente,data.padecimientos);
            let alergias = await updateAlergias(idExpediente,data.alergias);
            let updateExp = await updateExpediente(idExpediente,data)

            //Update paciente informacion personal
            let {Nombres,Apellidos,FechaNacimiento,Edad,Direccion,Telefono,TelefonoSecundario,DUI} = data;
             
            let pacientePersonalData = await update(paciente_id,{Nombres,Apellidos,FechaNacimiento,Edad,Direccion,Telefono,TelefonoSecundario,DUI});

            Promise.all([updateExp,padecimientos,alergias,pacientePersonalData])
                .then(data => {
                    
                    if(data[0].affectedRows === 1 && data[1].affectedRows === 1 && data[2].affectedRows === 1 && data[3].affectedRows === 1){
                        req.flash('successlogin',`Datos actualizados correctamente`)
                        res.redirect('back');
                       
                        
                    }else{
                        req.flash('loginwrong','Error en actualizar datos, intente de nuevo')
                        res.redirect('back');
                    }
       
                    
                }).catch((error) => {
                    
                    req.flash('loginwrong','Error en actualizar datos, intente de nuevo')
                    res.redirect('back');
                    next(error)
                    
                })

           

        } catch (error) {
            next(error)
        }
    })
}