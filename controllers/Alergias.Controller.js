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

async function updateAlergias(id_Expediente,alergias){
    try {
        let idExpediente = id_Expediente;
        let Alergias = new AlergiasModel();
        Alergias._idExpediente = idExpediente;
        Alergias._alergias = alergias.split(',');
        return await Alergias.updateAlergias()

    } catch (error) {
        if (error) throw error;
    }
}

module.exports = {asignarAlergias,updateAlergias}