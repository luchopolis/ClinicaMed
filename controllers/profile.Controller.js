const usuariosMedicos = require('../models/usuariosMedicos.model');
const UsuariosAuxiliar = require('../models/UsuariosAuxiliar.model');

module.exports = {
    async isMedico(idMedico){
        let usuarioMedico = new usuariosMedicos()
        
        let profileInformation = await usuarioMedico.getMedicoByUserId(idMedico)
        return profileInformation;
    },
    async isRecepcion(idUsuario){
        let auxiliar = new UsuariosAuxiliar()
        try {
            let profileInformation = await auxiliar.getUsuarioById(idUsuario)
            return profileInformation;
        } catch (error) {
            if (error) throw error;
        }
       
    }
}