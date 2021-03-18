const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const session = require('express-session');
const passport = require('passport');

//errorhandler
const errorhandler = require('./middlewares/errorhandler')

//config File
const config = require('./config/config');


//passport
require('./lib/passport')

//handlebar helpers
require('./utils/HandlebarHelpers')

app.use(session({
    secret: 'medicalcenter',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

//SET HANDLERBARS
app.set('view engine','hbs');
app.set('views', __dirname+'/views/');
app.engine('hbs',handlebars({
    layoutsDir:__dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    extname:'hbs'
}))

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


//erro handle
app.use(errorhandler)



//globals
app.use((req,res,next) => {
    app.locals.user = req.user;
    //console.log(req.user)
    next();
})

app.use(express.static('public'))

//CALL API ROUTES
const {initApiRoutes} = require('./Routes/initRoutes')
initApiRoutes(app)
//CAL WEB ROUTES


app.listen(config.PORT,(error) => {
    if(error) throw error;

    console.log(`Running server at port ${config.PORT}` )

})