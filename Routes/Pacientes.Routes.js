const {pacientes,create,update,getPaciente,getPacienteExpediente,allAppointments} = require(`../controllers/PacientesC`)

const {pacienteTratamiento} = require('../controllers/TratamientoMedico.Controller')
const {gruposSanguineos} = require('../controllers/GrupoSanguineoC');

//middlleware auth token
const verifyJwtInbound = require('../middlewares/auth/jwtVerify')
const { isLoggedIn,isRecepcion} = require('../middlewares/auth/authLogin')

//citaController
const {lastCita} = require('../controllers/CitasC')
//diagnosticoControler
const {diagnosticoPaciente} = require('../controllers/Diagnostico.Controller')

const pdfMake = require('pdfmake')



const fonts = require('../utils/loadFonts')

//expedienteModelPdf

const pdfExpediente = require('../utils/pdfExpediente')
module.exports = (router) => {

    router.get('/pacientes',isLoggedIn,isRecepcion,async (req,res,next) => {
        try {
            let data = await pacientes()

            let pacientest = []

            data.forEach(element => {
                let { Nombres,Apellidos,Edad,Telefono,TelefonoSecundario,id_Paciente} = element
                pacientest.push([Nombres,Apellidos,Edad,Telefono,TelefonoSecundario,id_Paciente])
            });
            
      
            //res.status(200).json(data)
            res.render('../views/Pacientes/Pacientes',{layout:"main",pacientes:JSON.stringify(pacientest),total:data.length})
        } catch (error) {
           next(error)
        }
        
    })

    router.post('/pacientes',async (req,res,next) => {
        try {
           
           
            let pacienteObj = {...req.body}

            
            let result = await create(pacienteObj)

  
            if(result.affectedRows === 1){
                
                res.status(200).json({"message":"Registro creado","id":result.insertId})
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
            let appointmentsRecords = await allAppointments(id)

            let pacienteTreatment = await pacienteTratamiento(id)
            let duracionTratamiento = pacienteTreatment.DuracionTratamiento
            let MedicamentsList = JSON.parse(pacienteTreatment.Medicamentos)
            let GruposSanguineos = await gruposSanguineos();

            let paciente = await getPaciente(id)
            dateN = new Date(paciente[0].FechaNacimiento);
            
            //Format
            let year = dateN.getFullYear()
            let month = dateN.getMonth()
            let day = dateN.getDay()

            if (month < 10){
                month = '0' + month;
            }
            if (day  < 10){
                day = '0' + day;
            }
            
            paciente[0].FechaNacimiento = [year,month,day].join('-');

            
            res.render('../views/Pacientes/Paciente',{layout:"main",
                id_paciente:id,
                paciente:expediente[0],                     /*Informacion del expediente */
                tipoSangre:expediente[0].Tipo_Sangre,
                pacienteCitas:appointmentsRecords,
                tratamientoDuracion:duracionTratamiento,
                medicamentos:MedicamentsList,
                gruposSanguineos:GruposSanguineos,
                pacienteProfile:paciente[0]                        /*Informacion del paciente la personal */
            })
            
           
        } catch (error) {
            next(error)
        }
    })


    //Generate route expediente PDF
    router.get('/expediente/generate',async (req,res,next) => {
        
        //let {Nombre,TipoSangre,Padecimientos,Alergias,Edad,Ocupacion,Peso} = req.query
        
        let {idPaciente} = req.query

        let expediente = await getPacienteExpediente(idPaciente)
        let pacienteTreatment = await pacienteTratamiento(idPaciente)


        //Get The last Cita to get the diagnostic
        let citaPaciente = await lastCita(idPaciente)
        let lastCitaId = citaPaciente.id_Cita
        //Diagnostico
        let diagnostico = await diagnosticoPaciente(lastCitaId)
        
        

        let Medicamentos = JSON.parse(pacienteTreatment.Medicamentos)

        let ListPadecimientos = expediente[0].Padecimientos.split(",")
        let ListAlergias = expediente[0].Alergias.split(",")

        let printer = new pdfMake(fonts);
        let expedientePDF = new pdfExpediente()
        expedientePDF.Nombre = expediente[0].NombrePaciente
        expedientePDF.TipoSangre = expediente[0].Tipo_Sangre
        expedientePDF.Padecimientos = ListPadecimientos
        expedientePDF.Alergias = ListAlergias
        expedientePDF.Medicamentos = Medicamentos
        expedientePDF.Edad = expediente[0].Edad
        expedientePDF.Peso = expediente[0].Peso
        expedientePDF.Ocupacion = expediente[0].Ocupacion
        expedientePDF.Diagnostico = (diagnostico) ? diagnostico.Detalle : ""

        res.writeHead(200, 
            {
                'Content-Type':'application/pdf',
                'Content-Disposition':'attachment;filename="expediente.pdf"'
                
            }
        );
        
        let expe = expedientePDF.getExpediente()
        let stack = expedientePDF.asignarPadecimientos()
        let stackAlergias = expedientePDF.asignarAlergias()
        let stackMedicamentos = expedientePDF.asignarMedicamentos()


        expe['content'][8]["table"]["body"][1].push(stack)
        expe['content'][8]["table"]["body"][1].push(stackAlergias)
        expe['content'][10]["table"]["body"][1].push(stackMedicamentos)

        let docPdf =  printer.createPdfKitDocument(expe);
        docPdf.pipe(res)
        docPdf.end()
        
    })

    

}
