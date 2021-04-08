const passport = require('passport')
const LocalStrategy = require('passport-local');

const {checkUser} = require('../controllers/Usarios.Controller')

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username,password,done) => {
    try {
        let user = await checkUser(username,password)
        let loginUser = {
            Username: user.Username,
            Password: password,
            Rol: user.Rol,
            Permisos: user.Permisos
        }
        if(!user){
            console.log("Contrasenia erronea o datos no existentes")
            return done(null,false,req.flash('loginwrong',"Datos incorrectos"))
        }else{
 
            return done(null,loginUser,req.flash('successlogin',`Bienvenido ${user.Username}`))
        }
    } catch (error) {
        if(error) throw error;
    }
}))

passport.serializeUser((user,done) => {
    done(null,user)
})

passport.deserializeUser(async (user,done) => {
    
    
    let userloggin = await checkUser(user.Username,user.Password)
    
    return done(null,userloggin)

})