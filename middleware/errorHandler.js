const CustomError=require('../utils/CustomError')
const mongoose=require('mongoose')
const errorHandler = (err, req, res, next) => {
  if(err instanceof CustomError){
    return res.status(err.code).json({success:false,error:err.message});
  }
  else{
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ success:false,error: 'Validation error', details: err.errors });
    } else if (err.code === 11000) {
      if(err.keyValue.email)
          return res.status(409).json({ success:false,error: 'Email already exist', details: err.keyValue });
      else
          return res.status(409).json({success:false,error: 'Username already exist', details: err.keyValue });
    } else if (err instanceof mongoose.Error.CastError) {
      return res.status(400).json({ success:false,error: 'Invalid ID format', details: err.value });
    } else {
      return res.status(500).json({ success:false,error: 'An error occurred', details: err.message });
    }
  }
};

module.exports = errorHandler;
