const ExpedienteModel = require('../models/Expediente.model');

async function getPacienteExpediente(idPaciente,data){
    try {
        
        let idTipoSangre = data.idTipoSangre;
        let Expediente = new ExpedienteModel();

        Expediente.id_Paciente = idPaciente
        Expediente.FechaCreacion = data.FechaCreacion
        Expediente.Peso = data.peso
        Expediente.Ocupacion = data.ocupacion
        Expediente.id_TipoSangre = idTipoSangre
        
        return await Expediente.newExpediente()

    } catch (error) {
        if (error) throw error;
    }
}

//Retorna un expediente, sera usado para ac
async function getIdExpediente(idPaciente){
    try {
        let Expediente = new ExpedienteModel()
        let data = await Expediente.getExpedienteByPacienteId(idPaciente);

        return data;
    } catch (error) {
        if (error) throw error;
    }
}


async function updateExpediente(idExpediente,data){
    try {
        let Expediente = new ExpedienteModel();
        let updt = await Expediente.updateExpediente(idExpediente,data);

        return updt;

    } catch (error) {
        if (error) throw error;
    }
}

module.exports = {getPacienteExpediente,getIdExpediente,updateExpediente}