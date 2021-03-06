const Connection = require('../lib/Connection');
const {promisifyQuery,getUpdateRow}= require('../utils/utils')

//ModelBase
const ModelBase = require('./ModelBase')

class MCitas extends ModelBase{

    fechaCita = "" //Format AAAA-MM-DD
    idMedico = 0;

    constructor(){
        super("citas","id_Cita")
        this.conexion = new Connection()
        this.Estado = 'Pendiente';
        this.query = promisifyQuery(this.conexion.connection.query,this.conexion.connection)
    }

    set fechaCita(date){
        this.fechaCita = date;
    }

    async getApt(idCita){
        let sql = `SELECT * FROM ${this.tableName} WHERE ${this.id_Column}='${idCita}'`
        let data = await this.query(sql)

        return data;
    }
    async updateApt(idCita,newData){
       
        let sql = `UPDATE ${this.tableName} SET FechaCita='${newData.FechaCita}',Hora='${newData.Hora}',id_Medico=${newData.id_Medico} WHERE ${this.id_Column}='${idCita}'`
        let updateApt = await this.query(sql)
       
        return updateApt;
    }
    //Retorna la lista de pacientes por dia del medico
    async getPacientesDay(idMedico){
        try {

            //Explicacion SQL
            //Un inner join con pacientes, para poder mostrar la informacion del paciente
            //todo esto usando el id del medico para que solo muestre los pacientes por X medico
            //y que sean los pacientes del dia.

            let sql = `SELECT C.id_Cita,C.Estado,P.id_Paciente,P.Nombres,P.Apellidos,C.Hora,C.FechaCita
            FROM ${this.tableName} AS C 
            INNER JOIN pacientes AS P 
            ON C.id_Paciente = P.id_Paciente 
            WHERE C.id_Medico = ${idMedico} AND C.FechaCita = "${this.fechaCita}" AND C.Estado="Pendiente"`;


            let result = await this.query(sql)

            return result
        } catch (error) {
            if (error) throw error
        }
    }

    async getAlldailyPacientes(){
        try{
            
            //Por la fecha, muestra las citas programadas del dia
            let sql = `SELECT P.Nombres,P.Apellidos,C.Hora
            FROM ${this.tableName} AS C
            INNER JOIN pacientes AS P
            ON C.id_Paciente = P.id_Paciente
            WHERE C.FechaCita = "${this.fechaCita}"`

            let result = await this.query(sql)
            
            return result;
        }catch(error){
            if (error) throw error
        }
    }
    
    async getByDate(){
        try {
            //Para filtrar las citar por x fecha
          
            let sql = `SELECT P.id_Paciente,P.Nombres,P.Apellidos,C.Hora,C.FechaCita
            FROM ${this.tableName} AS C
            INNER JOIN pacientes AS P
            ON C.id_Paciente = P.id_Paciente
            WHERE C.FechaCita = "${this.fechaCita}"`
            
            let result = await this.query(sql)
            
            return result;
        } catch (error) {
            if (error) throw error
        }
    }

    async scheduledAppointments(month,year){
        
        try {
            let sql = `SELECT * FROM ${this.tableName}
            WHERE MONTH(citas.FechaCita) = ${month} AND YEAR(citas.FechaCita) = ${year}
            AND citas.id_Medico = ${this.idMedico}`

            let result = await this.query(sql)

            return result;
        } catch (error) {
            if (error) throw error
        }
    }


    //Create a new date
    async createDate(dateObject){
        try {
            let {id_Paciente,id_Medico,FechaCita,Hora} = dateObject

            this.idMedico = id_Medico

            let sql = `INSERT INTO ${this.tableName} (FechaCita,Hora,Estado,id_Paciente,id_Medico) VALUES (?,?,?,?,?)`;
            let create = await this.query(sql,[FechaCita,Hora,this.Estado,id_Paciente,this.idMedico])

            return create; 
        } catch (error) {
            if (error) throw error
        }
    }

    //Obtener todas las citas médicas de un paciente X
    async getAppointments(id_Paciente){
        try {
            let sql = `SELECT date_format(C.FechaCita,'%Y-%m-%d') as FechaCita,C.Hora,C.Estado,concat_ws(" ",Med.Nombres,Med.Apellidos) as Doctor
            FROM citas as C 
            INNER JOIN medicos as Med
            ON C.id_Medico = Med.id_Medico
            INNER JOIN pacientes as Pa
            ON C.id_Paciente = Pa.id_Paciente
            WHERE C.id_Paciente = ${id_Paciente}`;

            let pacienteAppointments = await this.query(sql);

            return pacienteAppointments;
        } catch (error) {
            if (error) throw error;
        }
    }

    //Obtener el paciente id de la cita

    async getPaciente(id_Cita){
        try {
            let paciente = await this.query(`SELECT id_Paciente FROM ${this.tableName} WHERE id_Cita=${id_Cita}`);

            return paciente;
        } catch (error) {
            if (error) throw error;
        }
    }

    async actualizarEstado(Estado,cita){
        try {
            let estado = await this.query(`UPDATE ${this.tableName} SET Estado='${Estado}' WHERE id_Cita=${cita}`);

            return estado
        } catch (error) {
            if (error) throw error;
        }
    }

    async getAppointmentsPending(date){
        try {
            let citas = await this.query(`SELECT * FROM ${this.tableName} WHERE Estado="Pendiente" AND FechaCita="${date}"`)
            return citas;
        } catch (error) {
            if (error) throw error; 
        }
    }

    async getTheLastCita(idPaciente){
        try {
            let sql = `select * from ${this.tableName} where id_Paciente = ${idPaciente}
            order by id_Cita desc limit 1
            `

            return await this.query(sql)
        } catch (error) {
            if (error) throw error; 
        }
    }
}

module.exports = MCitas;