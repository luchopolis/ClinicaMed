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


async function nuevoGrupoSanguineo(data){
    let GrupoSanguineo = new MGrupoSanguineo();

    let {Nombre} = data

    try {
        GrupoSanguineo.Nombre = Nombre
        let create = GrupoSanguineo.createGrupoSanguineo()
        return create
    } catch (error) {
        if (error) throw error
    }
}

async function updateGrupoSanguineo(id,Obj){
    let GrupoSanguineo = new MGrupoSanguineo();

    try {
        let update = await GrupoSanguineo.updateGrupo(id,Obj)

        if(update === 1){
            return true;
        }

        return false
    } catch (error) {
        if(error) throw error;
    }
}

async function getGrupo(id){

    let GrupoSanguineo = new MGrupoSanguineo();

    try {
        let registro = await GrupoSanguineo.getById(id)
        
        if(registro.length === 0){
            return []
        }
        return registro
    } catch (error) {
        if(error) throw error;
    }
}


module.exports = {gruposSanguineos,nuevoGrupoSanguineo,updateGrupoSanguineo,getGrupo}