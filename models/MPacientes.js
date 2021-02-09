const Connection = require('../lib/Connection');
const {promisifyQuery,getUpdateRow}= require('../utils/utils')

class MPacientes {
    Nombres = "";
    Apellidos = "";
    Edad = 1;
    FechaNacimiento = "";
    Direccion = "";
    Telefono = "";
    TelefonoSecundario = "";
    DUI = "";

    
    constructor(){
        this.tablename = "pacientes"
        this.idColum = "id_Paciente"
        this.conexion = new Connection()
        this.query = promisifyQuery(this.conexion.connection.query,this.conexion.connection)
    }

    async getPacientes(){
        try {
            let result = await this.query(`SELECT * FROM ${this.tablename}`)

            return result
        } catch (error) {
            if(error) throw error;

        }
    }

    async createPaciente(){
        try {
            let create = await this.query(`INSERT INTO ${this.tablename} (Nombres,Apellidos,Edad,FechaNacimiento,Direccion,Telefono,TelefonoSecundario,DUI) VALUES (?,?,?,?,?,?,?,?)`
            ,[this.Nombres,this.Apellidos,this.Edad,this.FechaNacimiento,this.Direccion,this.Telefono,this.TelefonoSecundario,this.DUI]);

            return create
        } catch (error) {
            if(error) throw error;
        }
    }

    async updatePaciente(id,updateFields){
        try {
            
            let sql = getUpdateRow(this.idColum,id,updateFields,this.tablename)
            console.log(sql)

        } catch (error) {
            
        }
    }
}

module.exports = MPacientes;