const Connection = require('../lib/Connection');
const {promisifyQuery,getUpdateRow}= require('../utils/utils')



//ModelBase
const ModelBase = require('./ModelBase')


class UsuariosAuxiliar extends ModelBase{
    constructor(){
        super('usuarios_auxiliar','id_auxiliar')
        this.conexion = new Connection()
        this.query = promisifyQuery(this.conexion.connection.query,this.conexion.connection)
    }

    
    async getUsuarioById(user_id){
        
        try {
            let sql = `SELECT * FROM ludev_medcenter.usuarios_auxiliar
            INNER JOIN personalauxiliar
            ON usuarios_auxiliar.id_auxiliar = personalauxiliar.id_auxiliar
            WHERE id_usuario = ${user_id}`

            let result = await this.query(sql)
           
            return result;
        } catch (error) {
            if (error)throw (error)
        }
    }


    
}

module.exports = UsuariosAuxiliar;