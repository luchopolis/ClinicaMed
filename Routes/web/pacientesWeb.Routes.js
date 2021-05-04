const {gruposSanguineos} = require('../../controllers/GrupoSanguineoC');

module.exports = (router) => {

    router.get('/paciente/nuevo/',async (req,res,next) => {
        let GruposSanguineos = await gruposSanguineos();
        res.render('../views/Pacientes/nuevoPaciente',{layout:"main",gruposSanguineos:GruposSanguineos})
    })

}