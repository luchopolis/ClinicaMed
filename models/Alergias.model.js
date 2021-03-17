const Connection = require('../lib/Connection');
const {promisifyQuery,getUpdateRow}= require('../utils/utils')


//ModelBase
const ModelBase = require('./ModelBase')


class AlergiasModel extends ModelBase {
    _idExpediente = 0
    _alergias = []

    constructor(){
        super('alergias','id_Expediente')
        this.conexion = new Connection()
        this.query = promisifyQuery(this.conexion.connection.query,this.conexion.connection)
    }

    set id_Expediente(id){
        this._idExpediente = id
    }

    set alergias(data){
        this._alergias = data 
    }


    async setAlergias(){
        try {
            let sql = `INSERT INTO ${this.tableName} (id_Expediente,Alergias) VALUES (?,?)` 
            let alergias = this._alergias.join()

            let create = await this.query(sql,[this._idExpediente,alergias])

            return create
        } catch (error) {
            if (error) throw error
        }
    }
}

module.exports = AlergiasModel