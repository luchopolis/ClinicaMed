const MPacientes = require('../models/MPacientes')



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
        let update = Paciente.updatePaciente(id,pacienteObj)

        //return update
    } catch (error) {
        
    }
}

module.exports = {pacientes,create,update}