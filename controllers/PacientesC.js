const MPacientes = require('../models/MPacientes')

exports.pacientesController = async () => {
    let Pacientes = new MPacientes()
    try {
        let pacientes =  await Pacientes.getPacientes()

        return pacientes;
    } catch (error) {
        if(error) throw error
    }
    
}