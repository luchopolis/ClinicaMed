const PersonalAuxiliar = require('../models/PersonalAuxiliar.model')

async function updatePersonal(idAuxiliar,data){
    let Auxiliar = new PersonalAuxiliar()
    
    let updateStatus = await Auxiliar.updateData(idAuxiliar,data)

    return (updateStatus.affectedRows === 1) ? true : false;
}

module.exports = {updatePersonal}