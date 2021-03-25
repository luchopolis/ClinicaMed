const Connection = require('../lib/Connection');
const {promisifyQuery,getUpdateRow}= require('../utils/utils')


//ModelBase
const ModelBase = require('./ModelBase')

class usuariosMedicos extends ModelBase {
    constructor(){
        super('usuarios_medicos','id_Usuario')
        this.conexion = new Connection()
        this.query = promisifyQuery(this.conexion.connection.query,this.conexion.connection)
    }
    async getMedicoByUserId(user_id){
        try {
            let sql = `SELECT * FROM ludev_medcenter.usuarios_medicos
            INNER JOIN medicos
            ON usuarios_medicos.id_Medico = medicos.id_Medico
            WHERE id_Usuario = ${user_id}`

            let result = await this.query(sql)

            return result;
        } catch (error) {
            if (error)throw (error)
        }
    }
}

module.exports = usuariosMedicos;