const handlebars = require('express-handlebars')

var hbs = handlebars.create({})

hbs.handlebars.registerHelper('Rol',function(arg1){
    switch(arg1){
        case "Medico":
            return true;
            break;
        
    }
})