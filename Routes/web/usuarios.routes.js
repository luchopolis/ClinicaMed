
const {createUser} = require('../../controllers/Usarios.Controller')
const helpers = require('../../utils/encryptPassword')

const UsuarioModel = require('../../models/Usuario.model')

module.exports = (router) => {

    router.get('/usuarios',async (req,res,next) => {
        let usuarios = new UsuarioModel()
        let listOfUsers = []
        try{
            let data = await usuarios.getAll()
            for(let i=0; i < data.length ;i++){
                let {id_Usuario,Username,Rol,Permisos} = data[i]
                listOfUsers.push({id_Usuario,Username,Rol,Permisos})
            }
           
            
            res.render('usuarios/index',{layout:'main',users:listOfUsers})
        }catch(error){
            next(error)
        }

    })
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