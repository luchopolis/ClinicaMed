const {isMedico,isRecepcion} = require('../../controllers/profile.Controller');

const {getGrupo} = require('../../controllers/GrupoSanguineoC')

// Roles file
const roles = require('../../config/roles')

//Controllers
const {updatePersonal} = require('../../controllers/PersonalAuxiliar.Controller')

module.exports = (router) => {

    let idUser;

    router.get('/profile',async (req,res,next) => {
      
        idUser = req.user.id_Usuario
        
        let dataToShow;
        let dataProfile;

        if(req.user.Rol === roles.Medico){
            dataToShow = await isMedico(idUser)
            let {id_TipoSangre } = dataToShow[0]
            let grupoSanguineo = await getGrupo(id_TipoSangre)

            dataProfile = {
                "TipoSangre":grupoSanguineo[0].Nombre,
                "Nombres":dataToShow[0].Nombres,
                "Apellidos":dataToShow[0].Apellidos,
                "Direccion":dataToShow[0].Direccion,
                "DUI":dataToShow[0].DUI,
                "Telefono":dataToShow[0].Telefono,
                "Telefono2":dataToShow[0].TelefonoSecundario,
                "email":dataToShow[0].email,
                "image":dataToShow[0].image
            }
        }
        if(req.user.Rol === roles.Recepcion){
            
            dataToShow = await isRecepcion(idUser)

            let {id_TipoSangre } = dataToShow[0]
            let grupoSanguineo = await getGrupo(id_TipoSangre)

            dataProfile = {
                "TipoSangre":grupoSanguineo[0].Nombre,
                "Nombres":dataToShow[0].Nombres,
                "Apellidos":dataToShow[0].Apellidos,
                "Direccion":dataToShow[0].Direccion,
                "DUI":dataToShow[0].DUI,
                "Telefono":dataToShow[0].Telefono,
                "Telefono2":dataToShow[0].TelefonoSecundario,
                "email":dataToShow[0].email,
                "image":dataToShow[0].image
            }

            
        }
            
        
        
        res.render('../views/UserProfile/index',{layout: "main",profileInfo:dataProfile})
    })
    
    router.post('/profile/update',async (req,res,next) => {
        
        let datos = {...req.body}
        
        if(req.user.Rol === roles.Medico){
            dataToShow = await isMedico(idUser)
            let {id_Medico} = dataToShow[0]

            
        }
    
        if(req.user.Rol === roles.Recepcion){
            dataToShow = await isRecepcion(idUser)
            let {id_auxiliar} = dataToShow[0]
            
            let updateAuxiliar = await updatePersonal(id_auxiliar,datos)

            if(updateAuxiliar){
                req.flash('successlogin',`Datos actualizados correctamente`)
                res.redirect('back')
            }else{
                req.flash('loginwrong',`Error en actualizar los datos`)
                res.redirect('back')
            }
        }
    })
}