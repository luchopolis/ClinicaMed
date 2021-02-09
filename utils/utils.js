//Promisify the sql 
const util = require('util');

function promisifyQuery(conexionQuery,conexion){
    let query = util.promisify(conexionQuery,conexion).bind(conexion)

    return query;
}

//Return a sql string only with the fields to be updated using an id
//idField its the id to use to locate the register
function getUpdateRow(idField,id,updateFields,tableName){
    let sqlFields = ``;
    let sql = `UPDATE ${tableName} SET replaceSQL WHERE ${idField}='${id}'`;
    let fields = Object.keys(updateFields);
    fields.forEach((item => {
        sqlFields += `${item}='${updateFields[item]}',`;
    }))

    sqlFields = sqlFields.substring(0,sqlFields.length - 1);
    let newSQL = sql.replace("replaceSQL",sqlFields)

    return newSQL
}
module.exports = {promisifyQuery,getUpdateRow}