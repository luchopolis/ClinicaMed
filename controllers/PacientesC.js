const MPacientes = require('../models/MPacientes')

const ExpedienteModel = require('../models/Expediente.model');
const MCitas = require('../models/MCitas');


async function pacientes(){
    let Pacientes = new MPacientes()

    try {
        let pacientes =  await Pacientes.getPacientes()
        
        return pacientes;
    } catch (error) {
        if(error) throw error
    }
}

async function create(pacienteObj){
    let Paciente = new MPacientes()

    try {
        
        Paciente.Nombres = pacienteObj.Nombres;
        Paciente.Apellidos = pacienteObj.Apellidos;
        Paciente.Edad = pacienteObj.Edad;
        Paciente.FechaNacimiento = pacienteObj.FechaNacimiento;
        Paciente.Direccion = pacienteObj.Direccion;
        Paciente.Telefono = pacienteObj.Telefono;
        Paciente.TelefonoSecundario = pacienteObj.TelefonoSecundario;
        Paciente.DUI = pacienteObj.DUI;

        let createP = await Paciente.createPaciente()

        return createP;

    } catch (error) {
        if(error) throw error
    }
}

async function update(id,pacienteObj){

    let Paciente = new MPacientes()

    try {
        let update = await Paciente.updatePaciente(id,pacienteObj)
       
        if(update == 1){
            return true;
        }

        return false;
    } catch (error) {
        if(error) throw error;
    }
}

async function getPaciente(id){
    let Paciente = new MPacientes()

    try {
        let paciente = await Paciente.getPaciente(id)
        
        if(paciente.length === 0){
            return []
        }
        
        return paciente
    } catch (error) {
        if(error) throw error;
    }
}


//Mostrar el expediente de X paciente
async function getPacienteExpediente(id){
    
    let Expediente = new ExpedienteModel()
    try {
        Expediente.id_Paciente = id
        
        let result = await Expediente.showExpediente()

        return result
    } catch (error) {
        if(error) throw error;
    }
}

async function allAppointments(id_Paciente){
    try {
        let pacienteCita = new MCitas()
        let datos = pacienteCita.getAppointments(id_Paciente)

        return datos;
    } catch (error) {
        if(error) throw error;
    }
}
module.exports = {pacientes,create,update,getPaciente,getPacienteExpediente,allAppointments}