const Connection = require('../lib/Connection');
const {promisifyQuery,getUpdateRow}= require('../utils/utils')


//ModelBase
const ModelBase = require('./ModelBase')

_FechaCreacion = ''
_Peso = '' //Libras
_Ocupacion = ''
_idTipoSangre = ''
_idPaciente = ''

class ExpedienteModel extends ModelBase{

    constructor(){
        super('expedientes','id_Expediente')
        this.conexion = new Connection()
        this.query = promisifyQuery(this.conexion.connection.query,this.conexion.connection)
    }

    set FechaCreacion(date){
        this._FechaCreacion = date
    }

    set Peso(peso){
        this._Peso = peso
    }

    set Ocupacion(data){
        this._Ocupacion = data
    }

    set id_TipoSangre(id){
        this._idTipoSangre = id
    }

    set id_Paciente(id){
        this._idPaciente = id
    }

    async newExpediente(){
        try {
            let sql = `INSERT INTO ${this.tableName} (id_TipoSangre,FechaCreacion,Peso,Ocupacion,id_Paciente) VALUES (?,?,?,?,?)` 


            let create = await this.query(sql,[this._idTipoSangre,this._FechaCreacion,this._Peso,this._Ocupacion,this._idPaciente])

            return create
        } catch (error) {
            if (error) throw error
        }
    }

    async showExpediente(){
        
        //Mostrara tanto el expediente como las alergias,padecimientos y tipo de sangre
        try {
            let sql = `SELECT CONCAT_ws(' ',P.Nombres,P.Apellidos) as NombrePaciente,
            P.Edad,PD.Padecimientos,
            A.Alergias,
            Exp.Ocupacion,
            Exp.Peso,
            TS.Nombre as Tipo_Sangre,
            Exp.FechaCreacion
            FROM expedientes as Exp
            INNER JOIN grupossanguineos as TS
            ON TS.id_TipoSangre = Exp.id_TipoSangre
            INNER JOIN pacientes AS P
            ON Exp.id_Paciente = P.id_Paciente
            INNER JOIN padecimientos as PD
            ON Exp.id_Expediente = PD.id_Expediente
            INNER JOIN alergias as A
            ON Exp.id_Expediente = A.id_Expediente
            WHERE P.id_Paciente = ${this._idPaciente}
            `

            
            let result = await this.query(sql)

            return result;
        } catch (error) {
            
            if (error) throw error
        }
    }

}

module.exports = ExpedienteModel