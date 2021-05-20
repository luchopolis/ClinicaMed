const Horarios = require('../models/Horarios.model');
const HorarioMedico = require('../models/HorarioMedico.model');

async function getAllHorarios(){
    try {
        let modelHorario = new Horarios()
        let horariosList = await modelHorario.getHorarios()
        
        
        let HorariosData = []
        let formatedHorario;
        horariosList.forEach(element => {

                let {id_Horario,Jornada} = element
                
                formatedHorario = {
                     "id_Horario":id_Horario,
                     "Jornada":JSON.parse(Jornada)
                }
                HorariosData.push(formatedHorario)
                
                
        });

        return HorariosData
    } catch (error) {
        if(error) throw error;
    }
}

async function actualHorarioMedico(id_Medico){
    try {
        let scheduleMedico = new HorarioMedico(id_Medico)
        let modelHorario = new Horarios()
        let idHorario = await scheduleMedico.getHorarioMedico()
        let jornadaMedico = await modelHorario.getHorarioMedico(idHorario)
        
        let jornadaFormatted = {}

        let {id_Horario,Jornada} = jornadaMedico[0]
        jornadaFormatted = {
            "id_Horario":id_Horario,
            "Jornada":JSON.parse(Jornada)
        }

        return jornadaFormatted;
    } catch (error) {
        if(error) throw error;
    }
}

async function asignMedicoHorario(idMedico,Jornada){
    try {
    
        let horarioJornada = new Horarios()
        let nuevoHorario = await horarioJornada.newHorario(Jornada)
        
        let horarioIdInserted = nuevoHorario.insertId

        let nuevoHorarioMedico = new HorarioMedico(idMedico)
        let result = await nuevoHorarioMedico.asignMedicoHorario(horarioIdInserted)

        if(result.affectedRows === 1){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        if(error) throw error;  
    }
}

async function updateMedicoHorario(idHorario,Jornada){
    try {
        let updateHorario = new Horarios()
        let updated = await updateHorario.updateHorario(JSON.stringify(Jornada),idHorario)

        return (updated.affectedRows === 1) ? true : false
        
    } catch (error) {
        if(error) throw error;  
    }
}
module.exports = {getAllHorarios,actualHorarioMedico,asignMedicoHorario,updateMedicoHorario}