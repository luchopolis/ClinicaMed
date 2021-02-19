const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')


//errorhandler
const errorhandler = require('./middlewares/errorhandler')

//config File
const config = require('./config/config');


app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))

//CALL API ROUTES
const {initApiRoutes} = require('./Routes/initRoutes')
initApiRoutes(app)
//CAL WEB ROUTES




//SET HANDLERBARS
app.set('view engine','hbs');
app.set('views', __dirname+'/views/');
app.engine('hbs',handlebars({
    layoutsDir:__dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    extname:'hbs'
}))

//erro handle
app.use(errorhandler)


app.listen(config.PORT,(error) => {
    if(error) throw error;

    console.log(`Running server at port ${config.PORT}` )

})