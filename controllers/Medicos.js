const MMedicos = require('../models/MMedicos')
const MMedicos = require('../models/MMedicos');


async function medicos(){
    let Medicos = new MMedicos()

    try {
        let medicos =  await Medicos.getMedicos()
        
        return medicos;
    } catch (error) {
        if(error) throw error
    }
}

async function createMedico(MedicoObj){
    let Medico = new MMedicos()

    try {
        
        Medico.Nombres = MedicoObj.Nombres;
        Medico.Apellidos = MedicoObj.Apellidos;
        Medico.Edad = MedicoObj.Edad;
        Medico.FechaNacimiento = MedicoObj.FechaNacimiento;
        Medico.Direccion = MedicoObj.Direccion;
        Medico.Telefono = MedicoObj.Telefono;
        Medico.TelefonoSecundario = MedicoObj.TelefonoSecundario;
        Medico.DUI = MedicoObj.DUI;

        let createP = await Medico.createMedico()

        return createP;

    } catch (error) {
        if(error) throw error
    }
}

async function updateMedico(id,MedicoObj){

    let Medico = new MMedicos()

    try {
        let update = await Medico.updateMedico(id,MedicoObj)
       
        if(update == 1){
            return true;
        }

        return false;
    } catch (error) {
        if(error) throw error;
    }
}

async function getMedico(id){
    let Medico = new MMedicos()

    try {
        let Medico = await Medico.getMedico(id)
        
        if(Medico.length === 0){
            return []
        }
        
        return Medico
    } catch (error) {
        if(error) throw error;
    }
}
