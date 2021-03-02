const { Router } = require("express");
const {gruposSanguineos} = require('../controllers/GrupoSanguineoC')

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

    router.post('/api/GruposSanguineos',(req,res,next) => {

    })

    router.put('/api/GruposSanguineos',(req,res,next) => {
        
    })
}