const Connection = require('../lib/Connection');
const {promisifyQuery,getUpdateRow}= require('../utils/utils')


//ModelBase
const ModelBase = require('./ModelBase')

class GrupoSanguineo extends ModelBase {

    //fillables
    Nombre = "";

    constructor(){
        super('grupossanguineos','id_TipoSangre')
        this.conexion = new Connection()
        this.query = promisifyQuery(this.conexion.connection.query,this.conexion.connection)
    }

    async getGruposSanguineos(){
        try {
            let sql = `SELECT * FROM ${this.tableName}`;

            let result = await this.query(sql);

            return result;
        } catch (error) {
            
        }
    }


}

module.exports = GrupoSanguineo;