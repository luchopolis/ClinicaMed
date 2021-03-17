let jwt = require('jsonwebtoken');

require('dotenv').config();

function verifyJwtInbound(req,res,next){
    let inboundToken = req.headers["authorization"];

    //Si esta seteado en el header si no....
    if(!inboundToken){
        res.status(401).json({
            message:"no token was provided"
        })
    }

    //Verificar que token entrante sea el correcto
    token = inboundToken.replace('Bearer ', '')
    jwt.verify(token,process.env.jwtsecret,function(err,user){
        if(err){
            res.status(401).send({
                error: 'Token invalido'
            })
        }else{
            next()
        }
    })

}

module.exports = verifyJwtInbound;
