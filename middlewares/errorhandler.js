function errorhandler(err,req,res,next){
  console.error("error message:",err)
  res.status(500).json({message:"Un error ha ocurrido",data:err})
    
}

module.exports = errorhandler;