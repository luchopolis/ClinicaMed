const UsuarioModel = require('../models/Usuario.model');
const helpers = require('../utils/encryptPassword');


async function checkUser(user,password) {
    try {
        
        let newUser = new UsuarioModel()
        //let hashPassword = await helpers.encryptPassword(password)
        let userT = await newUser.foundUserByName(user)
        
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

async function createUser(user,password,rol,permisos){

}

module.exports = {checkUser}