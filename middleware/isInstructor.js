const User=require('../models/User')
const dotenv=require('dotenv')
dotenv.config()
const jwt=require('jsonwebtoken')
const isInstructor=async(req,res,next)=>{
    try{
        const authHeader=req.headers.auth;
        if(!authHeader){
            return res.status(403).json({success:false,message:"Please login to continue"});
        }
        const token=authHeader
        const decodedString=jwt.verify(token,process.env.JWT_SECRET)
        const id=decodedString.userId
        if(!id){
            return res.status(403).json({success:false,message:"Please login to continue"});
        }
        const user=await User.findById(id)
        if(!user)
            return res.status(403).json({succes:false,message:"You are not authorized to perform this action"})
        // console.log('reached here')
        if(user.role==='instructor')
            return next();
        return res.status(403).json({success:false,message:"You are not authorized to perform this action"});
    }
    catch(error){
        return res.status(500).json({success:false,message:error.message})
    }
    
}
module.exports=isInstructor
