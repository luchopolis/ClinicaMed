const {dailyPacientes} = require(`../controllers/CitasC`)

module.exports = (router) => {

    //route para citas diarias -- daily appointments
    router.get('/api/dailyApts/:idMedico',async (req,res,next) => {

        let idMedico = req.params.idMedico;
        try {
            let citas = await dailyPacientes(idMedico)

            res.status(200).json({
                appointments:citas
            })
        } catch (error) {
            next(error)
        }
    })
}