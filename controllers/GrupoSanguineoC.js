const MGrupoSanguineo = require('../models/MGrupoSanguineo');

async function gruposSanguineos(){
    let GrupoSanguineo = new MGrupoSanguineo();

    try {
        let allGrupos = await GrupoSanguineo.getGruposSanguineos()

        return allGrupos;

    } catch (error) {
        if (error) throw error;
    }
}


module.exports = {gruposSanguineos}