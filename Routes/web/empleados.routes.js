module.exports = (router) => {

    router.get('/Empleados',(req,res,next) => {

        res.render('../views/Empleados/nuevoEmpleado')
    })
}