const Connection = require('../lib/Connection');
const utilsSql = require('../utils/utils')

class MEmpleados{
    constructor(){
        this.conexion = new Connection()
        this.query = utilsSql(this.conexion.connection.query,this.conexion.connection)
    }
}

module.exports = MEmpleados;