const Connection = require('../lib/Connection');
const {promisifyQuery,getUpdateRow}= require('../utils/utils')



//ModelBase
const ModelBase = require('./ModelBase')

class PersonalAuxiliar extends ModelBase{

    constructor(){
        super('personalauxiliar','id_auxiliar')
        this.conexion = new Connection()
        this.query = promisifyQuery(this.conexion.connection.query,this.conexion.connection)
    }

    async updateData(idAuxiliar,fields){
        let sql = getUpdateRow(this.id_Column,idAuxiliar,fields,this.tableName)
        
        let update = await this.query(sql)
        return update;
    }
}

module.exports = PersonalAuxiliar