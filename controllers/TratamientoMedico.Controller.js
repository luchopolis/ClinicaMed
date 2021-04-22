const TratamientoMedico = require('../models/Tratamientomedico.model')


async function pacienteTratamiento(paciente) {
    try {
        let Tratamiento = new TratamientoMedico(paciente)
        let datos = await Tratamiento.getActualMedicalTreatment()

        return datos[0];
    } catch (error) {
        if (error) throw error
    }
}
//Medicamentos un array
async function nuevoTratamiento(id_Diagnostico, id_Paciente, Medicamentos, DuracionTratamiento) {
    try {

        let medicamentosLista = Medicamentos.split(",")
        let lista = [];
        medicamentosLista.forEach(medicamento => {
            lista.push({ "nombre": medicamento })
        });

        let Tratamiento = new TratamientoMedico(id_Paciente)
        Tratamiento.Medicamentos = JSON.stringify(lista)
        Tratamiento.DuracionTratamiento = DuracionTratamiento
        let datos = await Tratamiento.nuevoTratamiento(id_Diagnostico)

        return datos
    } catch (error) {
        if (error) throw error
    }
}

async function existTratamiento(id_Paciente) {
    try {
        let Tratamiento = new TratamientoMedico(id_Paciente);
        let check = await Tratamiento.checkTratamiento()
        if (check === undefined) {
            return [];
        } else {
            return check
        }

    } catch (error) {
        if (error) throw error;
    }
}

async function updateTratamientoByPacienteId(idPaciente,medicamentos, duracionTratamiento) {
    let medicamentosLista = medicamentos.split(",")
    let lista = [];
    medicamentosLista.forEach(medicamento => {
        lista.push({ "nombre": medicamento })
    });

    let Tratamiento = new TratamientoMedico(idPaciente)
    Tratamiento.Medicamentos = JSON.stringify(lista)
    Tratamiento.DuracionTratamiento = duracionTratamiento
    try {
        let result = await Tratamiento.updateTratamiento()

        if(result.affectedRows === 1){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        if(error) throw error;
    }
    
}


module.exports = { pacienteTratamiento, nuevoTratamiento, existTratamiento,updateTratamientoByPacienteId}