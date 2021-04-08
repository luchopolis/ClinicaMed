const MCitas= require('../models/MCitas');


let date = new Date()

let dd = date.getDate();
let mm = date.getMonth()+1;
let aaaa = date.getFullYear()

let actualDay = `${aaaa}-${03}-${23}`;
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
        
    }
}

async function newDate(dateObject){
    let Citas = new MCitas()

    try {
        let newDate = await Citas.createDate(dateObject)

        return newDate;
    } catch (error) {
        
    }
}


module.exports = {dailyPacientes,allDailyPacientes,getByDate,getScheduledAppointments,newDate}
