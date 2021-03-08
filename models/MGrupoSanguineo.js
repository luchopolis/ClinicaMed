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

    set Nombre(Nombre){
        this.Nombre = Nombre
    }
    async getGruposSanguineos(){
        try {
            let sql = `SELECT * FROM ${this.tableName}`;

            let result = await this.query(sql);

            return result;
        } catch (error) {
            
        }
    }

    async createGrupoSanguineo(){
        try{
            let sql = `INSERT INTO ${this.tableName} (Nombre) VALUES (?)`

            let result = await this.query(sql,[this.Nombre])

            return result
        }catch(error){

        }
    }

    async updateGrupo(id,updateFields){
        try {
            let sql = getUpdateRow(this.id_Column,id,updateFields,this.tableName)
            let update = await this.query(sql)

            return update.affectedRows
        } catch (error) {
            if (error) throw error
        }
    }

    async getById(id){
        try {
            let sql = `SELECT Nombre FROM ${this.tableName} WHERE ${this.id_Column}=${id}`
            
            let get = await this.query(sql)
            
            return get

        } catch (error) {
            if (error) throw error
        }
    }


}

module.exports = GrupoSanguineo;