const express = require('express')
const app = express()

//config File
const config = require('./config/config');



//CALL API ROUTES
const {initRoutes} = require('./Routes/api/apiRoutes')
initRoutes(app)
//CAL WEB ROUTES



app.listen(3000,(error) => {
    if(error) throw error;

    console.log(`Running server at port ${config.PORT}` )

})