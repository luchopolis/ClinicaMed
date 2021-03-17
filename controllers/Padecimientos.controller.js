const PadecimientosModel = require('../models/Padecimientos.model');

async function asignarPadecimientos(id_Expediente,padecimientos){
    try {
        let idExpediente = id_Expediente
        let Padecimientos = new PadecimientosModel()
        Padecimientos.id_Expediente = idExpediente;
        Padecimientos.Padecimientos = padecimientos

        return await Padecimientos.setPadecimientos()
    } catch (error) {
        if (error) throw error;
    }
}

module.exports = {asignarPadecimientos}