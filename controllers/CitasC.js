const MCitas= require('../models/MCitas');


let date = new Date()

//Mostrar los pacientes diarios a un medico en especifico
async function dailyPacientes(idMedico){
    let dd = date.getDate();
    let mm = date.getMonth()+1;
    let aaaa = date.getFullYear()

    let actualDay = `${aaaa}-${mm}-${dd}`;
    let dailyCita = new MCitas();

    try {
        dailyCita.fechaCita = actualDay;
        let listaPacientes = await dailyCita.getPacientesDay(idMedico)

        return listaPacientes;
    } catch (error) {
        if (error) throw error;
    }
}


module.exports = {dailyPacientes}
