const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')

//config File
const config = require('./config/config');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//CALL API ROUTES
const {initApiRoutes} = require('./Routes/initRoutes')
initApiRoutes(app)
//CAL WEB ROUTES




//SET HANDLERBARS
app.set('view engine','hbs');
app.set('views', __dirname+'/views/');
app.engine('hbs',handlebars({
    layoutsDir:__dirname + "/views/layouts",
    extname:'hbs'
}))



app.listen(3000,(error) => {
    if(error) throw error;

    console.log(`Running server at port ${config.PORT}` )

})