const Connection = require('../lib/Connection');
const {promisifyQuery,getUpdateRow}= require('../utils/utils')

//ModelBase
const ModelBase = require('./ModelBase')

class MCitas extends ModelBase{

    fechaCita = "" //Format AAAA-MM-DD


    constructor(){
        super("citas","id_Cita")
        this.conexion = new Connection()
        this.query = promisifyQuery(this.conexion.connection.query,this.conexion.connection)
    }

    set fechaCita(date){
        this.fechaCita = date;
    }

    //Retorna la lista de pacientes por dia del medico
    async getPacientesDay(idMedico){
        try {

            //Explicacion SQL
            //Un inner join con pacientes, para poder mostrar la informacion del paciente
            //todo esto usando el id del medico para que solo muestre los pacientes por X medico
            //y que sean los pacientes del dia.

            let sql = `SELECT P.Nombres,P.Apellidos,C.Hora 
            FROM ${this.tableName} AS C 
            INNER JOIN pacientes AS P 
            ON C.id_Paciente = P.id_Paciente 
            WHERE C.id_Medico = ${idMedico} AND C.FechaCita = "${this.fechaCita}"`;


            let result = await this.query(sql)

            return result
        } catch (error) {
            
        }
    }
    
}

module.exports = MCitas;