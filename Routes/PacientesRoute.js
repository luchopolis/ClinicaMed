const pacientesC = require(`../controllers/PacientesC`)

module.exports = (router) => {

    router.get('/Pacientes',(req,res,next) => {
        
        res.render('../views/Pacientes/Pacientes',{layout:"main"})
    })

    











}
