const express = require('express')
const app = express()

//config File
const config = require('./config/config');



//CALL API ROUTES
const {initApiRoutes} = require('./Routes/api/apiRoutes')
initApiRoutes(app)
//CAL WEB ROUTES



app.listen(3000,(error) => {
    if(error) throw error;

    console.log(`Running server at port ${config.PORT}` )

})