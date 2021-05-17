const MCitas= require('../models/MCitas');


let date = new Date()

let dd = date.getDate();
let mm = date.getMonth()+1;
let aaaa = date.getFullYear()


let actualDay = `${aaaa}-${mm}-${dd}`;
//Mostrar los pacientes diarios a un medico en especifico
async function dailyPacientes(idMedico){
    
    let dailyCita = new MCitas();

    try {
        dailyCita.fechaCita = actualDay;
        let listaPacientes = await dailyCita.getPacientesDay(idMedico)

        if(listaPacientes === 0) return [];

        return listaPacientes;
    } catch (error) {
        if (error) throw error;
    }
}


//Muestra las citas que hay para este dia
async function allDailyPacientes(){
    let dailyCita = new MCitas()
    let actualDay = `${aaaa}-${mm}-${dd}`;
    try {
        dailyCita.fechaCita = actualDay;
        let citasDiarias = await dailyCita.getAlldailyPacientes()

        if(citasDiarias.length === 0){
            return []
        }
        
        return citasDiarias;
    } catch (error) {
        if (error) throw error;
    }
}

async function getByDate(dateToFind){
    let Citas = new MCitas()

    try {
        Citas.fechaCita = dateToFind
        let citasByDate = await Citas.getByDate()

        if(citasByDate.length === 0){
            return []
        }
        return citasByDate
    } catch (error) {
        if (error) throw error;
    }
}

async function getScheduledAppointments(idMedico,month = mm,year = aaaa){
    let Citas = new MCitas()


    try {
        Citas.idMedico = idMedico
        let data = await Citas.scheduledAppointments(month,year)

        if(data.length === 0){
            return []
        }

        return data;
    } catch (error) {
        if (error) throw error;
    }
}

async function newDate(dateObject){
    let Citas = new MCitas()

    try {
        let newDate = await Citas.createDate(dateObject)

        return newDate;
    } catch (error) {
        if (error) throw error;
    }
}

async function getIdPaciente(id_Cita){
    let Citas = new MCitas()
    try {
        return await Citas.getPaciente(id_Cita);
    } catch (error) {
        if (error) throw error;
    }
}

async function updateEstado(idCita,Estado){
    let Citas = new MCitas();
    try {
        let update = await Citas.actualizarEstado(Estado,idCita);
        if(update.affectedRows === 1){
            return {
                message:"Estado actualizado",
                estado:Estado
            }
        }else{
            return {
                message:"Sin cambios",
                estado:"Sin cambios"
            };
        }
       
    } catch (error) {
        if (error) throw error;
    }
}

async function citasToClose(){
    let Citas = new MCitas();
    //Es necesario cambiar y agregar en configuraciones este dato
    let limitTime = '23:33'
    
    let dateCita = new Date()
    let horas = dateCita.getHours()
    let minutes = dateCita.getMinutes()
    try {
        let citasPendientes = await Citas.getAppointmentsPending(actualDay)
        let time = `${horas}:${minutes}`

        if(time === limitTime){
            citasPendientes.forEach(async (cita) => {
                await updateEstado(cita.id_Cita,"Completado")
                console.log("Estados actualizados" + cita.Estado)
                
            })
        }
        
        

    } catch (error) {
        if (error) throw error
    }
}


async function getApts(idApts){
    let Citas = new MCitas();

    try {
        let dataCita = await Citas.getApt(idApts)
        return dataCita
    } catch (error) {
        if (error) throw error;
    }
}

async function updateApts(idApts,data){
    let Citas = new MCitas();

    try {
        let uptd = await Citas.updateApt(idApts,data)

        return uptd;
    } catch (error) {
        if (error) throw error;
    }
}

async function lastCita(idPaciente){
    let Citas = new MCitas();

    try {
        let cita = await Citas.getTheLastCita(idPaciente)

        return cita[0]
    } catch (error) {
        if (error) throw error
    }
}   
module.exports = {dailyPacientes,allDailyPacientes,getByDate,getScheduledAppointments,newDate,getIdPaciente,updateEstado,citasToClose,getApts,updateApts,lastCita}
