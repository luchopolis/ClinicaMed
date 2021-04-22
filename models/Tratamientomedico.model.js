const Connection = require('../lib/Connection');
const {promisifyQuery,getUpdateRow}= require('../utils/utils')

//ModelBase
const ModelBase = require('./ModelBase')

class TratamientoMedico extends ModelBase {
    Medicamentos = []
    DuracionTratamiento = 0;
    
    constructor(idPaciente){
        super('tratamientomedico','id_TratamientoMedico');
        this.conexion = new Connection()
        this.query = promisifyQuery(this.conexion.connection.query,this.conexion.connection)
        this.id_Paciente = idPaciente;
    }

    get Medicamentos(){
        return this.Medicamentos;
    }
    set Medicamentos(data){
        this.Medicamentos = data 
    }

    get DuracionTratamiento(){
        return this.DuracionTratamiento;
    }
    set DuracionTratamiento(data){
        this.DuracionTratamiento = data 
    }
    
    async getActualMedicalTreatment(){
        try {
            let result;

            let validatePaciente = await this.query(`SELECT Count(*) as paciente FROM ${this.tableName} WHERE id_Paciente=${this.id_Paciente}`)
            
            //Check if the user paciente exist if != 1 return an empty array for Medicamentos and DuracionTratamiento
            if(validatePaciente[0].paciente != 1){
                result = [ {
                    Medicamentos:JSON.stringify([{"nombre":'sin datos'}]),
                    DuracionTratamiento:['sin datos']
                } ];
                
                return result;
            }else{
                result = await this.query(`SELECT Medicamentos,DuracionTratamiento FROM ${this.tableName} WHERE id_Paciente=${this.id_Paciente}`)
            
                
                return result;
            }

           
        } catch (error) {
            if (error) throw error
           
        }
    }

    async nuevoTratamiento(id_Diagnostico){
        try {
            let sql = `INSERT INTO ${this.tableName} (id_Diagnostico,Medicamentos,DuracionTratamiento,id_Paciente) VALUES (?,?,?,?)`
            

            let create = this.query(sql,[id_Diagnostico,this.Medicamentos,this.DuracionTratamiento,this.id_Paciente]);

            return create;
        } catch (error) {
            if (error) throw error
        }
    }

    async checkTratamiento(){
        try {
            let sql = `SELECT * FROM ${this.tableName} WHERE id_Paciente=${this.id_Paciente}`

            let consulta = this.query(sql);

            return consulta
        } catch (error) {
            if (error) throw error
        }
    }

    async updateTratamiento(){
        try {
           let sql =  `UPDATE ${this.tableName} SET Medicamentos='${this.Medicamentos}',DuracionTratamiento='${this.DuracionTratamiento}' WHERE id_Paciente=${this.id_Paciente}`
           
           let result = this.query(sql)
           return result;
        } catch (error) {
            if (error) throw error
        }
    }
    

    
}

module.exports = TratamientoMedico