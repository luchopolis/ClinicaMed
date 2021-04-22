const passport = require('passport')

module.exports = (router) => {

    router.get('/login',(req,res,next) => {
        res.render('login',{layout:""})
        
    })

    router.post('/login',(req,res,next) => {
        passport.authenticate('local.signin',{
            successRedirect:'/home',
            failureRedirect:'/login'
        })(req,res,next)
    })

    router.get('/logout',(req,res,next) => {
        req.logOut();
        //res.render('<h3>CERRO SESSION WACHO</h3>')
        res.redirect('/login')
    })
}