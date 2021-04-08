const handlebars = require('express-handlebars')

var hbs = handlebars.create({})
var bloodType = "";

hbs.handlebars.registerHelper('Rol',function(arg1){
    switch(arg1){
        case "Medico":
            return true;
            break;

    }
})


hbs.handlebars.registerHelper('medicaments',function(args){
    let medicaments = []
    for(let m = 0; m < args.length;m++){
        medicaments.push(args[m].nombre)
    }

    return medicaments.join(',')
})


//Checking if the blood type is equal and return true to select it in paciente view to option element
hbs.handlebars.registerHelper('setToCheck',(type) => {
    bloodType = type

    return '';

})
hbs.handlebars.registerHelper('checkbloodtype',(blood) => {
  
    if(blood === bloodType){
      
        return true;

    }else{
        return false;
    }

    
})
