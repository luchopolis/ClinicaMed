const { Router } = require("express");
const {gruposSanguineos,nuevoGrupoSanguineo,getGrupo} = require('../controllers/GrupoSanguineoC');
const { update } = require("../controllers/PacientesC");
const isBodyEmpty = require('../middlewares/bodyEmpty')


module.exports = (router) => {
    router.get('/api/GruposSanguineos',async (req,res,next) => {
        try {
            let result = await gruposSanguineos()

            res.status(200).json({
                result
            })
        } catch (error) {
            next(error)
        }
    })

    router.post('/api/GruposSanguineos',async (req,res,next) => {
        let data = {...req.body}
        
        try {
            let result = await nuevoGrupoSanguineo(data)

            if(result.affectedRows === 1) {
                res.status(201).json({
                    "message":"resource created"
                })
            }else{
                res.status(204).json({"message":"Problema en crear el registro"})
            }
            
        } catch (error) {
            next(error)
        }
        


    })

    router.get('/api/GruposSanguineos/:idGrupo',async (req,res,next) => {
        try {
            let id = req.params.idGrupo
            
            let data = await getGrupo(id)

           if(data.length === 0){
                res.status(200).send("no hay datos")
                
           }else{
                res.status(200).json({resultado:data})
           }

           
        } catch (error) {
            next(error)
        }
    })

    router.put('/api/GruposSanguineos/:idGrupo',async (req,res,next) => {
        try {
            let id = req.params.idGrupo
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

    
}