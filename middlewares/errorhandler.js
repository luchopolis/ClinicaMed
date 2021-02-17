function errorhandler(err,req,res,next){
  console.error(err.message)
  res.status(500).send('un error ha ocurrido')
    
}

module.exports = errorhandler;