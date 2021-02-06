const mysql = require("mysql");
const config = require('../config/config')

class Connection{

    constructor(){
        if(Connection.instance instanceof Connection){
            return Connection.instance
        }

        Connection.instance = this

        this.connection = mysql.createConnection({
            host:config.host,
            user:config.user,
            password:config.password,
            database:config.database
        })

        this.connection.connect((error) => {
            if (error) {
                console.log("error connecting conexion" + error.stack)
                return;
            }
        })
    }
}

module.exports = Connection;