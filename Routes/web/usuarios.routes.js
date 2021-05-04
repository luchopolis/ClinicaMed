
const {createUser} = require('../../controllers/Usarios.Controller')
const helpers = require('../../utils/encryptPassword')

module.exports = (router) => {

    router.post('/usuarios/create',async (req,res,next) => {
        try {
            let {username,password,rol,permisos} = req.body
            let newPassword = await helpers.encryptPassword(password)

            let user = {
                "username":username,
                "password":newPassword,
                "rol":rol,
                "permisos":permisos
            }

            let createdUser = await createUser(user)
            
            if(createdUser){
                console.log("Usuario creado")
            }else{
                console.log("No fue posible crear el usuario")
            }
        } catch (error) {
            next(error)
        }
    })

}