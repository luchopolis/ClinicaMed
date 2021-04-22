const {getIdPaciente} = require('../../controllers/CitasC')
const {pacienteTratamiento,nuevoTratamiento} = require('../../controllers/TratamientoMedico.Controller')
const {nuevoDiagnostico} = require('../../controllers/Diagnostico.Controller')

module.exports = (router) => {
    router.get('/citas/asignar/:idCita',async (req,res,next) => {
        //Obtener el paciente correspodiente a la cita
        let paciente = await getIdPaciente(req.params.idCita)
        let idPaciente = paciente[0].id_Paciente;

        //Verificar si existe un tratamiento medico activo
        let pacienteTreatment = await pacienteTratamiento(idPaciente)
        let duracionTratamiento = pacienteTreatment.DuracionTratamiento
        let MedicamentsList = JSON.parse(pacienteTreatment.Medicamentos)

        res.render('../views/Citas/index',
        {layout:"main",
            tratamientoDuracion:duracionTratamiento,
            medicamentos:MedicamentsList,
            cita:req.params.idCita
        })
    });

    router.post('/citas/create/:idCita',async (req,res,next) => {
        let detalle = req.body.detalle
        let medicamentos = req.body.medicamentos
        let duracionTratamiento = req.body.duracionTratamiento;

     
        //  //Obtener el paciente correspodiente a la cita
        let paciente = await getIdPaciente(req.params.idCita)
        let idPaciente = paciente[0].id_Paciente;
        
        let diagnostico = await nuevoDiagnostico(req.params.idCita,detalle)
      
        //Verificar si existe un tratamiento, si es asi editarlo, de otro modo se crea uno nuevo.
        //Se utiliza el idPaciente para consultar
        
        if (diagnostico.affectedRows === 1){
            let id_Diagnostico = diagnostico.insertId;
            let tratamiento = await nuevoTratamiento(id_Diagnostico,idPaciente,medicamentos,duracionTratamiento)


            if(tratamiento.affectedRows === 1){
                res.status(200).json({
                    message:"Datos creados correctamente"
                })
            }else{
                res.status(400).json({
                    message:"Error en la creacion de los datos"
                })
            }
        }else{
            res.status(400).json({
                message:"No fue posible crear el diagnostico"
            })
        }

        
    })
}