const Connection = require('../lib/Connection');
const utilsSql = require('../utils/utils')

class MPacientes {
    constructor(){
        this.tablename = "pacientes"
        this.conexion = new Connection()
        this.query = utilsSql(this.conexion.connection.query,this.conexion.connection)
    }

    async getPacientes(){
        try {
            let result = await this.query(`SELECT * FROM ${this.tablename}`)

            return result
        } catch (error) {
            if(error) throw error;

        }
    }
}

module.exports = MPacientes;