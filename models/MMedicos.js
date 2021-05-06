const Connection = require('../lib/Connection');
const {promisifyQuery,getUpdateRow}= require('../utils/utils')

class MMedicos {
    id_Medico = "";
    id_TipoSangre = "";
    Nombres = "";
    Apellidos = "";
    Direccion = "";
    DUI = "";
    Telefono = "";
    TelefonoSecundario = "";
    email = "";
    image = "";


    
    constructor(){
        this.tablename = "medicos"
        this.idColum = "id_Medico"
        this.conexion = new Connection()
        this.query = promisifyQuery(this.conexion.connection.query,this.conexion.connection)
    }

    async getMedicos(){
       
        try {
            let result = await this.query(`SELECT * FROM ${this.tablename}`)
            
            return result
        } catch (error) {
            if(error) throw error

        }
    }

    async createMedicos(){
        try {
            let create = await this.query(`INSERT INTO ${this.tablename} (Nombres,Apellidos,Direccion,DUI,Telefono,TelefonoSecundario,email,image) VALUES (?,?,?,?,?,?,?,?)`
            ,[this.Nombres,this.Apellidos,this.Direccion,this.DUI,this.Telefono,this.TelefonoSecundario,this.email,this.image]);

            return create
        } catch (error) {
            
        }
    }

    async updateMedicos(id,updateFields){
        try {
            
            let sql = getUpdateRow(this.idColum,id,updateFields,this.tablename)
            let update = await this.query(sql)

            return update.affectedRows

        } catch (error) {
            
        }
    }

    async getMedicosById(id){
        try {
            let result = await this.query(`SELECT * FROM ${this.tablename} WHERE ${this.idColum}=${id}`)
            
            return result;
        } catch (error) {
            
        }
    }
}

module.exports = MMedicos;