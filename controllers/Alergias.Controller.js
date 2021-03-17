const AlergiasModel = require('../models/Alergias.model');

async function asignarAlergias(id_Expediente,alergias){
    try {
        let idExpediente = id_Expediente
        let Alergias = new AlergiasModel()
        Alergias.id_Expediente = idExpediente;
        Alergias.alergias = alergias

        return await Alergias.setAlergias()
    } catch (error) {
        if (error) throw error;
    }
}

module.exports = {asignarAlergias}