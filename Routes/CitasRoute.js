
const {dailyPacientes,allDailyPacientes,getByDate,getScheduledAppointments,newDate} = require(`../controllers/CitasC`)
const {getPaciente} = require('../controllers/PacientesC')
const isBodyEmpty = require('../middlewares/bodyEmpty')

module.exports = (router) => {

    //route para citas diarias -- daily appointments por id del medico
    router.get('/api/dailyApts/:idMedico',async (req,res,next) => {

        let idMedico = req.params.idMedico;
        try {
            let citas = await dailyPacientes(idMedico)

            res.status(200).json({
                appointments:citas
            })
        } catch (error) {
            next(error)
        }
    })

    //Ruta para mostrar todas las citas del día para recepcion

    router.get('/api/dailyApts',async (req,res,next) => {
        try {
            let citas = await allDailyPacientes()
           
            res.status(200).json({
                count:citas.length,
                message:"Citas programadas por dia",
                citas
                
            })
        } catch (error) {
            next(error)
        }
    })

    //Ruta para mostrar las citar por fecha (AAAA-MM-DD) con ese formato
    router.get('/api/appointments/:date',async (req,res,next) => {
        try {
            let dateTofind = req.params.date

            let citas = await getByDate(dateTofind)

            res.status(200).json({
                description:"Citas programadas",
                date:dateTofind,
                citas
            })
        } catch (error) {
            next(error)
        }
    })

    //Ruta que permitira mostrar las citas agendadas por mes y anio, puede tambien usarse para 
    //obtener datos de meses o anios anteriores
    //le servira al medico para mostrar las citas que tendra en el mes o las que ha tenido anteriormente
    //Tambien para la recepcion, y mostrar el control del medico

    //Los parametros month y year son opcionales, si no se asignan, retornara datos del mes actual y el anio actual
    router.get('/api/appointments/Scheduled/:idMedico/:month?/:year?',async (req,res,next) => {
        try {
            let citasAgendadas
            let listaPacientes = []
            let cita

            let idMedico = req.params.idMedico
            let month = req.params.month
            let year = req.params.year
            
            citasAgendadas = await getScheduledAppointments(idMedico,month,year);
            
           
            for(let i = 0;i < citasAgendadas.length;i++){
                
                let {FechaCita,Hora} = citasAgendadas[i]
                let fechaFormated = JSON.stringify(FechaCita).slice(1,10)
                let paciente = citasAgendadas[i]["id_Paciente"]
                let pacienteController = await getPaciente(paciente)
                
                cita = {
                    fechaFormated,
                    Hora,
                    paciente:pacienteController
                }
                
                listaPacientes.push(cita)
            }
            
            if(listaPacientes.length === 0){
                res.status(200).json({description:'No hay datos para esta fecha',listaPacientes})
            }else{
                res.status(200).json({
                    description:"Lista de citas agendadas",
                    listaPacientes
                })
            }
            
           
        } catch (error) {
            next(error)
        }
    })


    //Ruta para crear nueva cita
    router.post('/api/appointments',isBodyEmpty,async (req,res,next) => {
        try {

            let dateObject = {...req.body}

            let date = await newDate(dateObject)
           
            if(date.affectedRows === 1){
                res.status(200).json({"message":"Registro creado"})
            }else{
                res.status(204).json({"message":"Problema en crear el registro"})
            }

        } catch (error) {
            next(error)
        }
    })
}