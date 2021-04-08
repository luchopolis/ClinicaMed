const TratamientoMedico = require('../models/Tratamientomedico.model')


async function pacienteTratamiento(paciente){
    try {
        let Tratamiento = new TratamientoMedico(paciente)
        let datos = await Tratamiento.getActualMedicalTreatment()
    
        return datos[0];
    } catch (error) {
        if(error) throw error
    }
}

module.exports = {pacienteTratamiento}