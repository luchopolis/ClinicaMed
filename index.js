const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const path = require('path')

//config File
const config = require('./config/config');



//CALL API ROUTES
const {initApiRoutes} = require('./Routes/initRoutes')
initApiRoutes(app)
//CAL WEB ROUTES


app.use(express.static('public'))


//SET HANDLERBARS
app.set('view engine','hbs');
app.set('views', __dirname+'/views/');
app.engine('hbs',handlebars({
    extname:'hbs'
}))



app.listen(3000,(error) => {
    if(error) throw error;

    console.log(`Running server at port ${config.PORT}` )

})