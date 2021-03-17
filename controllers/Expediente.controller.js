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


module.exports = {getPacienteExpediente}