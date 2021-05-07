const { getIdPaciente,updateEstado } = require('../../controllers/CitasC')
const { pacienteTratamiento, nuevoTratamiento, existTratamiento,updateTratamientoByPacienteId } = require('../../controllers/TratamientoMedico.Controller')
const { nuevoDiagnostico } = require('../../controllers/Diagnostico.Controller')

const { pacientes } = require('../../controllers/PacientesC');
const { medicos } = require('../../controllers/Medicos');

const { isLoggedIn,isRecepcion } = require('../../middlewares/auth/authLogin')
module.exports = (router) => {
    router.get('/citas/asignar/:idCita', isLoggedIn, async (req, res, next) => {
        //Obtener el paciente correspodiente a la cita
        let paciente = await getIdPaciente(req.params.idCita)
        let idPaciente = paciente[0].id_Paciente;

        //Verificar si existe un tratamiento medico activo
        let pacienteTreatment = await pacienteTratamiento(idPaciente)
        let duracionTratamiento = pacienteTreatment.DuracionTratamiento
        let MedicamentsList = JSON.parse(pacienteTreatment.Medicamentos)

        res.render('../views/Citas/index',
            {
                layout: "main",
                tratamientoDuracion: duracionTratamiento,
                medicamentos: MedicamentsList,
                cita: req.params.idCita
            })
    });



    /* Muestra la vista */
    router.get('/citas/nueva',isLoggedIn,isRecepcion,async (req,res,next) => {
        try {
            let pacientesList = await pacientes()
            let medicosList = await medicos()

            

            res.render('../views/Citas/nuevaCita.hbs',{layout: "main", Pacientes:pacientesList,Medicos:medicosList})
        } catch (error) {
            next(error)
        }
    })

    router.get('/citas/medicos',isLoggedIn,async (req,res,next) => {
        try {
            let medicosList = await medicos();

            res.render('../views/Citas/medicos.hbs', {layout: "main", medicos:medicosList});
        } catch (error) {
            next(error);
        }
        
    })


    /* La ruta para crear una nueva cita esta en CitasRoute */
    //Utilizada para actualizar la cita, el medico realiza esta funcion desde su vista
    //Donde se actualiza todo lo del diagnostivo tratamiento medico y detall
    router.post('/citas/create/:idCita', async (req, res, next) => {
        let detalle = req.body.detalle
        let medicamentos = req.body.medicamentos
        let duracionTratamiento = req.body.duracionTratamiento;

        let id_Diagnostico;
        try {
       
        //  //Obtener el paciente correspodiente a la cita
        let paciente = await getIdPaciente(req.params.idCita)
        let idPaciente = paciente[0].id_Paciente;
        //Verificar si existe un tratamiento, si es asi editarlo, de otro modo se crea uno nuevo.
        //Se utiliza el idPaciente para consultar
        let tratamientoActual = await existTratamiento(idPaciente);

        if (tratamientoActual.length === 0) {
            let diagnostico = await nuevoDiagnostico(req.params.idCita, detalle)

            if (diagnostico.affectedRows === 1) {
                id_Diagnostico = diagnostico.insertId;
                let tratamiento = await nuevoTratamiento(id_Diagnostico, idPaciente, medicamentos, duracionTratamiento)


                if (tratamiento.affectedRows === 1) {
                    let estadoUpdate = await updateEstado(req.params.idCita,"Completado")
                    res.status(200).json({
                        message: "Datos creados correctamente",
                        messageEstado:estadoUpdate.message,
                        estado:estadoUpdate.Estado
                    })
                } else {
                    res.status(400).json({
                        message: "Error en la creacion de los datos"
                    })
                }
            } else {
                res.status(400).json({
                    message: "No fue posible crear el diagnostico"
                })
            }
        } else {
            let diagnostico = await nuevoDiagnostico(req.params.idCita, detalle)
            if (diagnostico.affectedRows === 1) {
                let estadoUpdate = await updateEstado(req.params.idCita,"Completado")
                
                //Actualizar el tratamiento
                let updateTratamiento = await updateTratamientoByPacienteId(idPaciente,medicamentos,duracionTratamiento)
                if(updateTratamiento){
                    res.status(200).json({
                        message: "Tratamiento actualizado",
                        messageEstado:estadoUpdate.message,
                        estado:estadoUpdate.Estado
                    })
                }else{
                    res.status(200).json({
                        message: "Error en la actualizacion del tratamiento"
                    })
                }
            }
            
        }
         
        } catch (error) {
            next(error)
        }
    })
}