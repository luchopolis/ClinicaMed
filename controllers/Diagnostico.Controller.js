const Diagnosticos = require('../models/Diagnosticos.model');

async function nuevoDiagnostico(id_Cita,Detalle){
    try {
        let diagnostico = new Diagnosticos(id_Cita,Detalle)

        let result = await diagnostico.nuevoDiagnostico()
        return result;
    } catch (error) {
        if (error) throw error;
    }
}

async function diagnosticoPaciente(idCita){
    try {
        let diagnostico = new Diagnosticos(idCita,"")

        let data = await diagnostico.getDiagnosticoByCitaId()
        return data[0]
        
    } catch (error) {
        if (error) throw error;
    }
}
module.exports = {nuevoDiagnostico,diagnosticoPaciente}