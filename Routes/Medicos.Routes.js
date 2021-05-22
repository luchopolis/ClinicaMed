const {medico,createMedico,updateMedico,getMedico} = require('../controllers/Medicos')

//middlleware auth token
/* const verifyJwtInbound = require('../middlewares/auth/jwtVerify')
const { isLoggedIn } = require('../middlewares/auth/authLogin') */

module.exports = (router) => {

    router.get('/medicos',isLoggedIn,async (req,res,next) => {
        try {
            let data = await medicos()
            //res.status(200).json(data)
            res.render('../views/Medicos/Medico',{layout:"main",pacientes:data,total:data.length})
        } catch (error) {
           next(error)
        }
        
    })

    router.post('/medicos',async (req,res,next) => {
        try {
           
           
            let MedicoObj = {...req.body}

            let result = await create(MedicoObj)

  
            if(result.affectedRows === 1){
                res.status(200).json({"message":"Registro creado"})
            }else{
                res.status(204).json({"message":"Problema en crear el registro"})
            }
            
            
            
        } catch (error) {
            next(error)
        }
    })

    //Route to update paciente
    router.put('/Medicos/:idMedico',async (req,res,next) => {
        try {
            let id = req.params.idMedico;
            let data = {...req.body}
            let checkUpdated = await update(id,data)

            if(checkUpdated){
                res.status(200).json({message:"Registro actualizado"})
            }else{
                res.status(204).json({message:"Registro no actualizado"})
            }
            
        } catch (error) {
            next(error)
        }
    })

    //Route to get by id
    router.get('/Medicos/:idMedico',async (req,res,next) => {
        try {
            
            let paciente = await getMedico(req.params.idMedico)
            if(paciente.length === 0){
                res.status(200).json({message:"No hay datos",paciente})
            }else{
                res.status(200).json(paciente)
            }
            
        } catch (error) {
            
            next(error)
        }
    })



    

}
