const Connection = require('../lib/Connection');
const {promisifyQuery,getUpdateRow}= require('../utils/utils');



//ModelBase
const ModelBase = require('./ModelBase')



class HorarioMedico extends ModelBase{
    idMedico;

    constructor(idMedico){
        super('controlhorariosmedico','id_Medico')
        this.conexion = new Connection()
        this.query = promisifyQuery(this.conexion.connection.query,this.conexion.connection)
        this.idMedico = idMedico;
    }

    async getHorarioMedico(){
        try {
            let sql = `SELECT id_Horario FROM ${this.tableName} WHERE id_Medico=${this.idMedico}`
            let data = await this.query(sql)
            let idHorario = data[0].id_Horario
            
            
            return idHorario;
        } catch (error) {
            if(error) throw error;
        }
    }

    async asignMedicoHorario(idHorario){
        let sql = `INSERT INTO ${this.tableName} (id_Medico,id_Horario) VALUES(${this.idMedico},${idHorario})`
        let asignacion = await this.query(sql)

        return asignacion;
    }
}

module.exports = HorarioMedico