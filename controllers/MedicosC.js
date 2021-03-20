const MMedicos = require('../models/MMedicos');
//const ExpedienteModel = require('../models/Expediente.model');


async function medicos(){
    let Medicos = new MMedicos()

    try {
        let medicos =  await Medicos.getMedicos()
        
        return medicos;
    } catch (error) {
        if(error) throw error
    }
}

async function create(medicoObj){
    let Medico = new MMedicos()

    try {
        
        Medico.Nombres = pacienteObj.Nombres;
        Medico.Apellidos = pacienteObj.Apellidos;
        Medico.Edad = pacienteObj.Edad;
        Medico.FechaNacimiento = pacienteObj.FechaNacimiento;
        Medico.Direccion = pacienteObj.Direccion;
        Medico.Telefono = pacienteObj.Telefono;
        Medico.TelefonoSecundario = pacienteObj.TelefonoSecundario;
        Medico.DUI = pacienteObj.DUI;

        let createM = await Medico.createMedicos()

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
module.exports = {pacientes,create,update,getPaciente,getPacienteExpediente}