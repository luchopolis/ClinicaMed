const Connection = require('../lib/Connection');
const {promisifyQuery,getUpdateRow}= require('../utils/utils')

//ModelBase
const ModelBase = require('./ModelBase')


class UsuarioModel extends ModelBase{

    constructor(){
        super('usuarios','id_Usuario');
        this.conexion = new Connection()
        this.query = promisifyQuery(this.conexion.connection.query,this.conexion.connection)
    }


    async foundUserByName(username){
        try {
            let sql = `SELECT * FROM ${this.tableName} WHERE Username="${username}"`;
            let findUser = await this.query(sql);
            if(findUser.length > 0){
                return findUser;
            }else{
                return []
            }
           
        } catch (error) {
            if(error) throw error;
        }
    }
}

module.exports = UsuarioModel