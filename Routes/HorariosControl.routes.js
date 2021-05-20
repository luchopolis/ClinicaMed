const { getAllHorarios, asignMedicoHorario } = require('../controllers/Horarios.Controller')


//template horario

const template = require('../utils/horarioTemplate')

module.exports = (router) => {
    router.get('/api/horarios', async (req, res, next) => {
        let dataHorarios = await getAllHorarios()

        res.send(dataHorarios);
    });

    router.post('/api/horario/medico/:idMedico', async (req, res, next) => {
        let { idMedico } = req.params
        let { data } = req.params
        let Jornada = JSON.stringify(data)

        // try {
        //     let horarioMedico = await asignMedicoHorario(idMedico, Jornada)
        //     if (horarioMedico) {
        //         res.status(200).json({
        //             "message": "Horario Creado y asignado"
        //         })
        //     } else {
        //         res.status(200).json({
        //             "message": "Ha surgido un problema "
        //         })
        //     }
        // } catch (error) {
        //     next(error)
        // }

        //let {day,start,end} = req.body
        //let data = []
        //let periods = []

        // if(day > 6){
        //     res.send({
        //         message:"day could not be higher than 6"
        //     })
        // }else{ 
        //     periods.push({start,end})

        //     data.push({day,periods})
        //     template.data = data

        //     let Jornada = JSON.stringify(template)
        //     try {
        //         let horarioMedico = await asignMedicoHorario(idMedico,Jornada)
        //         if(horarioMedico){
        //             res.status(200).json({
        //                 "message":"Horario Creado y asignado"
        //             })
        //         }else{
        //             res.status(200).json({
        //                 "message":"Ha surgido un problema "
        //             })
        //         }
        //     } catch (error) {
        //         next(error)
        //     }

        // }
    })
}