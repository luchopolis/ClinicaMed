module.exports = {
    isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next()
        }else{
            res.redirect('/login')
        }
    },
    isRecepcion(req,res,next){
        if(req.user.Rol === 'Recepcion'){
            return next()
        }else{
            res.redirect('/home')
        }
    }
}