const UsuarioModel = require('../models/Usuario.model');
const helpers = require('../utils/encryptPassword');


async function checkUser(user,password) {
    try {
        
        let foundUser = new UsuarioModel()
        //let hashPassword = await helpers.encryptPassword(password)
        let userT = await foundUser.foundUserByName(user)
        
        if(userT.length == 0){
            return false;
        }else if(await helpers.matchPassword(password,userT[0].Password)){
           
            return userT[0];
        }else{
            return false;
        }
        

        
       
    } catch (error) {
        if (error) throw error;
    }
}

async function createUser(user){
    
    try {
        let newUser = new UsuarioModel()
        let createdUser = await newUser.createUser(user)

        
        if(createdUser.affectedRows === 1){
            //usuario creado correctamente
            return true
        }else{
            return false
        }
        
    } catch (error) {
        if (error) throw error;
    }
}

module.exports = {checkUser,createUser}