const Connection = require('../lib/Connection');
const {promisifyQuery,getUpdateRow}= require('../utils/utils')


//ModelBase
const ModelBase = require('./ModelBase')


class Diagnosticos extends ModelBase {

    id_Cita;
    Detalle;

    constructor(id_Cita,Detalle){
        super('diagnosticos','id_Diagnostico')
        this.conexion = new Connection()
        this.query = promisifyQuery(this.conexion.connection.query,this.conexion.connection)
        this.id_Cita = id_Cita;
        this.Detalle = Detalle;
    }

    async nuevoDiagnostico(){
        try {
            let sql = `INSERT INTO ${this.tableName} (id_Cita,Detalle) VALUES (?,?)` 
            
            let create = await this.query(sql,[this.id_Cita,this.Detalle])

            return create;

        } catch (error) {
            if (error) throw error
        }
    }

    async getDiagnosticoByCitaId(){
        try {
            let sql = `SELECT * FROM ${this.tableName} WHERE id_Cita=${this.id_Cita}`

            let result = await this.query(sql)
            return result;
        
        } catch (error) {
            if (error) throw error
        }
    }
    
}

module.exports = Diagnosticos;