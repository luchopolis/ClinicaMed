function isBodyEmpty(req,res,next){
    if(Object.keys(req.body).length == 0){
        res.status(500).json({
            "message":"El body no debe estar sin datos"
        })
    }else{
        next()
    }
}

module.exports = isBodyEmpty