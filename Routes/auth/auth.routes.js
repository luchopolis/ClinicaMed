const jwt = require('jsonwebtoken');
require('dotenv').config()
let bcrypt = require('bcrypt')


module.exports = (router) => {
    router.get('/auth/login/user',async (req,res,next) => {

        try {
            let { username,password } = req.body

            let token = jwt.sign({username,password},process.env.jwtsecret,{
                expiresIn: 60 * 30 //30 minutes
            })

            res.send({
                token
            })

            
            
        } catch (error) {
            if(error) throw error
        }
    })

    

}