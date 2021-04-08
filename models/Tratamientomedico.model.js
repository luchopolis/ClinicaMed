const Connection = require('../lib/Connection');
const {promisifyQuery,getUpdateRow}= require('../utils/utils')

//ModelBase
const ModelBase = require('./ModelBase')

class TratamientoMedico extends ModelBase {

    
    constructor(idPaciente){
        super('tratamientomedico','id_TratamientoMedico');
        this.conexion = new Connection()
        this.query = promisifyQuery(this.conexion.connection.query,this.conexion.connection)
        this.id_Paciente = idPaciente;
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

    
}

module.exports = TratamientoMedico