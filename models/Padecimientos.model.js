const Connection = require('../lib/Connection');
const {promisifyQuery,getUpdateRow}= require('../utils/utils')


//ModelBase
const ModelBase = require('./ModelBase')


class PadecimientosModel extends ModelBase {
    _idExpediente = 0
    _Padecimientos = []

    constructor(){
        super('padecimientos','id_Expediente')
        this.conexion = new Connection()
        this.query = promisifyQuery(this.conexion.connection.query,this.conexion.connection)
    }

    set id_Expediente(id){
        this._idExpediente = id
    }

    set Padecimientos(data){
        this._Padecimientos = data 
    }


    async setPadecimientos(){
        try {
            let sql = `INSERT INTO ${this.tableName} (id_Expediente,Padecimientos) VALUES (?,?)` 
            let padecimientos = this._Padecimientos.join()

            let create = await this.query(sql,[this._idExpediente,padecimientos])

            return create
        } catch (error) {
            if (error) throw error
        }
    }

    
}

module.exports = PadecimientosModel