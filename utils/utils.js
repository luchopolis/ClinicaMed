//Promisify the sql 
const util = require('util');

function promisifyQuery(conexionQuery,conexion){
    let query = util.promisify(conexionQuery,conexion).bind(conexion)

    return query;
}

module.exports = promisifyQuery