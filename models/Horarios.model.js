const Connection = require('../lib/Connection');
const {promisifyQuery,getUpdateRow}= require('../utils/utils')


//ModelBase
const ModelBase = require('./ModelBase')

class Horarios extends ModelBase{
    constructor(){
        super('horarios','id_Horario')
        this.conexion = new Connection()
        this.query = promisifyQuery(this.conexion.connection.query,this.conexion.connection)
      
    }

    
    async getHorarioMedico(id_Horario){
        try {
            let sql = `SELECT * FROM ${this.tableName} WHERE id_Horario=${id_Horario}`
            
            let dataHorario = await this.query(sql)
            return dataHorario
        } catch (error) {
            if(error) throw error;
        }
    }

    async getHorarios(){
        let sql = `SELECT * FROM ${this.tableName}`;
        let horarios = await this.query(sql)
       
        return horarios;
    }

    async newHorario(Jornada){
        let sql = `INSERT INTO ${this.tableName} (Jornada) VALUES('${Jornada}')`
        let horario = await this.query(sql)

        return horario;
    }

    async updateHorario(Jornada,idHorario){
        let sql = `UPDATE ${this.tableName} SET Jornada=${Jornada} WHERE ${this.id_Column}=${idHorario}`
        
        let update = await this.query(sql)
        return update;
    }
}

module.exports = Horarios